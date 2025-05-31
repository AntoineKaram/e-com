import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { ConfigProvider, theme } from "antd";

import App from "./App";

import store from "./store";
import "./index.css";

const { defaultAlgorithm } = theme;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: defaultAlgorithm,
          token: {
            colorPrimary: "#1890ff",
            borderRadius: 8,
            fontSize: 16,
            controlHeight: 56,
            colorBgBase: "#f5f7fa",
            colorBgContainer: "#ffffff",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
