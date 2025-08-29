import { cvAnalysisSchema } from "../validators/cv-analysis.validator"
import type { CVAnalysisResult } from "../../types/cv-analysis"

/**
 * Pure processor for CV analysis response validation and formatting
 * No side effects or external dependencies
 */
export const analyzeCvText = (geminiResponse: unknown): CVAnalysisResult => {
  const jsonText = extractJsonFromResponse(geminiResponse)
  return parseAndValidateAnalysis(jsonText)
}

const extractJsonFromResponse = (response: unknown): string => {
  // Handle different response formats from Gemini proxy
  const r: any = response

  // 1) Some gateways return a direct text field
  if (r && typeof r === "object" && "output_text" in r && r.output_text) {
    return String(r.output_text)
  }

  // 2) Vertex-style candidates → content → parts[].text
  const firstCandidate = r?.candidates?.[0]
  const parts: unknown = firstCandidate?.content?.parts ?? []
  if (Array.isArray(parts)) {
    let text = parts
      .map((p: any) => (p && typeof p.text === "string" ? p.text : ""))
      .filter(Boolean)
      .join("\n")
      .trim()
    // strip ```json ... ``` fences if present
    if (text.startsWith("```")) {
      text = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim()
    }
    if (text) return text
  }

  // 3) Some gateways use content as an array directly
  if (Array.isArray(firstCandidate?.content)) {
    const text = firstCandidate.content
      .map((p: any) => (p && typeof p.text === "string" ? p.text : ""))
      .filter(Boolean)
      .join("\n")
      .trim()
    if (text) return text
  }

  // 4) Fallback: stringify for debugging
  return typeof r === "string" ? r : JSON.stringify(r)
}

const parseAndValidateAnalysis = (jsonText: string): CVAnalysisResult => {
  try {
    // Try parsing the entire string first
    let parsed: unknown
    try {
      parsed = JSON.parse(jsonText)
    } catch {
      // If model returned prose + JSON, attempt to extract the first JSON object block
      const start = jsonText.indexOf("{")
      const end = jsonText.lastIndexOf("}")
      if (start !== -1 && end !== -1 && end > start) {
        const maybeJson = jsonText.substring(start, end + 1)
        parsed = JSON.parse(maybeJson)
      } else {
        throw new Error("Model did not return JSON")
      }
    }
    const result = cvAnalysisSchema.safeParse(parsed)
    
    if (!result.success) {
      const issues = result.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ")
      throw new Error(`Invalid analysis JSON schema: ${issues}`)
    }
    
    return result.data as CVAnalysisResult
  } catch (error) {
    throw new Error(`Failed to parse CV analysis JSON: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
