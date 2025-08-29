export const cvAnalysisJsonSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "CV Analysis Results Schema",
  type: "object",
  properties: {
    overallScore: {
      type: "integer",
      minimum: 0,
      maximum: 100,
      description: "Overall job fit score as a percentage (0-100)",
    },
    analysis: {
      type: "object",
      properties: {
        strengths: {
          type: "array",
          items: { type: "string", minLength: 10, maxLength: 200 },
          minItems: 3,
          maxItems: 8,
          description: "Key strengths and matches between CV and job requirements",
        },
        weaknesses: {
          type: "array",
          items: { type: "string", minLength: 10, maxLength: 200 },
          minItems: 3,
          maxItems: 8,
          description: "Areas for improvement and missing requirements",
        },
        skillsBreakdown: {
          type: "object",
          properties: {
            technical: { type: "integer", minimum: 0, maximum: 100 },
            experience: { type: "integer", minimum: 0, maximum: 100 },
            education: { type: "integer", minimum: 0, maximum: 100 },
            soft_skills: { type: "integer", minimum: 0, maximum: 100 },
          },
          required: ["technical", "experience", "education", "soft_skills"],
          additionalProperties: false,
        },
        suggestions: {
          type: "array",
          items: { type: "string", minLength: 15, maxLength: 250 },
          minItems: 3,
          maxItems: 7,
          description: "Actionable improvement recommendations",
        },
        detailedAnalysis: {
          type: "object",
          properties: {
            technicalSkills: {
              type: "object",
              properties: {
                matched: { type: "array", items: { type: "string", maxLength: 100 }, maxItems: 15 },
                missing: { type: "array", items: { type: "string", maxLength: 100 }, maxItems: 15 },
              },
              required: ["matched", "missing"],
            },
            experienceNotes: { type: "string", minLength: 50, maxLength: 500 },
            educationNotes: { type: "string", minLength: 50, maxLength: 500 },
          },
          required: ["technicalSkills", "experienceNotes", "educationNotes"],
        },
      },
      required: ["strengths", "weaknesses", "skillsBreakdown", "suggestions", "detailedAnalysis"],
      additionalProperties: false,
    },
  },
  required: ["overallScore", "analysis"],
  additionalProperties: false,
} as const


