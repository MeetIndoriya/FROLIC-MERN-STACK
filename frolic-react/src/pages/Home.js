import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { departments } from '../data/events';

function Home() {
  return (
    <>
      <Navbar variant="public" />

      {/* Hero */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 className="hero-title mb-4">WELCOME</h1>
              <p className="hero-subtitle mb-5">
                Get ready for an unforgettable experience! We've lined up a fantastic series of
                events and we want you to be a part of the excitement.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a href="#events" className="btn btn-primary-custom px-5 py-3">
                  Explore Events
                </a>
                <Link to="/register" className="btn btn-outline-custom px-5 py-3">
                  Register Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-5" style={{ background: '#0d0d20' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <div className="dept-badge">All Events</div>
            <h2 className="section-title">Events <span>2026</span></h2>
            <p className="text-secondary mt-2">Competitions, workshops and cultural events across departments</p>
          </div>

          {departments.map(dept => (
            <div key={dept.id} className="mb-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <span className="dept-badge">{dept.name}</span>
              </div>
              <div className="row g-4">
                {dept.events.map(event => (
                  <div key={event.id} className="col-md-6 col-lg-4">
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-5" style={{ background: '#0a0a1a' }}>
        <div className="container py-4 text-center">
          <div className="dept-badge">Get in Touch</div>
          <h2 className="section-title mb-3">Contact <span>Us</span></h2>
          <p className="text-secondary mb-4">Have questions? Reach out to the Frolic organizing team.</p>
          <div className="row justify-content-center g-3">
            {[
              { icon: 'bi-envelope-fill', label: 'frolic@university.edu' },
              { icon: 'bi-telephone-fill', label: '+91 98765 43210' },
              { icon: 'bi-geo-alt-fill', label: 'Main Campus, Block A' },
            ].map((item, i) => (
              <div key={i} className="col-md-4">
                <div className="stat-card text-center">
                  <i className={`bi ${item.icon} fs-3 mb-2`} style={{ color: '#6c63ff' }}></i>
                  <p className="mb-0 text-white">{item.label}</p>
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

export default Home;
