'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "@/components/Header";
import Content from "@/components/Content";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  }
})

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />

      <Content />
    </QueryClientProvider>
  )
}
