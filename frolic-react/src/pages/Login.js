import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/login", form);

      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");

      navigate('/dashboard');
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <div className="auth-wrapper">
        <div style={{ width: '100%', maxWidth: 440 }}>

          {/* Logo */}
          <div className="text-center mb-4">
            <Link to="/" className="navbar-brand fs-2 fw-bold" style={{
              background: 'linear-gradient(135deg,#6c63ff,#a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
            }}>
              FROLIC
            </Link>
          </div>

          <div className="auth-card">
            <h2>Login to Frolic</h2>
            <p className="mb-4">Enter your credentials to continue</p>

            {error && (
              <div className="alert alert-danger py-2 px-3 mb-3" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: 8 }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label-custom">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-custom"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label-custom">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-custom"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary-custom w-100 py-3 mb-3">
                Login
              </button>
            </form>

            <p className="text-center mb-0" style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
              Not registered?{' '} {message}
              <Link to="/register" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>
                Create account
              </Link>
            </p>
          </div>

          <p className="text-center mt-3" style={{ color: '#6b7280', fontSize: '0.8rem' }}>
            Admin?{' '}
            <Link to="/admin/login" style={{ color: '#6c63ff' }}>Login here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
