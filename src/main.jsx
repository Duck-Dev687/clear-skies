import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'normalize.css';
import './SCSS/styles.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
