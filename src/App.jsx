import React from "react";
import Routes from "./config/router";
import { Toaster } from "react-hot-toast";
import "./App.css";
function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <Routes />
    </>
  );
}

export default App;