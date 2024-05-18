import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { ContextProvider } from './context/context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <ContextProvider>
  <App />
 </ContextProvider>
  
 
)
