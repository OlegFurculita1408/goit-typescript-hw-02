import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import './index.css';
import 'normalize.css';


const rootElement = document.getElementById('root')!;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
