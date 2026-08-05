import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './footer-panels.css'
import './premium-home.css'
import './brand-logo.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
