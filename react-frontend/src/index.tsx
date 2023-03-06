import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./chakra/theme";
import "@fontsource/roboto";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);
let persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
