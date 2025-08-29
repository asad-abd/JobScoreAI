import pLimit from "p-limit"

const GEMINI_PROXY_URL = "https://intertest.woolf.engineering/invoke"

// Rate limiting: 20 req/min, 300/hr as per requirements
const perMinute = pLimit(20)
const perHour = pLimit(300)

type GeminiRequestBody = {
  model?: string
  contents: Array<{
    role?: "user" | "model" | "system"
    parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }>
  }>
  systemInstruction?: unknown
  generationConfig?: unknown
}

/**
 * Accessor for Gemini API calls with rate limiting
 * Pure data access layer - no business logic
 */
export const callGeminiApi = async (requestBody: GeminiRequestBody): Promise<unknown> => {
  const rawAuth = process.env.WOOLFAUTH
  if (!rawAuth) {
    throw new Error("WOOLFAUTH environment variable is required")
  }
  const auth = rawAuth.trim()
  if (!auth || auth === "your_token_here") {
    throw new Error("WOOLFAUTH is not set to a valid token")
  }

  const makeRequest = async () => {
    const response = await fetch(GEMINI_PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await safeReadText(response)
      throw new Error(`Gemini API error ${response.status}: ${errorText}`)
    }

    return response.json()
  }

  // Apply both minute and hour rate limits
  return perHour(() => perMinute(makeRequest))
}

const safeReadText = async (res: Response): Promise<string> => {
  try {
    const t = await res.text()
    return t
  } catch {
    try {
      return JSON.stringify(await res.json())
    } catch {
      return "<no error body>"
    }
  }
}
