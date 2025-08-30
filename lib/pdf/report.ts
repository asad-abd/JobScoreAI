import { jsPDF } from "jspdf"

export const generateAnalysisPdf = (data: {
  overallScore: number
  analysis: {
    strengths: string[]
    weaknesses: string[]
    skillsBreakdown: Record<string, number>
    suggestions: string[]
    detailedAnalysis?: {
      technicalSkills?: { matched?: string[]; missing?: string[] }
      experienceNotes?: string
      educationNotes?: string
    }
  }
}): void => {
  const doc = new jsPDF({ unit: "pt", format: "a4" })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 40
  const contentWidth = pageWidth - margin * 2
  let y = margin

  const addTitle = (text: string) => {
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(37, 99, 235) // blue-600
    doc.text(text, margin, y)
    y += 24
    doc.setTextColor(0, 0, 0)
  }

  const addSubTitle = (text: string) => {
    if (y > pageHeight - margin - 24) { doc.addPage(); y = margin }
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(30, 58, 138) // blue-900
    doc.text(text, margin, y)
    y += 18
    doc.setTextColor(0, 0, 0)
  }

  const addParagraph = (text: string) => {
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    const lines = doc.splitTextToSize(text, contentWidth)
    lines.forEach((line) => {
      if (y > pageHeight - margin) { doc.addPage(); y = margin }
      doc.text(line, margin, y)
      y += 16
    })
    y += 4
  }

  const addBulletList = (items: string[]) => {
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    items.forEach((item) => {
      if (y > pageHeight - margin) { doc.addPage(); y = margin }
      const bullet = "• "
      const wrapped = doc.splitTextToSize(item, contentWidth - 14)
      doc.text(bullet + wrapped[0], margin, y)
      y += 16
      wrapped.slice(1).forEach((cont) => {
        if (y > pageHeight - margin) { doc.addPage(); y = margin }
        doc.text("  " + cont, margin, y)
        y += 16
      })
    })
    y += 4
  }

  const addSkillsBarChart = (skills: Record<string, number>) => {
    if (!skills) return
    const entries = Object.entries(skills)
    if (!entries.length) return
    addSubTitle("Skills Chart")
    const chartX = margin
    const chartY = y
    const barHeight = 16
    const gap = 10
    const maxBarWidth = contentWidth - 120
    entries.forEach(([label, value], idx) => {
      const barY = chartY + idx * (barHeight + gap)
      const width = Math.max(2, Math.min(maxBarWidth, (value / 100) * maxBarWidth))
      // label
      doc.setFontSize(10)
      doc.text(label.replace("_", " "), chartX, barY + 12)
      // bar bg
      doc.setDrawColor(229, 231, 235) // gray-200
      doc.setFillColor(229, 231, 235)
      doc.rect(chartX + 110, barY, maxBarWidth, barHeight, "F")
      // bar value
      doc.setFillColor(59, 130, 246) // blue-500
      doc.rect(chartX + 110, barY, width, barHeight, "F")
      doc.setTextColor(30, 64, 175)
      doc.text(`${value}%`, chartX + 110 + width + 6, barY + 12)
      doc.setTextColor(0, 0, 0)
    })
    y = chartY + entries.length * (barHeight + gap) + 8
  }

  addTitle("Job Score AI - Analysis Report")
  addParagraph(`Overall Match Score: ${data.overallScore}%`)

  addSubTitle("Strengths")
  addBulletList(data.analysis.strengths || [])

  addSubTitle("Areas to Improve")
  addBulletList(data.analysis.weaknesses || [])

  addSubTitle("Skills Breakdown")
  addSkillsBarChart(data.analysis.skillsBreakdown || {})

  addSubTitle("Suggestions")
  addBulletList(data.analysis.suggestions || [])

  const d = data.analysis.detailedAnalysis
  if (d) {
    addSubTitle("Detailed Analysis")
    if (d.technicalSkills) {
      addParagraph("Matched Skills:")
      addBulletList(d.technicalSkills.matched || [])
      addParagraph("Missing Skills:")
      addBulletList(d.technicalSkills.missing || [])
    }
    if (d.experienceNotes) {
      addSubTitle("Experience Notes")
      addParagraph(d.experienceNotes)
    }
    if (d.educationNotes) {
      addSubTitle("Education Notes")
      addParagraph(d.educationNotes)
    }
  }

  doc.save("job-score-analysis.pdf")
}


