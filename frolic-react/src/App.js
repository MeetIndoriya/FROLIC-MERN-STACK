import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home          from './pages/Home';
import Login         from './pages/Login';
import Register      from './pages/Register';
import AdminLogin    from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import EventDetail   from './pages/EventDetail';
import UserDashboard from './pages/UserDashboard';
import Participation from './pages/Participation';
import Payment       from './pages/Payment';
import Results       from './pages/Results';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"               element={<Home />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/register"       element={<Register />} />
        <Route path="/event/:slug"    element={<EventDetail />} />

        {/* User */}
        <Route path="/dashboard"      element={<UserDashboard />} />
        <Route path="/participation"  element={<Participation />} />
        <Route path="/payment"        element={<Payment />} />
        <Route path="/results"        element={<Results />} />

        {/* Admin */}
        <Route path="/admin/login"     element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* 404 */}
        <Route path="*" element={
          <div style={{ minHeight: '100vh', background: '#0a0a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <h1 style={{ color: '#6c63ff', fontSize: '5rem', fontWeight: 900 }}>404</h1>
            <p style={{ color: '#9ca3af' }}>Page not found.</p>
            <a href="/" className="btn btn-primary-custom mt-3">Go Home</a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
