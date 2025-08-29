"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileText, AlertCircle, ArrowLeft, Brain, Search, Target, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function UploadPage() {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [jdFile, setJdFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingPhase, setProcessingPhase] = useState(0)
  const router = useRouter()

  const processingPhases = [
    {
      icon: <Search className="size-8 text-blue-600" />,
      title: "Parsing Documents",
      description: "Extracting text and structure from your PDFs...",
      logo: "📄",
    },
    {
      icon: <Brain className="size-8 text-purple-600" />,
      title: "AI Processing",
      description: "Analyzing content with advanced language models...",
      logo: "🧠",
    },
    {
      icon: <Target className="size-8 text-green-600" />,
      title: "Matching Analysis",
      description: "Comparing skills and requirements semantically...",
      logo: "🎯",
    },
  ]

  const handleFileUpload = (file: File, type: "cv" | "jd") => {
    setError(null)

    // Validate file type
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed")
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB")
      return
    }

    if (type === "cv") {
      setCvFile(file)
    } else {
      setJdFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent, type: string) => {
    e.preventDefault()
    setDragOver(type)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(null)
  }

  const handleDrop = (e: React.DragEvent, type: "cv" | "jd") => {
    e.preventDefault()
    setDragOver(null)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0], type)
    }
  }

  const handleSubmit = async () => {
    if (!cvFile || !jdFile) {
      setError("Please upload both CV and Job Description files")
      return
    }

    setIsProcessing(true)
    setError(null)
    setProcessingPhase(0)

    const phaseInterval = setInterval(() => {
      setProcessingPhase((prev) => {
        if (prev >= processingPhases.length - 1) {
          clearInterval(phaseInterval)
          // Navigate to results after all phases complete
          setTimeout(() => {
            router.push("/results")
          }, 1000)
          return prev
        }
        return prev + 1
      })
    }, 5000)
  }

  const FileUploadArea = ({
    type,
    file,
    onFileSelect,
  }: {
    type: "cv" | "jd"
    file: File | null
    onFileSelect: (file: File) => void
  }) => (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 ${
        dragOver === type ? "border-blue-400 bg-blue-50/50 dark:bg-blue-950/20" : "border-border"
      } ${file ? "border-green-400 bg-green-50/50 dark:bg-green-950/20" : ""}`}
      onDragOver={(e) => handleDragOver(e, type)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, type)}
      onClick={() => document.getElementById(`${type}-input`)?.click()}
    >
      <input
        id={`${type}-input`}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFileSelect(file)
        }}
      />

      <div className="flex flex-col items-center gap-4">
        {file ? (
          <>
            <FileText className="size-12 text-green-600" />
            <div>
              <p className="font-medium text-green-700 dark:text-green-400">{file.name}</p>
              <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </>
        ) : (
          <>
            <Upload className="size-12 text-muted-foreground" />
            <div>
              <p className="font-medium">
                Drag your {type === "cv" ? "CV" : "Job Description"} here or click to browse
              </p>
              <p className="text-sm text-muted-foreground mt-1">PDF files only, max 5MB</p>
            </div>
          </>
        )}
      </div>
    </div>
  )

  if (isProcessing) {
    const currentPhase = processingPhases[processingPhase]

    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-green-500/10"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.05), rgba(34, 197, 94, 0.1))",
                "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(34, 197, 94, 0.05), rgba(59, 130, 246, 0.1))",
                "linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.1))",
              ],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        <div className="text-center space-y-8 max-w-md mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={processingPhase}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-6"
            >
              <div className="relative">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {currentPhase.logo}
                </motion.div>
                <motion.div
                  className="absolute -inset-4 rounded-full border-2 border-dashed border-blue-300"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </div>

              <div className="flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  {currentPhase.icon}
                </motion.div>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold">{currentPhase.title}</h2>
                <p className="text-muted-foreground text-lg">{currentPhase.description}</p>
              </div>

              <div className="flex items-center gap-2">
                {processingPhases.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 w-8 rounded-full ${
                      index <= processingPhase ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                    initial={{ scale: 0.8 }}
                    animate={{
                      scale: index === processingPhase ? [0.8, 1.2, 0.8] : 0.8,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: index === processingPhase ? Number.POSITIVE_INFINITY : 0,
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="size-3 bg-blue-600 rounded-full"
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {processingPhase >= processingPhases.length - 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
              <Button size="lg" className="rounded-full h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => router.push("/results")}>
                View Results
                <CheckCircle className="ml-2 size-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-blue-50/20 to-gray-50/30 dark:from-slate-950/50 dark:via-blue-950/20 dark:to-gray-950/30">

      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-foreground hover:text-foreground/80">
                <ArrowLeft className="size-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2 font-bold">
              <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Brain className="size-5 text-white" />
              </div>
              <span>Job Score AI</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Upload Your Documents</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Select your CV and job description PDFs to begin the AI-powered analysis
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="size-5" />
                  Your CV/Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FileUploadArea type="cv" file={cvFile} onFileSelect={(file) => handleFileUpload(file, "cv")} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="size-5" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FileUploadArea type="jd" file={jdFile} onFileSelect={(file) => handleFileUpload(file, "jd")} />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button size="lg" className="rounded-full h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white" disabled={!cvFile || !jdFile} onClick={handleSubmit}>
              Analyze Now
              <Brain className="ml-2 size-4" />
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>Your files will be processed securely and not stored permanently</p>
            <p>Analysis typically takes 30-60 seconds</p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
