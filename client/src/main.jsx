import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { StoreProvider } from "easy-peasy";

import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />

          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>
);
