import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const recentActivity = [
  { icon: 'bi-calendar-check', text: 'Registered for Neural Sphere', time: '2 hours ago', color: '#4ade80' },
  { icon: 'bi-credit-card', text: 'Payment of ₹200 completed', time: '2 hours ago', color: '#6c63ff' },
  { icon: 'bi-people', text: 'Team "Alpha Squad" created', time: '3 hours ago', color: '#a78bfa' },
];

function UserDashboard() {
  return (
    <>
      <Navbar variant="user" />
      <div style={{ background: '#0a0a1a', minHeight: '100vh', padding: '40px 0' }}>
        <div className="container">

          {/* Welcome banner */}
          <div className="mb-5 p-4" style={{
            background: 'linear-gradient(135deg,rgba(108,99,255,0.15),rgba(139,92,246,0.1))',
            border: '1px solid rgba(108,99,255,0.3)',
            borderRadius: 16,
          }}>
            <div className="d-flex align-items-center gap-3">
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg,#6c63ff,#8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <i className="bi bi-person-fill text-white fs-4"></i>
              </div>
              <div>
                <h4 className="text-white fw-bold mb-1">Welcome back!</h4>
                <p style={{ color: '#9ca3af' }} className="mb-0">You're logged in to Frolic 2026.</p>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="row g-3 mb-5">
            {[
              { icon: 'bi-calendar-event', label: 'Events Joined', value: '2', change: '+1 this week' },
              { icon: 'bi-people', label: 'Groups Created', value: '1', change: 'Active' },
              { icon: 'bi-credit-card', label: 'Amount Paid', value: '₹200', change: 'Confirmed' },
              { icon: 'bi-trophy', label: 'Results', value: '—', change: 'Pending' },
            ].map((s, i) => (
              <div key={i} className="col-6 col-lg-3">
                <div className="stat-card">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="stat-label mb-1">{s.label}</p>
                      <p className="stat-number mb-1">{s.value}</p>
                      <p className="stat-change mb-0">{s.change}</p>
                    </div>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: 'linear-gradient(135deg,#6c63ff,#8b5cf6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <i className={`bi ${s.icon} text-white`}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-4">
            {/* Quick links */}
            <div className="col-lg-4">
              <div className="stat-card h-100">
                <h5 className="text-white fw-bold mb-4">Quick Actions</h5>
                {[
                  { icon: 'bi-calendar-plus', label: 'Browse Events', to: '/', color: '#6c63ff' },
                  { icon: 'bi-people-fill', label: 'Manage Participation', to: '/participation', color: '#8b5cf6' },
                  { icon: 'bi-credit-card-fill', label: 'Make Payment', to: '/payment', color: '#a78bfa' },
                  { icon: 'bi-trophy-fill', label: 'View Results', to: '/results', color: '#ffd700' },
                ].map((item, i) => (
                  <Link key={i} to={item.to} style={{ textDecoration: 'none' }}>
                    <div className="d-flex align-items-center gap-3 mb-3 p-3" style={{
                      background: 'rgba(255,255,255,0.04)', borderRadius: 10,
                      border: '1px solid rgba(108,99,255,0.15)', transition: 'border-color 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(108,99,255,0.4)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(108,99,255,0.15)'}
                    >
                      <i className={`bi ${item.icon} fs-5`} style={{ color: item.color }}></i>
                      <span className="text-white" style={{ fontSize: '0.9rem' }}>{item.label}</span>
                      <i className="bi bi-chevron-right ms-auto" style={{ color: '#6b7280', fontSize: '0.8rem' }}></i>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="col-lg-8">
              <div className="stat-card h-100">
                <h5 className="text-white fw-bold mb-4">Recent Activity</h5>
                {recentActivity.map((a, i) => (
                  <div key={i} className="d-flex align-items-start gap-3 mb-4">
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: `${a.color}22`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <i className={`bi ${a.icon}`} style={{ color: a.color }}></i>
                    </div>
                    <div>
                      <p className="text-white mb-0" style={{ fontSize: '0.9rem' }}>{a.text}</p>
                      <p style={{ color: '#6b7280', fontSize: '0.78rem' }} className="mb-0">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserDashboard;
