"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Brain,
  CheckCircle,
  AlertTriangle,
  Target,
  Download,
  Upload,
  TrendingUp,
  Award,
  FileText,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { CVAnalysisResult } from "@/types/cv-analysis"
import { generateAnalysisPdf } from "@/lib/pdf/report"

const SCORE_THRESHOLDS = {
  EXCEPTIONAL: 90,
  STRONG: 80,
  GOOD: 70,
  MODERATE: 60,
  WEAK: 50,
  POOR: 0
} as const

export default function ResultsPage() {
  const [result, setResult] = useState<CVAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("cvAnalysisResult")
      if (!raw) return
      const parsed = JSON.parse(raw) as CVAnalysisResult
      setResult(parsed)
    } catch (e) {
      setError("Failed to load analysis result")
    }
  }, [])

  const overallScore = result?.overallScore ?? 0
  const analysisData = useMemo(() => result?.analysis, [result])
  const skillsEntries = useMemo(() => (
    analysisData ? (Object.entries(analysisData.skillsBreakdown) as [string, number][]) : []
  ), [analysisData])

  const getMatchLabel = (score: number): string => {
    if (score >= SCORE_THRESHOLDS.EXCEPTIONAL) return "Exceptional Match"
    if (score >= SCORE_THRESHOLDS.STRONG) return "Strong Match"
    if (score >= SCORE_THRESHOLDS.GOOD) return "Good Match"
    if (score >= SCORE_THRESHOLDS.MODERATE) return "Moderate Match"
    if (score >= SCORE_THRESHOLDS.WEAK) return "Weak Match"
    return "Poor Match"
  }

  const getScoreColor = (score: number) => {
    if (score >= SCORE_THRESHOLDS.EXCEPTIONAL) return "text-green-600"
    if (score >= SCORE_THRESHOLDS.STRONG) return "text-green-500"
    if (score >= SCORE_THRESHOLDS.GOOD) return "text-green-400"
    if (score >= SCORE_THRESHOLDS.MODERATE) return "text-yellow-600"
    if (score >= SCORE_THRESHOLDS.WEAK) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= SCORE_THRESHOLDS.EXCEPTIONAL) return "default"
    if (score >= SCORE_THRESHOLDS.STRONG) return "default"
    if (score >= SCORE_THRESHOLDS.GOOD) return "secondary"
    if (score >= SCORE_THRESHOLDS.MODERATE) return "secondary"
    if (score >= SCORE_THRESHOLDS.WEAK) return "outline"
    return "destructive"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-blue-50/20 to-gray-50/30 dark:from-slate-950/50 dark:via-blue-950/20 dark:to-gray-950/30">

      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/upload">
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
          <Link href="/upload">
            <Button variant="outline" size="sm" className="bg-white/90 text-blue-700 border-blue-200 hover:bg-white hover:text-blue-800 dark:bg-gray-100/90 dark:text-blue-700 dark:border-blue-300">
              <Upload className="size-4 mr-2" />
              New Analysis
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Your Resume Analysis</h1>
            <div className="flex items-center justify-center gap-4">
              <Badge variant={getScoreBadgeVariant(overallScore)} className="text-lg px-4 py-2 rounded-full">
                <Award className="size-4 mr-2" />
                {getMatchLabel(overallScore)}
              </Badge>
            </div>
          </div>

          {/* Overall Score Card */}
          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Target className="size-5" />
                Overall Job Fit Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-6">
                {/* Large central radial chart */}
                <div className="relative w-40 h-40">
                  <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="35"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      strokeLinecap="round"
                      className={
                        overallScore >= SCORE_THRESHOLDS.EXCEPTIONAL 
                          ? "text-green-500" 
                          : overallScore >= SCORE_THRESHOLDS.STRONG
                            ? "text-green-400"
                            : overallScore >= SCORE_THRESHOLDS.GOOD
                              ? "text-green-300"
                              : overallScore >= SCORE_THRESHOLDS.MODERATE 
                                ? "text-yellow-500"
                                : overallScore >= SCORE_THRESHOLDS.WEAK
                                  ? "text-orange-500"
                                  : "text-red-500"
                      }
                      strokeDasharray={`${2 * Math.PI * 35}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 35 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 35 * (1 - overallScore / 100) }}
                      transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}%</div>
                      <div className="text-sm text-muted-foreground">Match</div>
                    </motion.div>
                  </div>
                </div>
                
                <p className="text-center text-muted-foreground max-w-md">
                  {overallScore >= SCORE_THRESHOLDS.EXCEPTIONAL
                    ? "Exceptional match! You exceed the requirements for this position."
                    : overallScore >= SCORE_THRESHOLDS.STRONG
                      ? "Strong match! You meet most requirements very well."
                      : overallScore >= SCORE_THRESHOLDS.GOOD
                        ? "Good match! Some gaps but you're suitable for this role."
                        : overallScore >= SCORE_THRESHOLDS.MODERATE
                          ? "Moderate match with several important gaps to address."
                          : overallScore >= SCORE_THRESHOLDS.WEAK
                            ? "Weak match with significant gaps in key areas."
                            : "Poor match with major misalignment to the role requirements."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Main Analysis Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <CheckCircle className="size-5" />
                      Key Strengths ({analysisData?.strengths?.length ?? 0} matches)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(analysisData?.strengths ?? []).map((strength, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Weaknesses Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                      <AlertTriangle className="size-5" />
                      Areas to Improve ({analysisData?.weaknesses?.length ?? 0} gaps)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(analysisData?.weaknesses ?? []).map((weakness, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <AlertTriangle className="size-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{weakness}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="size-5" />
                    Skills Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-8">
                    {skillsEntries.map(([category, score], index) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex flex-col items-center text-center space-y-4"
                      >
                        <div className="relative w-24 h-24">
                          {/* Background circle */}
                          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              className="text-gray-200 dark:text-gray-700"
                            />
                            {/* Progress circle */}
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              strokeLinecap="round"
                              className={
                                score >= SCORE_THRESHOLDS.EXCEPTIONAL 
                                  ? "text-green-500" 
                                  : score >= SCORE_THRESHOLDS.STRONG
                                    ? "text-green-400"
                                    : score >= SCORE_THRESHOLDS.GOOD
                                      ? "text-green-300"
                                      : score >= SCORE_THRESHOLDS.MODERATE 
                                        ? "text-yellow-500"
                                        : score >= SCORE_THRESHOLDS.WEAK
                                          ? "text-orange-500"
                                          : "text-red-500"
                              }
                              strokeDasharray={`${2 * Math.PI * 40}`}
                              initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                              animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - score / 100) }}
                              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + index * 0.2 }}
                            />
                          </svg>
                          {/* Percentage text */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.span
                              className={`text-xl font-bold ${getScoreColor(score)}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                            >
                              {score}%
                            </motion.span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg capitalize">{category.replace("_", " ")}</h3>
                          <p className="text-sm text-muted-foreground">
                            {score >= SCORE_THRESHOLDS.EXCEPTIONAL ? "Exceptional" : score >= SCORE_THRESHOLDS.STRONG ? "Strong" : score >= SCORE_THRESHOLDS.GOOD ? "Good" : score >= SCORE_THRESHOLDS.MODERATE ? "Moderate" : score >= SCORE_THRESHOLDS.WEAK ? "Weak" : "Poor"}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="detailed" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="size-5" />
                    Detailed Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="technical-skills">
                      <AccordionTrigger>Technical Skills Analysis</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {analysisData?.detailedAnalysis?.technicalSkills ? (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">Matched Skills</h4>
                                <ul className="text-sm space-y-1">
                                  {(analysisData?.detailedAnalysis?.technicalSkills?.matched ?? []).map((s, i) => (
                                    <li key={i}>• {s}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium text-orange-700 dark:text-orange-400 mb-2">Missing Skills</h4>
                                <ul className="text-sm space-y-1">
                                  {(analysisData?.detailedAnalysis?.technicalSkills?.missing ?? []).map((s, i) => (
                                    <li key={i}>• {s}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No detailed technical skills available.</p>
                          )}
                          
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="experience">
                      <AccordionTrigger>Experience Analysis</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          {analysisData?.detailedAnalysis?.experienceNotes ?? "No experience notes available."}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="education">
                      <AccordionTrigger>Education & Certifications</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          {analysisData?.detailedAnalysis?.educationNotes ?? "No education notes available."}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="size-5" />
                    Improvement Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(analysisData?.suggestions ?? []).map((suggestion, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800"
                      >
                        <Lightbulb className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{suggestion}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full bg-white/90 text-blue-700 border-blue-200 hover:bg-white hover:text-blue-800 dark:bg-gray-100/90 dark:text-blue-700 dark:border-blue-300"
              disabled={!result}
              onClick={() => result && generateAnalysisPdf(result)}
            >
              <Download className="size-4 mr-2" />
              Download Report
            </Button>
            <Link href="/upload">
              <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                <Upload className="size-4 mr-2" />
                Analyze Another Resume
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
