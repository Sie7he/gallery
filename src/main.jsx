import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Memory from './services/Memory'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Memory>
      <App />
    </Memory>
  </React.StrictMode>,
)
