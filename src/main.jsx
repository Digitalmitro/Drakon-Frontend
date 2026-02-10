import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/store.js'; // Import your Redux store and persistor
import { ProductProvider } from "./context/ProductContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CartProvider>
        <ProductProvider>
        {/* Your app components */}
        <App />
        </ProductProvider>
        </CartProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
