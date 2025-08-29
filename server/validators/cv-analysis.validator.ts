import { z } from "zod"

/**
 * Zod validation schema for CV analysis results
 * Pure validation logic with no external dependencies
 */
export const cvAnalysisSchema = z.object({
  overallScore: z.number().int().min(0).max(100),
  analysis: z.object({
    strengths: z.array(z.string().min(10).max(200)).min(3).max(8),
    weaknesses: z.array(z.string().min(10).max(200)).min(3).max(8),
    skillsBreakdown: z.object({
      technical: z.number().int().min(0).max(100),
      experience: z.number().int().min(0).max(100),
      education: z.number().int().min(0).max(100),
      soft_skills: z.number().int().min(0).max(100),
    }),
    suggestions: z.array(z.string().min(15).max(250)).min(3).max(7),
    detailedAnalysis: z.object({
      technicalSkills: z.object({
        matched: z.array(z.string().max(100)).max(15),
        missing: z.array(z.string().max(100)).max(15),
      }),
      experienceNotes: z.string().min(50).max(500),
      educationNotes: z.string().min(50).max(500),
    }),
  }),
})

export type CVAnalysisSchema = typeof cvAnalysisSchema
