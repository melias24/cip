import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppContextProvider } from "./AppContext";
import Navbar from "./components/Navbar";
import { PRO_THEME } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={PRO_THEME}>
      <AppContextProvider>
        <Navbar />
        <App />
      </AppContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
