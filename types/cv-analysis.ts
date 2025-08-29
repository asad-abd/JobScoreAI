/**
 * TypeScript interfaces for CV analysis system
 * Shared types across frontend and backend
 */
export interface CVAnalysisResult {
  overallScore: number
  analysis: {
    strengths: string[]
    weaknesses: string[]
    skillsBreakdown: {
      technical: number
      experience: number
      education: number
      soft_skills: number
    }
    suggestions: string[]
    detailedAnalysis: {
      technicalSkills: {
        matched: string[]
        missing: string[]
      }
      experienceNotes: string
      educationNotes: string
    }
  }
}
