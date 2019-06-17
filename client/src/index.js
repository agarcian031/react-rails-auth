import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import "semantic-ui-css/semantic.min.css";
import {initMiddleware} from 'devise-axios'; 

// will take axios requests and will look for any sort of authorization header - what your token will be saved as in local storage. 
initMiddleware();

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
