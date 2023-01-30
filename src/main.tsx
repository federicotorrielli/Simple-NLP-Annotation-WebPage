import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import DarkMode from "./DarkMode";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App/>
        <DarkMode/>
    </React.StrictMode>
)
