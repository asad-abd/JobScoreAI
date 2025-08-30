import { CreateNextContextOptions } from '@trpc/server/adapters/next'

/**
 * Creates context for tRPC requests
 */
export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  return {
    req,
    res,
  }
}

export type Context = typeof createContext
