import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const events = ['LAYER ZERO EXPO', 'INSIGHT HORIZONS', 'GRID INNOVATORS', 'INKSPIRE FEST'];

const AVATAR = 'https://nsww1fsx-5500.inc1.devtunnels.ms/src/Github ProfilePicture.png';
const TROPHIES = {
  gold: 'https://nsww1fsx-5500.inc1.devtunnels.ms/src/Golden_trophy.png',
  silver: 'https://nsww1fsx-5500.inc1.devtunnels.ms/src/Silver_trophy.png',
  bronze: 'https://nsww1fsx-5500.inc1.devtunnels.ms/src/Bronze_trophy.png',
};

const winners = [
  { name: 'Meet Indoriya', rank: '1st', rankClass: 'rank-gold', trophy: TROPHIES.gold, cardClass: 'gold', label: '🥇 First Place' },
  { name: 'Keval Indoriya', rank: '2nd', rankClass: 'rank-silver', trophy: TROPHIES.silver, cardClass: 'silver', label: '🥈 Second Place' },
  { name: 'Harish Indoriya', rank: '3rd', rankClass: 'rank-bronze', trophy: TROPHIES.bronze, cardClass: 'bronze', label: '🥉 Third Place' },
];

function WinnerCard({ winner }) {
  return (
    <div className={`winner-card ${winner.cardClass}`}>
      <span className="dept-badge mb-3">{winner.label}</span>
      <img src={winner.trophy} alt={winner.rank} className="trophy"
        onError={e => { e.target.style.display = 'none'; }} />
      <img src={AVATAR} alt={winner.name} className="avatar"
        onError={e => { e.target.src = `https://placehold.co/70x70/1a0a3a/a78bfa?text=${winner.name[0]}`; }} />
      <p className="text-white fw-bold mb-1">{winner.name}</p>
      <p className="mb-1" style={{ color: '#9ca3af', fontSize: '0.82rem' }}>Congratulations! You Got</p>
      <p className={`rank-text mb-0 ${winner.rankClass}`}>{winner.rank} Rank</p>
    </div>
  );
}

function Results() {
  const [activeEvent, setActiveEvent] = useState(events[0]);

  return (
    <>
      <Navbar variant="admin" />
      <div style={{ background: '#0a0a1a', minHeight: '100vh' }}>

        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg,#1a0a3a,#0d1a3a)', padding: '60px 0 40px', borderBottom: '1px solid rgba(108,99,255,0.2)' }}>
          <div className="container text-center">
            <div className="dept-badge">🏆 Results</div>
            <h1 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#fff', letterSpacing: 3 }}>
              WINNER'S
            </h1>
            <p style={{ color: '#9ca3af', maxWidth: 500, margin: '0 auto' }}>
              Get ready for an unforgettable experience! We've lined up a fantastic series of events and we want you to be a part of the excitement.
            </p>
          </div>
        </div>

        <div className="container py-5">
          <div className="row g-4">
            {/* Event tabs */}
            <div className="col-lg-3">
              <div className="stat-card">
                <h6 className="text-white fw-bold mb-3">Winner's List</h6>
                {events.map(ev => (
                  <button key={ev} onClick={() => setActiveEvent(ev)}
                    className="w-100 border-0 text-start mb-2 py-2 px-3"
                    style={{
                      background: activeEvent === ev ? 'rgba(108,99,255,0.2)' : 'transparent',
                      color: activeEvent === ev ? '#a78bfa' : '#9ca3af',
                      borderRadius: 8,
                      borderLeft: `3px solid ${activeEvent === ev ? '#6c63ff' : 'transparent'}`,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: activeEvent === ev ? 600 : 400,
                      transition: 'all 0.2s',
                    }}>
                    {ev}
                  </button>
                ))}
              </div>
            </div>

            {/* Winner cards */}
            <div className="col-lg-9">
              <h5 className="text-white fw-bold mb-4">{activeEvent}</h5>

              {/* Podium order: 2nd, 1st, 3rd — visually center 1st */}
              <div className="row g-3 justify-content-center align-items-end mb-4">
                <div className="col-md-4" style={{ transform: 'translateY(20px)' }}>
                  <WinnerCard winner={winners[1]} />
                </div>
                <div className="col-md-4">
                  <WinnerCard winner={winners[0]} />
                </div>
                <div className="col-md-4" style={{ transform: 'translateY(30px)' }}>
                  <WinnerCard winner={winners[2]} />
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

export default Results;
