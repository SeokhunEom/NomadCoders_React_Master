import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { darkTheme, lightTheme } from "./theme";

import GlobalStyle from "./GlobalStyle";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import router from "./Router";

const queryClient = new QueryClient();
export const IsDarkContext = createContext({
  isDark: false,
  toggleDark: () => {},
});

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark((current) => !current);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <IsDarkContext.Provider value={{ isDark, toggleDark }}>
          <GlobalStyle />
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </IsDarkContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
