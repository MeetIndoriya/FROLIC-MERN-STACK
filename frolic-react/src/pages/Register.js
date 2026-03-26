import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const initialForm = {
  userId: '',
  email: '',
  password: '',
  phone: '',
  gender: '',
  address: '',
  city: '',
};

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (form.userId.length < 4) newErrors.userId = 'User ID must be at least 4 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Please enter a valid email address.';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = 'Please enter a valid 10-digit phone number.';
    if (!form.gender) newErrors.gender = 'Please select your gender.';
    if (!form.address) newErrors.address = 'Please enter your address.';
    if (!form.city) newErrors.city = 'Please enter your city.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // TODO: API call
    navigate('/login');
  };

  const field = (name, label, type = 'text', placeholder = '') => (
    <div className="mb-3">
      <label className="form-label-custom">{label}</label>
      <input
        type={type}
        name={name}
        className={`form-control form-control-custom ${errors[name] ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange}
      />
      {errors[name] && <div className="invalid-feedback d-block" style={{ color: '#f87171', fontSize: '0.8rem' }}>{errors[name]}</div>}
    </div>
  );

  return (
    <>
      <Navbar variant="public" />
      <div className="auth-wrapper py-5">
        <div className="auth-card" style={{ maxWidth: 520 }}>
          <h2>REGISTRATION</h2>
          <p className="mb-4">Create your Frolic account to participate in events.</p>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">{field('userId', 'User ID', 'text', 'min 4 characters')}</div>
              <div className="col-md-6">{field('email', 'Email Address', 'email', 'you@example.com')}</div>
              <div className="col-md-6">{field('password', 'Password', 'password', '••••••••')}</div>
              <div className="col-md-6">{field('phone', 'Phone Number', 'tel', '10-digit number')}</div>

              <div className="col-12 mb-3">
                <label className="form-label-custom">Gender</label>
                <select
                  name="gender"
                  className={`form-select form-select-custom ${errors.gender ? 'is-invalid' : ''}`}
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Your Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <div className="invalid-feedback d-block" style={{ color: '#f87171', fontSize: '0.8rem' }}>{errors.gender}</div>}
              </div>

              <div className="col-12 mb-3">
                <label className="form-label-custom">Address</label>
                <textarea
                  name="address"
                  rows={2}
                  className={`form-control form-control-custom ${errors.address ? 'is-invalid' : ''}`}
                  placeholder="Your full address"
                  value={form.address}
                  onChange={handleChange}
                />
                {errors.address && <div className="invalid-feedback d-block" style={{ color: '#f87171', fontSize: '0.8rem' }}>{errors.address}</div>}
              </div>

              <div className="col-12">{field('city', 'City', 'text', 'Your city')}</div>
            </div>

            <button type="submit" className="btn btn-primary-custom w-100 py-3 mt-2 mb-3">
              Register
            </button>

            <Link to="/" className="btn btn-outline-custom w-100 py-2">
              Back To Home
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
