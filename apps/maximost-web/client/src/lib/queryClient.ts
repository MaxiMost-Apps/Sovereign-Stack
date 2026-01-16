import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false, // Prevents refetching on window focus
      retry: 2, // Retry failed requests 2 times
    },
  },
});

export { queryClient };
