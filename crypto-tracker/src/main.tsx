import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyle from "./GlobalStyle.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { ThemeProvider } from "styled-components";
import { createRoot } from "react-dom/client";
import router from "./Router.tsx";
import { theme } from "./theme.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
