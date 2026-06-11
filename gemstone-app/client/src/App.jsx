import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Recommend from './pages/Recommend';
import History from './pages/History';
import Gems from './pages/Gems';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gems" element={<Gems />} />
          <Route path="/recommend" element={<PrivateRoute><Recommend /></PrivateRoute>} />
          <Route path="/history"   element={<PrivateRoute><History /></PrivateRoute>} />
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💎</div>
              <h2>404 – Page Not Found</h2>
            </div>
          } />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#1f1840', color: '#f1f0ff', border: '1px solid rgba(139,92,246,0.3)' },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}
