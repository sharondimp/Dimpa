import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, AuthProvider, useAuth } from './context/AppContext'

import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Upgrade from './pages/Upgrade'
import Store from './pages/Store'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'
import AdminSellers from './pages/AdminSellers'

function ProtectedRoute({ children, adminOnly }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loader"><div className="spinner"></div></div>
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/store/:storeSlug" element={<Store />} />
      <Route path="/checkout/:storeSlug/:productId" element={<Checkout />} />

      {/* Seller dashboard */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="/dashboard/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/dashboard/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
      <Route path="/admin/sellers" element={<ProtectedRoute adminOnly><AdminSellers /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
