import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const groups = [
  { id: 1, name: 'Team Alpha', count: 1 },
  { id: 2, name: 'Team Beta', count: 2 },
  { id: 3, name: 'Team Gamma', count: 3 },
];

const FEE_PER_PERSON = 25;

function Payment() {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState('');
  const [method, setMethod] = useState('card');
  const [form, setForm] = useState({ cardNumber: '', expiry: '', cvv: '', cardName: '', email: '', phone: '', address: '' });

  const group = groups.find(g => g.id === Number(selectedGroup));
  const total = group ? group.count * FEE_PER_PERSON : 0;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePay = (e) => {
    e.preventDefault();
    // TODO: real payment gateway
    alert(`Payment of ₹${total} initiated for ${group?.name}. Redirecting...`);
    navigate('/');
  };

  return (
    <>
      <Navbar variant="user" />
      <div style={{ background: '#0a0a1a', minHeight: '100vh', padding: '40px 0' }}>
        <div className="container">

          <div className="mb-5">
            <div className="dept-badge">💳 Payment</div>
            <h2 className="section-title">Event Registration <span>Fee</span></h2>
          </div>

          <div className="row g-4">
            {/* Left — form */}
            <div className="col-lg-7">
              <form onSubmit={handlePay}>
                {/* Group selection */}
                <div className="payment-card mb-4">
                  <h6 className="text-white fw-bold mb-3">Select Group</h6>
                  <select className="form-select form-select-custom" value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)} required>
                    <option value="">Choose group to pay for...</option>
                    {groups.map(g => (
                      <option key={g.id} value={g.id}>{g.name} ({g.count} participant{g.count > 1 ? 's' : ''})</option>
                    ))}
                  </select>
                </div>

                {/* Payment method */}
                <div className="payment-card mb-4">
                  <h6 className="text-white fw-bold mb-3">Payment Method</h6>
                  <div className="d-flex gap-3">
                    {[
                      { id: 'card', icon: 'bi-credit-card-fill', label: 'Credit / Debit Card', sub: 'Visa, MasterCard, Amex' },
                      { id: 'paypal', icon: 'bi-paypal', label: 'PayPal', sub: 'PayPal account or guest' },
                    ].map(m => (
                      <button key={m.id} type="button" onClick={() => setMethod(m.id)}
                        className={`payment-method-btn ${method === m.id ? 'selected' : ''}`}>
                        <i className={`bi ${m.icon} me-2`} style={{ color: '#6c63ff' }}></i>
                        <span className="text-white fw-semibold">{m.label}</span>
                        <br />
                        <small style={{ color: '#9ca3af', fontSize: '0.78rem' }}>{m.sub}</small>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card fields */}
                {method === 'card' && (
                  <div className="payment-card mb-4">
                    <h6 className="text-white fw-bold mb-3">Card Information</h6>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label-custom">Card Number</label>
                        <input type="text" name="cardNumber" maxLength={19} className="form-control form-control-custom" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={handleChange} required />
                      </div>
                      <div className="col-5">
                        <label className="form-label-custom">Expiry Date</label>
                        <input type="text" name="expiry" maxLength={5} className="form-control form-control-custom" placeholder="MM/YY" value={form.expiry} onChange={handleChange} required />
                      </div>
                      <div className="col-4">
                        <label className="form-label-custom">CVV</label>
                        <input type="password" name="cvv" maxLength={4} className="form-control form-control-custom" placeholder="•••" value={form.cvv} onChange={handleChange} required />
                      </div>
                      <div className="col-12">
                        <label className="form-label-custom">Name on Card</label>
                        <input type="text" name="cardName" className="form-control form-control-custom" placeholder="Full name" value={form.cardName} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing */}
                <div className="payment-card mb-4">
                  <h6 className="text-white fw-bold mb-3">Billing Information</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label-custom">Email for Receipt</label>
                      <input type="email" name="email" className="form-control form-control-custom" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-custom">Phone (optional)</label>
                      <input type="tel" name="phone" className="form-control form-control-custom" placeholder="10-digit" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                      <label className="form-label-custom">Billing Address</label>
                      <textarea name="address" rows={2} className="form-control form-control-custom" placeholder="Your billing address" value={form.address} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary-custom w-100 py-3">
                  <i className="bi bi-lock-fill me-2"></i>
                  Proceed to Payment{total > 0 ? ` — ₹${total}` : ''}
                </button>
                <p className="text-center mt-2" style={{ color: '#6b7280', fontSize: '0.78rem' }}>
                  <i className="bi bi-shield-check me-1"></i>Secure payment processing · 24/7 Support
                </p>
              </form>
            </div>

            {/* Right — summary */}
            <div className="col-lg-5">
              <div className="payment-card position-sticky" style={{ top: 80 }}>
                <h6 className="text-white fw-bold mb-4">Order Summary</h6>
                {group ? (
                  <>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ color: '#9ca3af' }}>Group</span>
                      <span className="text-white">{group.name}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ color: '#9ca3af' }}>Fee per Person</span>
                      <span className="text-white">₹{FEE_PER_PERSON}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ color: '#9ca3af' }}>Participants</span>
                      <span className="text-white">{group.count}</span>
                    </div>
                    <hr style={{ borderColor: 'rgba(108,99,255,0.2)' }} />
                    <div className="d-flex justify-content-between">
                      <span className="text-white fw-bold">Total Amount</span>
                      <span className="fw-bold" style={{ color: '#a78bfa', fontSize: '1.2rem' }}>₹{total}</span>
                    </div>
                  </>
                ) : (
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Select a group to see the total.</p>
                )}

                <div className="mt-4 p-3" style={{ background: 'rgba(108,99,255,0.08)', borderRadius: 10, border: '1px solid rgba(108,99,255,0.2)' }}>
                  <p className="mb-0" style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
                    <i className="bi bi-info-circle me-1" style={{ color: '#6c63ff' }}></i>
                    Payment is processed securely. Receipts will be sent to your registered email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
