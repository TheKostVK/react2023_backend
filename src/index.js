import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MyContext} from "./context/myContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

const data = {
    text: 'Hello world context'
}

root.render(
  <React.StrictMode>
      <MyContext.Provider value={data}>
            <App />
      </MyContext.Provider>
  </React.StrictMode>
);

reportWebVitals();
