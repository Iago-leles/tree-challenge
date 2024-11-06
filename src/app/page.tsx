'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "@/components/Header";
import Content from "@/components/Content";
import { SelectedComponentProvider } from "@/contexts/SelectedComponentContext";

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
      <SelectedComponentProvider>
        <Header />

        <Content />
      </SelectedComponentProvider>
    </QueryClientProvider>
  )
}
