import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { darkTheme, lightTheme } from "./theme";

import GlobalStyle from "./GlobalStyle";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { isDarkAtom } from "./atoms";
import router from "./Router";
import { useRecoilValue } from "recoil";

const queryClient = new QueryClient();

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
