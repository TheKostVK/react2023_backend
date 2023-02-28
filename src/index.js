import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MyContext} from "./context/myContext";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const data = {
    text: 'Hello world context'
}

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <MyContext.Provider value={data}>
                <App />
          </MyContext.Provider>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
