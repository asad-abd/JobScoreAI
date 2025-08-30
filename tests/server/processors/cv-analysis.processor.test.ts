import { describe, test, expect } from "vitest"
import { analyzeCvText } from "../../../server/processors/cv-analysis.processor"

describe("CV Analysis Processor", () => {
  test("should parse valid analysis response", () => {
    const validResponse = {
      output_text: JSON.stringify({
        overallScore: 85,
        analysis: {
          strengths: [
            "Strong programming experience",
            "Relevant educational background", 
            "Good technical skills match"
          ],
          weaknesses: [
            "Missing cloud experience",
            "Limited leadership experience",
            "No certifications mentioned"
          ],
          skillsBreakdown: {
            technical: 90,
            experience: 80,
            education: 85,
            soft_skills: 70
          },
          suggestions: [
            "Consider AWS certification",
            "Highlight any leadership experience",
            "Add relevant online courses"
          ],
          detailedAnalysis: {
            technicalSkills: {
              matched: ["JavaScript", "React", "Node.js"],
              missing: ["AWS", "Docker", "Kubernetes"]
            },
            experienceNotes: "Strong development experience with modern frameworks and good project management skills.",
            educationNotes: "Computer Science degree provides solid foundation with relevant coursework in algorithms."
          }
        }
      })
    }

    const result = analyzeCvText(validResponse)
    expect(result.overallScore).toBe(85)
    expect(result.analysis.strengths).toHaveLength(3)
    expect(result.analysis.skillsBreakdown.technical).toBe(90)
  })

  test("should throw error for invalid schema", () => {
    const invalidResponse = {
      output_text: JSON.stringify({
        overallScore: "invalid", // Should be number
        analysis: {}
      })
    }

    expect(() => analyzeCvText(invalidResponse)).toThrow("Invalid analysis JSON schema")
  })
})
