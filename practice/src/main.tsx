import App from "./App.tsx";
import { StrictMode } from "react";
import { ThemeProvider } from "styled-components";
import { createRoot } from "react-dom/client";

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111111",
};

const lightTheme = {
  textColor: "#111111",
  backgroundColor: "whitesmoke",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
