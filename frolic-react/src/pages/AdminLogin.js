import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', remember: false });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Please enter both username and password.');
      return;
    }
    // TODO: connect real API
    navigate('/admin/dashboard');
  };

  return (
    <>
      <div className="auth-wrapper">
        <div style={{ width: '100%', maxWidth: 440 }}>

          {/* Logo */}
          <div className="text-center mb-4">
            <Link to="/" style={{
              fontSize: '2rem', fontWeight: 800, letterSpacing: 3,
              background: 'linear-gradient(135deg,#6c63ff,#a78bfa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
            }}>
              FROLIC
            </Link>
            <p className="mt-1" style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Frolic Events Administration</p>
          </div>

          <div className="auth-card">
            {/* Admin icon */}
            <div className="text-center mb-4">
              <div style={{
                width: 64, height: 64, borderRadius: '50%', margin: '0 auto 12px',
                background: 'linear-gradient(135deg,#6c63ff,#8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className="bi bi-shield-lock-fill text-white fs-3"></i>
              </div>
              <h2 style={{ fontSize: '1.5rem' }}>Admin Login</h2>
              <p className="mb-0">Restricted access — authorised personnel only</p>
            </div>

            {error && (
              <div className="mb-3 px-3 py-2" style={{
                background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
                color: '#f87171', borderRadius: 8, fontSize: '0.88rem',
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label-custom">Username</label>
                <div className="position-relative">
                  <i className="bi bi-person-fill position-absolute" style={{ left: 14, top: '50%', transform: 'translateY(-50%)', color: '#6c63ff' }}></i>
                  <input
                    type="text"
                    name="username"
                    className="form-control form-control-custom ps-5"
                    placeholder="admin"
                    value={form.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Password</label>
                <div className="position-relative">
                  <i className="bi bi-lock-fill position-absolute" style={{ left: 14, top: '50%', transform: 'translateY(-50%)', color: '#6c63ff' }}></i>
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-custom ps-5"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4 d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  style={{ accentColor: '#6c63ff', width: 16, height: 16 }}
                />
                <label htmlFor="remember" style={{ color: '#9ca3af', fontSize: '0.85rem', cursor: 'pointer' }}>
                  Never share your password
                </label>
              </div>

              <button type="submit" className="btn btn-primary-custom w-100 py-3">
                <i className="bi bi-box-arrow-in-right me-2"></i>Submit
              </button>
            </form>
          </div>

          <p className="text-center mt-3" style={{ color: '#6b7280', fontSize: '0.8rem' }}>
            <Link to="/login" style={{ color: '#6c63ff' }}>← Back to User Login</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminLogin;
