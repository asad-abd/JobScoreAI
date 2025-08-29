import { NextResponse } from "next/server"
import { analyzeCvAgainstJob } from "../../../server/controllers/cv-analysis.controller"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || ""
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "multipart/form-data required" }, { status: 400 })
    }

    const form = await req.formData()
    const job = form.get("job")
    const cv = form.get("cv")

    if (!(job instanceof File) || !(cv instanceof File)) {
      return NextResponse.json({ error: "Fields 'job' and 'cv' must be files" }, { status: 400 })
    }

    let jdText = ""
    let cvText = ""

    // Handle both PDF and text files for testing
    if (job.type === "application/pdf") {
      const jobBuffer = Buffer.from(await job.arrayBuffer())
      const pdfParse = require("pdf-parse-debugging-disabled")
      const jdPdf = await pdfParse(jobBuffer)
      jdText = jdPdf.text || ""
    } else {
      // For testing with text files
      jdText = await job.text()
    }

    if (cv.type === "application/pdf") {
      const cvBuffer = Buffer.from(await cv.arrayBuffer())
      const pdfParse = require("pdf-parse-debugging-disabled")
      const cvPdf = await pdfParse(cvBuffer)
      cvText = cvPdf.text || ""
    } else {
      // For testing with text files
      cvText = await cv.text()
    }

    console.log("Extracted texts - JD length:", jdText.length, "CV length:", cvText.length)

    if (!jdText.trim() || !cvText.trim()) {
      return NextResponse.json({ error: "Could not extract text from files" }, { status: 400 })
    }

    const result = await analyzeCvAgainstJob(jdText, cvText)
    
    return NextResponse.json(result)
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error"
    console.error("/api/analyze error:", e)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}