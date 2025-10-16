import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { DataProvider } from "./dataContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </ChakraProvider>
  </React.StrictMode>
);
