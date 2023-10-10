import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';
// import store from "./redux/store";
// import { Provider } from "react-redux";

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);