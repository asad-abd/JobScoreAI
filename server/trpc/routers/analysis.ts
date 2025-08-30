import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { analyzeCvAgainstJob } from '../../controllers/cv-analysis.controller'

const fileSchema = z.object({
  name: z.string(),
  type: z.string(),
  size: z.number(),
  content: z.string(), // Base64 encoded content
})

const analyzeInputSchema = z.object({
  job: fileSchema,
  cv: fileSchema,
})

/**
 * Analysis router containing CV analysis procedures
 */
export const analysisRouter = router({
  /**
   * Analyzes CV against job description using AI
   */
  analyzeCv: publicProcedure
    .input(analyzeInputSchema)
    .mutation(async ({ input }) => {
      const { job, cv } = input

      // Validate file types
      if (job.type !== "application/pdf" && !job.type.includes("text")) {
        throw new Error("Job file must be PDF or text")
      }
      if (cv.type !== "application/pdf" && !cv.type.includes("text")) {
        throw new Error("CV file must be PDF or text")
      }

      // Validate file sizes (5MB limit)
      if (job.size > 5 * 1024 * 1024) {
        throw new Error("Job file size must be under 5MB")
      }
      if (cv.size > 5 * 1024 * 1024) {
        throw new Error("CV file size must be under 5MB")
      }

      let jdText = ""
      let cvText = ""

      try {
        // Convert base64 back to buffer for PDF processing
        const jobBuffer = Buffer.from(job.content, 'base64')
        const cvBuffer = Buffer.from(cv.content, 'base64')

        // Handle PDF files
        if (job.type === "application/pdf") {
          const pdfParse = require("pdf-parse-debugging-disabled")
          const jdPdf = await pdfParse(jobBuffer)
          jdText = jdPdf.text || ""
        } else {
          // Handle text files
          jdText = jobBuffer.toString('utf-8')
        }

        if (cv.type === "application/pdf") {
          const pdfParse = require("pdf-parse-debugging-disabled")
          const cvPdf = await pdfParse(cvBuffer)
          cvText = cvPdf.text || ""
        } else {
          // Handle text files
          cvText = cvBuffer.toString('utf-8')
        }

        console.log("Extracted texts - JD length:", jdText.length, "CV length:", cvText.length)

        if (!jdText.trim() || !cvText.trim()) {
          throw new Error("Could not extract text from files")
        }

        const result = await analyzeCvAgainstJob(jdText, cvText)
        return result
      } catch (error) {
        console.error("tRPC analyze error:", error)
        throw new Error(error instanceof Error ? error.message : "Analysis failed")
      }
    }),
})
