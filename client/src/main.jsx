import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { TransactionProvider } from './context/TransactionContext';//Requested module does not provide export named 'default' 記得加{}

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionProvider >
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </TransactionProvider>
)
