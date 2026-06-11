import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="nav-logo">
          💎 GemGuide
        </NavLink>

        <div className="nav-links">
          <NavLink to="/gems" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            All Gems
          </NavLink>

          {user ? (
            <>
              <NavLink to="/recommend" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Get Recommendation
              </NavLink>
              <NavLink to="/history" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                History
              </NavLink>
              <button className="btn btn-ghost btn-sm" onClick={handleLogout} style={{ marginLeft: '0.5rem' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary btn-sm" style={{ marginLeft: '0.5rem' }}>
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
