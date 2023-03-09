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
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root")!;
const root = createRoot(container);
let persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="25238910228-m3ic4k6dggf9c2i0d3s4vcdmlbp89t2p.apps.googleusercontent.com">
        <ChakraProvider theme={theme}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        </ChakraProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
