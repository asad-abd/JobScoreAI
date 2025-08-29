import { analyzeCvText } from "../processors/cv-analysis.processor"
import { callGeminiApi } from "../accessors/gemini.accessor"
import { CV_ANALYSIS_PROMPTS } from "../agents/cv-analysis/prompts"
import { cvAnalysisJsonSchema } from "../agents/cv-analysis/schema"
import type { CVAnalysisResult } from "../../types/cv-analysis"

/**
 * Controller for CV analysis orchestration
 * Coordinates between accessors and processors without business logic
 */
export const analyzeCvAgainstJob = async (jdText: string, cvText: string): Promise<CVAnalysisResult> => {
  if (!jdText?.trim() || !cvText?.trim()) {
    throw new Error("Empty job description or CV text")
  }

  const requestBody = buildAnalysisRequest(jdText, cvText)
  console.log("requestBody", requestBody)
  const response = await callGeminiApi(requestBody)
  console.log(response)
  return analyzeCvText(response)
}

const buildAnalysisRequest = (jdText: string, cvText: string) => ({
  model: "gemini-1.5-flash",
  systemInstruction: { 
    role: "system" as const, 
    parts: [{ text: [
      CV_ANALYSIS_PROMPTS.system,
      "\nReturn ONLY valid JSON matching this schema (no prose, no code fences):\n",
      JSON.stringify(cvAnalysisJsonSchema)
    ].join("") }] 
  },
  contents: [
    {
      role: "user" as const,
      parts: [
        { text: CV_ANALYSIS_PROMPTS.instructions },
        { text: `\nCV CONTENT:\n${cvText}` },
        { text: `\nJOB DESCRIPTION:\n${jdText}` },
        { text: `\nReturn the analysis as JSON:` },
      ],
    },
  ],
  generationConfig: { temperature: 0.2, maxOutputTokens: 1200, responseMimeType: "application/json" },
})
