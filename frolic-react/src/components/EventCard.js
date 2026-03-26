import { Link } from 'react-router-dom';

function EventCard({ event }) {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.name} onError={e => { e.target.src = 'https://placehold.co/400x200/1a0a3a/a78bfa?text=' + event.name; }} />
      <div className="card-body">
        <h6 className="fw-bold text-white mb-2">{event.name}</h6>
        <p className="card-text mb-3">{event.description}</p>
        <div className="d-flex gap-2 flex-wrap mb-3">
          <span className="info-chip"><i className="bi bi-calendar3"></i> {event.date}</span>
          <span className="info-chip"><i className="bi bi-wifi"></i> {event.mode}</span>
        </div>
        <Link to={`/event/${event.slug}`} className="btn btn-primary-custom btn-sm w-100">
          Register Now
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
