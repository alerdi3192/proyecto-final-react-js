import './index.css'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { AuthProvider } from './Components/Contexts/AuthContext.jsx'
import App from './App.jsx'
import { ProductosProvider } from './Components/Contexts/ProductosContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductosProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </ProductosProvider>
  </StrictMode>
)
