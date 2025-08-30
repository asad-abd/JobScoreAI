import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { TRPCProvider } from "@/lib/trpc/provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Job Score AI - AI-Powered Job Analysis",
  description:
    "Get AI-powered insights on your resume with detailed analysis of strengths, weaknesses, and job fit score. Upload your CV and job description for instant results.",
    generator: 'job-score-ai'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className={inter.className}>
        <TRPCProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <ThemeToggleButton />
            {children}
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  )
}
