"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Zap, CheckCircle, FileText, Brain, Target, Shield, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-gradient-to-b from-slate-50 via-blue-50/30 to-white dark:from-slate-950 dark:via-blue-950/20 dark:to-black">
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center">
              <Brain className="size-6 text-white" />
            </div>
            <span>Job Score AI</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              href="#guidelines"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Guidelines
            </Link>
            <Link
              href="#notes"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Important Notes
            </Link>
          </nav>
          <Link href="/upload">
            <Button className="rounded-full">
              Get Started
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden relative bg-gradient-to-b from-blue-50/50 via-blue-100/30 to-transparent dark:from-blue-950/30 dark:via-blue-900/20 dark:to-transparent">
          {/* Full-width grid background */}
          <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
            <motion.div
              className="absolute inset-0 w-[150%] h-[150%] -left-[25%] -top-[25%]"
              animate={{
                x: [0, -80, 0],
                y: [0, -80, 0],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {/* <div className="h-full w-full bg-transparent bg-[linear-gradient(to_right,#e1e3e6_1px,transparent_1px),linear-gradient(to_bottom,#e1e3e6_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#4b5563_1px,transparent_1px),linear-gradient(to_bottom,#4b5563_1px,transparent_1px)] bg-[size:4rem_4rem]"></div> */}
              <div className="h-full w-full bg-transparent bg-[linear-gradient(to_right,#e1e3e6_3px,transparent_3px),linear-gradient(to_bottom,#e1e3e6_3px,transparent_3px)] dark:bg-[linear-gradient(to_right,#4b5563_3px,transparent_3px),linear-gradient(to_bottom,#4b5563_3px,transparent_3px)] bg-[size:4rem_4rem]"></div>
            </motion.div>

            {/* Smooth ripple effects with better transitions */}
            <motion.div
              className="absolute inset-0 opacity-25"
              animate={{
                background: [
                  "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.15) 15%, rgba(59, 130, 246, 0.08) 35%, rgba(59, 130, 246, 0.04) 55%, transparent 75%)",
                  "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.5) 0%, rgba(59, 130, 246, 0.25) 20%, rgba(59, 130, 246, 0.12) 40%, rgba(59, 130, 246, 0.06) 60%, transparent 80%)",
                  "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(59, 130, 246, 0.1) 45%, rgba(59, 130, 246, 0.05) 65%, transparent 85%)",
                  "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 30%, rgba(59, 130, 246, 0.05) 50%, rgba(59, 130, 246, 0.02) 70%, transparent 90%)",
                ],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: [0.4, 0, 0.6, 1],
              }}
            />

            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0.12) 18%, rgba(99, 102, 241, 0.06) 36%, rgba(99, 102, 241, 0.03) 54%, transparent 72%)",
                  "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.4) 0%, rgba(99, 102, 241, 0.2) 22%, rgba(99, 102, 241, 0.1) 44%, rgba(99, 102, 241, 0.05) 66%, transparent 88%)",
                  "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.35) 0%, rgba(99, 102, 241, 0.18) 26%, rgba(99, 102, 241, 0.09) 52%, rgba(99, 102, 241, 0.04) 78%, transparent 94%)",
                  "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.08) 32%, rgba(99, 102, 241, 0.04) 64%, rgba(99, 102, 241, 0.02) 96%, transparent 100%)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: [0.4, 0, 0.6, 1],
                delay: 2,
              }}
            />

            <motion.div
              className="absolute inset-0 opacity-15"
              animate={{
                background: [
                  "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.1) 20%, rgba(168, 85, 247, 0.05) 40%, rgba(168, 85, 247, 0.025) 60%, transparent 80%)",
                  "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.35) 0%, rgba(168, 85, 247, 0.175) 25%, rgba(168, 85, 247, 0.09) 50%, rgba(168, 85, 247, 0.045) 75%, transparent 100%)",
                  "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0.125) 35%, rgba(168, 85, 247, 0.06) 70%, rgba(168, 85, 247, 0.03) 90%, transparent 100%)",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: [0.4, 0, 0.6, 1],
                delay: 1,
              }}
            />

            {/* Grid enhancement overlay with smoother transitions */}
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                background: [
                  "radial-gradient(circle at 50% 50%, rgba(156, 163, 175, 0.4) 0%, rgba(156, 163, 175, 0.2) 25%, rgba(156, 163, 175, 0.1) 50%, rgba(156, 163, 175, 0.05) 75%, transparent 100%)",
                  "radial-gradient(circle at 50% 50%, rgba(156, 163, 175, 0.6) 0%, rgba(156, 163, 175, 0.3) 30%, rgba(156, 163, 175, 0.15) 60%, rgba(156, 163, 175, 0.075) 90%, transparent 100%)",
                  "radial-gradient(circle at 50% 50%, rgba(156, 163, 175, 0.5) 0%, rgba(156, 163, 175, 0.25) 35%, rgba(156, 163, 175, 0.125) 70%, rgba(156, 163, 175, 0.06) 95%, transparent 100%)",
                ],
              }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                ease: [0.4, 0, 0.6, 1],
                delay: 3,
              }}
            />

            {/* Comprehensive fade/glow effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent via-transparent to-white/90 dark:from-black/80 dark:via-transparent dark:via-transparent dark:to-black/90"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-transparent to-white/70 dark:from-black/70 dark:via-transparent dark:to-black/70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/60 dark:to-black/60"></div>

            {/* Radial mask for center focus */}
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_85%_70%_at_50%_30%,#000_60%,transparent_100%)]"></div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto mb-12 relative z-10"
            >
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100/90 text-blue-700 dark:bg-blue-900/90 dark:text-blue-300 backdrop-blur-sm"
                variant="secondary"
              >
                AI-Powered Analysis
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                Unlock Your Job Fit with AI Insights
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
                Upload your CV and job description to get a detailed analysis of
                strengths, weaknesses, and match score. Our Gemini-powered
                agents provide semantic comparison beyond simple keywords.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/upload">
                                      <Button
                      size="lg"
                      className="rounded-full h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white"
                    >
                    Start Analysis Now
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="size-4 text-blue-600" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-blue-600" />
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-blue-600" />
                  <span>PDF Support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="w-full py-20 md:py-32 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-950/50"
        >
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center">
                <Brain className="size-6 text-white" />
              </div>
              <span>Job Score AI</span>
            </div>
            <nav className="hidden md:flex gap-8">
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                How It Works
              </Link>
              <Link
                href="#guidelines"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Guidelines
              </Link>
              <Link
                href="#notes"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Important Notes
              </Link>
            </nav>
            <Link href="/upload">
              <Button className="rounded-full">
                Get Started
                <ArrowRight className="ml-1 size-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section
          id="guidelines"
          className="w-full py-20 md:py-32 bg-gradient-to-b from-slate-50/50 to-transparent dark:from-slate-950/50 dark:to-transparent"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                Evaluation Guidelines
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
                How We Evaluate Your Resume
              </h2>
              <p className="max-w-2xl text-muted-foreground md:text-lg text-pretty">
                We aim to empower your job search with accurate, AI-driven
                insights
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-3"
            >
              {[
                {
                  title: "Skills Matching",
                  description:
                    "Semantic comparison using AI agents for accuracy beyond simple keyword matching. We understand context and relevance.",
                  icon: <Zap className="size-5" />,
                },
                {
                  title: "Strengths & Weaknesses",
                  description:
                    "Highlights exact matches and identifies gaps with detailed explanations and improvement suggestions.",
                  icon: <CheckCircle className="size-5" />,
                },
                {
                  title: "Alignment Score",
                  description:
                    "0-100 scale based on multi-agent review considering skills, experience, and job requirements alignment.",
                  icon: <Target className="size-5" />,
                },
              ].map((guideline, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 mb-4">
                        {guideline.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3">
                        {guideline.title}
                      </h3>
                      <p className="text-muted-foreground text-pretty">
                        {guideline.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section
          id="notes"
          className="w-full py-20 md:py-32 bg-gradient-to-b from-transparent to-slate-50/30 dark:to-slate-950/30"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                Important Notes
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
                Before You Start
              </h2>
              <p className="max-w-2xl text-muted-foreground md:text-lg text-pretty">
                Please review these important guidelines for the best analysis
                results
              </p>
            </motion.div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "File Requirements",
                    answer:
                      "PDFs only, under 5MB each. For best results, use clear, text-based PDFs where text can be selected and copied. Scanned images may not work as well.",
                  },
                  {
                    question: "Privacy & Security",
                    answer:
                      "Your data is processed securely and not stored permanently. We use enterprise-grade encryption and follow strict data protection protocols.",
                  },
                  {
                    question: "AI Limitations",
                    answer:
                      "AI insights are suggestions based on pattern recognition. Always combine our analysis with human review and your professional judgment.",
                  },
                  {
                    question: "Best Practices",
                    answer:
                      "Ensure your CV includes relevant skills, experience, and achievements. The job description should be complete with clear requirements and responsibilities.",
                  },
                ].map((note, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <AccordionItem
                      value={`item-${i}`}
                      className="border-b border-border/40 py-2"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {note.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-pretty">
                        {note.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-blue-600 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
                Ready to Analyze Your Resume?
              </h2>
              <p className="mx-auto max-w-2xl text-white/90 md:text-xl text-pretty">
                Get AI-powered insights to improve your job application success.
                Let's help you stand out from the competition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/upload">
                                      <Button
                      size="lg"
                      variant="secondary"
                      className="rounded-full h-12 px-8 text-base bg-white/90 text-blue-700 hover:bg-white hover:text-blue-800 dark:bg-gray-100/90 dark:text-blue-700 dark:hover:bg-gray-100"
                    >
                    Start Analysis Now
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-gradient-to-b from-slate-50/30 to-white dark:from-slate-950/30 dark:to-black backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 font-bold">
              <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Brain className="size-5 text-white" />
              </div>
              <span>Job Score AI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md text-pretty">
              AI-powered resume analysis to help you land your dream job.
              Powered by advanced machine learning.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Job Score AI. All rights
              reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
