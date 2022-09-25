import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from "./Store"
import { ToastContainer } from "react-toastify"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import "./index.css"
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from "react-cookie"
const container = document.getElementById('root');
const root = createRoot(container);
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient} >
        <CookiesProvider>
          <App />
        </CookiesProvider>
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
