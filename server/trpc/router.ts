import { router } from './trpc'
import { analysisRouter } from './routers/analysis'

/**
 * Main tRPC router combining all sub-routers
 */
export const appRouter = router({
  analysis: analysisRouter,
})

export type AppRouter = typeof appRouter
