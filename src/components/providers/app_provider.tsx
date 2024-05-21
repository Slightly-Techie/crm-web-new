"use client";
import store from "@/redux";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

const queryClient = new QueryClient();

export const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <Provider store={store}>
      <NextThemesProvider {...props}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
      </NextThemesProvider>
    </Provider>
  );
};
