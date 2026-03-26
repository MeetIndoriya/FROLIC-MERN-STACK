import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getEventBySlug, allEvents } from '../data/events';

function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = getEventBySlug(slug);

  if (!event) {
    return (
      <>
        <Navbar variant="public" />
        <div className="text-center py-5" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <i className="bi bi-exclamation-circle fs-1 mb-3" style={{ color: '#6c63ff' }}></i>
          <h3 className="text-white">Event not found</h3>
          <Link to="/" className="btn btn-primary-custom mt-3">Back to Home</Link>
        </div>
        <Footer />
      </>
    );
  }

  // Related events (same department, exclude current)
  const related = allEvents.filter(e => e.id !== event.id).slice(0, 3);

  return (
    <>
      <Navbar variant="public" />

      {/* Event Hero */}
      <div className="event-detail-hero">
        <div className="container">
          <button onClick={() => navigate(-1)} className="btn btn-outline-custom btn-sm mb-4">
            <i className="bi bi-arrow-left me-1"></i> Back
          </button>
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <div className="dept-badge">{event.category}</div>
              <h1 className="mb-3">{event.name}</h1>
              <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: 1.8 }} className="mb-4">{event.fullDesc}</p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                <span className="info-chip"><i className="bi bi-calendar3"></i> {event.date}</span>
                <span className="info-chip"><i className="bi bi-wifi"></i> {event.mode}</span>
                <span className="info-chip"><i className="bi bi-people"></i> Max {event.maxTeam} per team</span>
                <span className="info-chip"><i className="bi bi-currency-rupee"></i> {event.fee} / person</span>
              </div>
              <Link to="/login" className="btn btn-primary-custom px-5 py-3">
                Register Now
              </Link>
            </div>
            <div className="col-lg-5">
              <img
                src={event.image}
                alt={event.name}
                className="img-fluid"
                style={{ borderRadius: 16, border: '1px solid rgba(108,99,255,0.3)' }}
                onError={e => { e.target.src = `https://placehold.co/500x300/1a0a3a/a78bfa?text=${event.name}`; }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rules & Details */}
      <section style={{ background: '#0d0d20', padding: '60px 0' }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="stat-card mb-4">
                <h5 className="text-white fw-bold mb-3"><i className="bi bi-list-check me-2" style={{ color: '#6c63ff' }}></i>Rules & Guidelines</h5>
                {[
                  'Each team must register before the event deadline.',
                  'All team members must carry their college ID on event day.',
                  'The organising committee\'s decision is final.',
                  'Teams found violating rules will be disqualified.',
                  'Late arrivals may not be accommodated.',
                ].map((rule, i) => (
                  <div key={i} className="d-flex gap-3 mb-2">
                    <span style={{ color: '#6c63ff', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                    <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="stat-card">
                <h5 className="text-white fw-bold mb-3">Quick Info</h5>
                {[
                  ['Event', event.name],
                  ['Category', event.category],
                  ['Date', event.date],
                  ['Mode', event.mode],
                  ['Team Size', `Up to ${event.maxTeam}`],
                  ['Fee', `₹${event.fee} / person`],
                ].map(([label, value]) => (
                  <div key={label} className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>{label}</span>
                    <span className="text-white fw-semibold" style={{ fontSize: '0.85rem' }}>{value}</span>
                  </div>
                ))}
                <Link to="/login" className="btn btn-primary-custom w-100 mt-4">Register Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      <section style={{ background: '#0a0a1a', padding: '60px 0' }}>
        <div className="container">
          <h4 className="text-white fw-bold mb-4">Other Events</h4>
          <div className="row g-3">
            {related.map(ev => (
              <div key={ev.id} className="col-md-4">
                <div className="event-card">
                  <img src={ev.image} alt={ev.name} onError={e => { e.target.src = `https://placehold.co/400x200/1a0a3a/a78bfa?text=${ev.name}`; }} />
                  <div className="card-body">
                    <h6 className="fw-bold text-white mb-2">{ev.name}</h6>
                    <p className="card-text mb-3">{ev.description}</p>
                    <Link to={`/event/${ev.slug}`} className="btn btn-outline-custom btn-sm w-100">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default EventDetail;
