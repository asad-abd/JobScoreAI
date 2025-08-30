import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../server/trpc/router'

/**
 * Create tRPC client for direct usage (non-React)
 */
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
})

/**
 * Create tRPC React hooks
 */
export const trpc = createTRPCReact<AppRouter>()
