import { Link, useNavigate } from 'react-router-dom';

function Navbar({ variant = 'public' }) {
  const navigate = useNavigate();

  const handleLogout = () => navigate('/');

  if (variant === 'admin') {
    return (
      <nav className="frolic-navbar navbar navbar-expand-lg sticky-top">
        <div className="container-fluid px-4">
          <Link className="navbar-brand" to="/admin/dashboard">FROLIC</Link>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#adminNav">
            <i className="bi bi-list text-white fs-4"></i>
          </button>

          <div className="collapse navbar-collapse" id="adminNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link" to="/admin/dashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/dashboard#event">Events</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/dashboard#institute">Institutes</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/dashboard#department">Departments</Link></li>
            </ul>
            <button onClick={handleLogout} className="btn btn-outline-custom btn-sm">
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </div>
      </nav>
    );
  }

  if (variant === 'user') {
    return (
      <nav className="frolic-navbar navbar navbar-expand-lg sticky-top">
        <div className="container-fluid px-4">
          <Link className="navbar-brand" to="/">FROLIC</Link>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#userNav">
            <i className="bi bi-list text-white fs-4"></i>
          </button>

          <div className="collapse navbar-collapse" id="userNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/participation">Participants</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/payment">Payment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/results">Results</Link></li>
            </ul>
            <button onClick={handleLogout} className="btn btn-outline-custom btn-sm">
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Public navbar
  return (
    <nav className="frolic-navbar navbar navbar-expand-lg sticky-top">
      <div className="container px-3">
        <Link className="navbar-brand" to="/">FROLIC</Link>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#publicNav">
          <i className="bi bi-list text-white fs-4"></i>
        </button>

        <div className="collapse navbar-collapse" id="publicNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><a className="nav-link" href="#events">Events</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-custom btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary-custom btn-sm">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
