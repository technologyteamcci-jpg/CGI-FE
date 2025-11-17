"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // retry: (failureCount, error) => {
      //     // @ts-ignore
      //     if (error?.status === 401 || error?.status === 403) {
      //         return false
      //     }
      //     return failureCount <= 3 ? true : false;
      // }
    },
  },
});

interface ReactQueryClientProps {
  children: ReactNode;
}

function ReactQueryClient({ children }: ReactQueryClientProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryClient;
