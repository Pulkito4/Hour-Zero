'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour // 1 hr before refetch
      gcTime: 1000 * 60 * 60 * 24, // 24 hours // 1 day before garbage collection
      refetchOnWindowFocus: false, // No refetch on focus
      refetchOnReconnect: true, // Refetch on network reconnect
      retry: 1, // Retry failed queries once
    }
  }
})

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}