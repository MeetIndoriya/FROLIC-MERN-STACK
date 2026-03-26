import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const seedInstitutes = [
  { id: 1, name: 'Darshan University', location: 'Rajkot', type: 'Engineering', status: 'Active' },
  { id: 2, name: 'Atmiya University', location: 'Rajkot', type: 'Arts', status: 'Inactive' },
];

const seedEvents = [
  { id: 1, name: 'Coding Hackathon', category: 'Technical', date: '2026-02-05', mode: 'Offline', status: 'Open' },
  { id: 2, name: 'Battle of Bands', category: 'Cultural', date: '2026-02-06', mode: 'Offline', status: 'Registrations Closed' },
];

const seedGroups = [
  { id: 1, name: 'Team Alpha (4)', event: 'Coding Hackathon', institute: 'ABC College', approval: 'Approved', payment: 'Paid', attendance: 'Not Marked' },
  { id: 2, name: 'John Doe', event: 'Talk Show', institute: 'XYZ Institute', approval: 'Pending', payment: 'Unpaid', attendance: 'Not Marked' },
];

const seedCoordinators = [
  { id: 1, name: 'Jane Smith', event: 'Coding Hackathon', role: 'Lead' },
  { id: 2, name: 'Rahul Verma', event: 'Battle of Bands', role: 'Coordinator' },
  { id: 3, name: 'Ananya Iyer', event: 'Gaming Tournament', role: 'Pending' },
];

const seedWinners = [
  { event: 'Coding Hackathon', winner: 'Team Alpha', rank: '1st' },
  { event: 'Battle of Bands', winner: 'RockStorm', rank: '2nd' },
  { event: 'Quiz Mania', winner: 'Brainy Bunch', rank: '3rd' },
];

function StatCard({ icon, label, value, change }) {
  return (
    <div className="stat-card">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <p className="stat-label mb-1">{label}</p>
          <p className="stat-number mb-1">{value}</p>
          <p className="stat-change mb-0"><i className="bi bi-arrow-up-short"></i>{change}</p>
        </div>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: 'linear-gradient(135deg,#6c63ff,#8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <i className={`bi ${icon} text-white fs-5`}></i>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, title, desc, linkText, to }) {
  return (
    <div className="stat-card h-100">
      <i className={`bi ${icon} fs-2 mb-3`} style={{ color: '#6c63ff' }}></i>
      <h6 className="text-white fw-bold mb-1">{title}</h6>
      <p style={{ color: '#9ca3af', fontSize: '0.82rem' }} className="mb-3">{desc}</p>
      <Link to={to} style={{ color: '#a78bfa', fontSize: '0.85rem', textDecoration: 'none' }}>
        {linkText} →
      </Link>
    </div>
  );
}

function StatusBadge({ value }) {
  const map = {
    Active: 'badge-active', Approved: 'badge-active', Paid: 'badge-active',
    Inactive: 'badge-inactive', Rejected: 'badge-inactive', Unpaid: 'badge-inactive',
    Pending: 'badge-pending', 'Not Marked': 'badge-pending',
    Open: 'badge-active', 'Registrations Closed': 'badge-inactive', Completed: 'badge-pending',
  };
  return (
    <span className={`badge rounded-pill px-3 py-1 ${map[value] || 'badge-pending'}`} style={{ fontSize: '0.75rem' }}>
      {value}
    </span>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [institutes, setInstitutes] = useState(seedInstitutes);
  const [events, setEvents] = useState(seedEvents);

  // Modal states
  const [showInstModal, setShowInstModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showCoordModal, setShowCoordModal] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [editInst, setEditInst] = useState(null);

  // Institute form
  const [instForm, setInstForm] = useState({ name: '', code: '', location: '', type: 'University', status: 'Active' });

  const [eventForm, setEventForm] = useState({ name: '', category: 'Technical', date: '', coordinator: '', mode: 'Offline', max: '', description: '', rules: '' });

  const openAddInst = () => { setEditInst(null); setInstForm({ name: '', code: '', location: '', type: 'University', status: 'Active' }); setShowInstModal(true); };
  const openEditInst = (inst) => { setEditInst(inst); setInstForm({ name: inst.name, code: inst.code || '', location: inst.location, type: inst.type, status: inst.status }); setShowInstModal(true); };

  const saveInstitute = () => {
    if (!instForm.name) return;
    if (editInst) {
      setInstitutes(institutes.map(i => i.id === editInst.id ? { ...i, ...instForm } : i));
    } else {
      setInstitutes([...institutes, { id: Date.now(), ...instForm }]);
    }
    setShowInstModal(false);
  };

  const deleteInstitute = (id) => setInstitutes(institutes.filter(i => i.id !== id));

  const saveEvent = () => {
    if (!eventForm.name) return;
    setEvents([...events, { id: Date.now(), name: eventForm.name, category: eventForm.category, date: eventForm.date, mode: eventForm.mode, status: 'Open' }]);
    setShowEventModal(false);
    setEventForm({ name: '', category: 'Technical', date: '', coordinator: '', mode: 'Offline', max: '', description: '', rules: '' });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'bi-grid' },
    { id: 'institutes', label: 'Institutes', icon: 'bi-building' },
    { id: 'events', label: 'Events', icon: 'bi-calendar-event' },
    { id: 'groups', label: 'Groups', icon: 'bi-people' },
    { id: 'coordinators', label: 'Coordinators', icon: 'bi-person-badge' },
    { id: 'winners', label: 'Winners', icon: 'bi-trophy' },
    { id: 'reports', label: 'Reports', icon: 'bi-bar-chart' },
  ];

  return (
    <>
      <Navbar variant="admin" />
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 65px)', background: '#0a0a1a' }}>

        {/* Sidebar */}
        <aside className="dashboard-sidebar d-none d-lg-block" style={{ width: 230, flexShrink: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`sidebar-link w-100 border-0 bg-transparent ${activeTab === t.id ? 'active' : ''}`}>
              <i className={`bi ${t.icon}`}></i> {t.label}
            </button>
          ))}
        </aside>

        {/* Mobile tab bar */}
        <div className="d-lg-none w-100 position-sticky" style={{ top: 65, zIndex: 99 }}>
          <div className="d-flex overflow-auto" style={{ background: '#12122a', borderBottom: '1px solid rgba(108,99,255,0.2)', padding: '4px 8px', gap: 4 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className="btn btn-sm flex-shrink-0"
                style={{ background: activeTab === t.id ? 'rgba(108,99,255,0.3)' : 'transparent', color: activeTab === t.id ? '#a78bfa' : '#9ca3af', border: 'none', fontSize: '0.78rem' }}>
                <i className={`bi ${t.icon} me-1`}></i>{t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-grow-1 p-4">

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <h4 className="text-white fw-bold mb-1">Admin Dashboard</h4>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem' }} className="mb-4">Quick overview of system status</p>

              <div className="row g-3 mb-4">
                <div className="col-6 col-lg-3"><StatCard icon="bi-calendar-check" label="Total Events" value="15" change="+12% increase" /></div>
                <div className="col-6 col-lg-3"><StatCard icon="bi-people-fill" label="Total Registrations" value="80" change="+23% growth" /></div>
                <div className="col-6 col-lg-3"><StatCard icon="bi-file-earmark-check" label="Active Forms" value="12" change="+5 new this week" /></div>
                <div className="col-6 col-lg-3"><StatCard icon="bi-graph-up-arrow" label="Conversion Rate" value="68%" change="+8% improved" /></div>
              </div>

              <div className="row g-3">
                <div className="col-md-6 col-lg-4"><ActionCard icon="bi-building" title="Institutes & Events" desc="Create and manage institutes, departments, and event catalog." linkText="Manage now" to="#" /></div>
                <div className="col-md-6 col-lg-4"><ActionCard icon="bi-person-badge" title="Event Coordinators" desc="Assign coordinators, define responsibilities, and control access." linkText="View coordinators" to="#" /></div>
                <div className="col-md-6 col-lg-4"><ActionCard icon="bi-credit-card" title="Approvals & Payments" desc="Approve groups, participants, and registration payments." linkText="Review queue" to="/payment" /></div>
                <div className="col-md-6 col-lg-4"><ActionCard icon="bi-check2-circle" title="Attendance" desc="Mark attendance for participants and teams during event sessions." linkText="Mark attendance" to="#" /></div>
                <div className="col-md-6 col-lg-4"><ActionCard icon="bi-trophy" title="Winners" desc="Declare winners, assign ranks, and publish results in real time." linkText="Declare winners" to="/results" /></div>
                <div className="col-md-6 col-lg-4"><ActionCard icon="bi-bar-chart-fill" title="Reports" desc="Generate downloadable reports for registrations, finances, and winners." linkText="View reports" to="#" /></div>
              </div>
            </div>
          )}

          {/* INSTITUTES */}
          {activeTab === 'institutes' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-white fw-bold mb-0">Institutes</h4>
                <button onClick={openAddInst} className="btn btn-primary-custom btn-sm">
                  <i className="bi bi-plus-lg me-1"></i> Add Institute
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="table table-custom">
                  <thead><tr><th>#</th><th>Name</th><th>Location</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {institutes.map((inst, i) => (
                      <tr key={inst.id}>
                        <td>{i + 1}</td>
                        <td className="text-white fw-semibold">{inst.name}</td>
                        <td>{inst.location}</td>
                        <td>{inst.type}</td>
                        <td><StatusBadge value={inst.status} /></td>
                        <td>
                          <div className="d-flex gap-2">
                            <button onClick={() => openEditInst(inst)} className="btn btn-sm" style={{ background: 'rgba(108,99,255,0.15)', color: '#a78bfa', border: 'none' }}>
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button onClick={() => deleteInstitute(inst.id)} className="btn btn-sm" style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none' }}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* EVENTS */}
          {activeTab === 'events' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-white fw-bold mb-0">Events</h4>
                <button onClick={() => setShowEventModal(true)} className="btn btn-primary-custom btn-sm">
                  <i className="bi bi-plus-lg me-1"></i> Create Event
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="table table-custom">
                  <thead><tr><th>#</th><th>Event Name</th><th>Category</th><th>Date</th><th>Mode</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {events.map((ev, i) => (
                      <tr key={ev.id}>
                        <td>{i + 1}</td>
                        <td className="text-white fw-semibold">{ev.name}</td>
                        <td>{ev.category}</td>
                        <td>{ev.date}</td>
                        <td>{ev.mode}</td>
                        <td><StatusBadge value={ev.status} /></td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm" style={{ background: 'rgba(108,99,255,0.15)', color: '#a78bfa', border: 'none' }}><i className="bi bi-pencil"></i></button>
                            <button onClick={() => setEvents(events.filter(e => e.id !== ev.id))} className="btn btn-sm" style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none' }}><i className="bi bi-trash"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* GROUPS */}
          {activeTab === 'groups' && (
            <div>
              <h4 className="text-white fw-bold mb-4">Groups & Participants</h4>
              <div style={{ overflowX: 'auto' }}>
                <table className="table table-custom">
                  <thead><tr><th>#</th><th>Group / Participant</th><th>Event</th><th>Institute</th><th>Approval</th><th>Payment</th><th>Attendance</th><th>Actions</th></tr></thead>
                  <tbody>
                    {seedGroups.map((g, i) => (
                      <tr key={g.id}>
                        <td>{i + 1}</td>
                        <td className="text-white fw-semibold">{g.name}</td>
                        <td>{g.event}</td>
                        <td>{g.institute}</td>
                        <td><StatusBadge value={g.approval} /></td>
                        <td><StatusBadge value={g.payment} /></td>
                        <td><StatusBadge value={g.attendance} /></td>
                        <td>
                          <div className="d-flex gap-1 flex-wrap">
                            {g.approval === 'Pending' ? (
                              <>
                                <button className="btn btn-sm" style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: 'none', fontSize: '0.75rem' }}>Approve</button>
                                <button className="btn btn-sm" style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', fontSize: '0.75rem' }}>Reject</button>
                              </>
                            ) : (
                              <>
                                <button className="btn btn-sm" style={{ background: 'rgba(108,99,255,0.15)', color: '#a78bfa', border: 'none', fontSize: '0.75rem' }}>Attendance</button>
                                <button onClick={() => setShowWinnerModal(true)} className="btn btn-sm" style={{ background: 'rgba(255,215,0,0.15)', color: '#ffd700', border: 'none', fontSize: '0.75rem' }}>Winner</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ color: '#6b7280', fontSize: '0.8rem' }} className="mt-2">Use action buttons to Approve, Mark Attendance, or Declare Winner for records.</p>
            </div>
          )}

          {/* COORDINATORS */}
          {activeTab === 'coordinators' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-white fw-bold mb-0">Event Coordinators</h4>
                <button onClick={() => setShowCoordModal(true)} className="btn btn-primary-custom btn-sm">
                  <i className="bi bi-plus-lg me-1"></i> Add Coordinator
                </button>
              </div>
              <div className="row g-3">
                {seedCoordinators.map(c => (
                  <div key={c.id} className="col-md-4">
                    <div className="stat-card text-center">
                      <div style={{
                        width: 52, height: 52, borderRadius: '50%', margin: '0 auto 12px',
                        background: 'linear-gradient(135deg,#6c63ff,#8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <i className="bi bi-person-fill text-white fs-4"></i>
                      </div>
                      <p className="text-white fw-bold mb-1">{c.name}</p>
                      <p style={{ color: '#9ca3af', fontSize: '0.85rem' }} className="mb-2">{c.event}</p>
                      <StatusBadge value={c.role === 'Pending' ? 'Pending' : 'Active'} />
                      <p style={{ color: '#6c63ff', fontSize: '0.8rem' }} className="mt-2 mb-0">{c.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WINNERS */}
          {activeTab === 'winners' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-white fw-bold mb-0">Winners (Recent)</h4>
                <button onClick={() => setShowWinnerModal(true)} className="btn btn-primary-custom btn-sm">
                  <i className="bi bi-trophy me-1"></i> Declare Winner
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="table table-custom">
                  <thead><tr><th>Event</th><th>Winner</th><th>Rank</th></tr></thead>
                  <tbody>
                    {seedWinners.map((w, i) => (
                      <tr key={i}>
                        <td className="text-white">{w.event}</td>
                        <td className="fw-semibold" style={{ color: '#a78bfa' }}>{w.winner}</td>
                        <td>
                          <span style={{ color: w.rank === '1st' ? '#ffd700' : w.rank === '2nd' ? '#c0c0c0' : '#cd7f32', fontWeight: 700 }}>
                            {w.rank}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REPORTS */}
          {activeTab === 'reports' && (
            <div>
              <h4 className="text-white fw-bold mb-4">Reports & Analytics</h4>
              <div className="stat-card" style={{ maxWidth: 480 }}>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem' }} className="mb-4">
                  Generate summary reports for registrations, participation, collections, and rankings.
                </p>
                <div className="mb-3">
                  <label className="form-label-custom">Report Type</label>
                  <select className="form-select form-select-custom">
                    <option>Registrations summary</option>
                    <option>Payments & collections</option>
                    <option>Attendance report</option>
                    <option>Winners summary</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label-custom">Date Range</label>
                  <input type="date" className="form-control form-control-custom" />
                </div>
                <button className="btn btn-primary-custom w-100">
                  <i className="bi bi-download me-2"></i> Generate Report
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── Add / Edit Institute Modal ── */}
      {showInstModal && (
        <div className="modal show d-block modal-custom" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editInst ? 'Edit Institute' : 'Add New Institute'}</h5>
                <button className="btn-close" onClick={() => setShowInstModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                {[['Institute Name', 'name', 'text'], ['Institute Code', 'code', 'text'], ['Location', 'location', 'text']].map(([label, key, type]) => (
                  <div className="mb-3" key={key}>
                    <label className="form-label-custom">{label}</label>
                    <input type={type} className="form-control form-control-custom" value={instForm[key]} onChange={e => setInstForm({ ...instForm, [key]: e.target.value })} />
                  </div>
                ))}
                <div className="mb-3">
                  <label className="form-label-custom">Institute Type</label>
                  <select className="form-select form-select-custom" value={instForm.type} onChange={e => setInstForm({ ...instForm, type: e.target.value })}>
                    {['University', 'Engineering', 'Technology', 'Arts', 'Medical'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label-custom">Status</label>
                  <select className="form-select form-select-custom" value={instForm.status} onChange={e => setInstForm({ ...instForm, status: e.target.value })}>
                    <option>Active</option><option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0 px-4 pb-4">
                <button className="btn btn-outline-custom" onClick={() => setShowInstModal(false)}>Cancel</button>
                <button className="btn btn-primary-custom" onClick={saveInstitute}>{editInst ? 'Update Institute' : 'Save Institute'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Create Event Modal ── */}
      {showEventModal && (
        <div className="modal show d-block modal-custom" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Event</h5>
                <button className="btn-close" onClick={() => setShowEventModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-3">
                  {[['Event Name', 'name', 'text', 12], ['Event Date', 'date', 'date', 6], ['Max Participants', 'max', 'number', 6]].map(([label, key, type, cols]) => (
                    <div key={key} className={`col-${cols}`}>
                      <label className="form-label-custom">{label}</label>
                      <input type={type} className="form-control form-control-custom" value={eventForm[key]} onChange={e => setEventForm({ ...eventForm, [key]: e.target.value })} />
                    </div>
                  ))}
                  <div className="col-6">
                    <label className="form-label-custom">Category</label>
                    <select className="form-select form-select-custom" value={eventForm.category} onChange={e => setEventForm({ ...eventForm, category: e.target.value })}>
                      <option>Technical</option><option>Cultural</option><option>Sports</option><option>Workshop</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label-custom">Mode</label>
                    <select className="form-select form-select-custom" value={eventForm.mode} onChange={e => setEventForm({ ...eventForm, mode: e.target.value })}>
                      <option>Offline</option><option>Online</option><option>Hybrid</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label-custom">Description</label>
                    <textarea rows={2} className="form-control form-control-custom" value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label-custom">Rules / Instructions</label>
                    <textarea rows={2} className="form-control form-control-custom" value={eventForm.rules} onChange={e => setEventForm({ ...eventForm, rules: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0 px-4 pb-4">
                <button className="btn btn-outline-custom" onClick={() => setShowEventModal(false)}>Cancel</button>
                <button className="btn btn-primary-custom" onClick={saveEvent}>Create Event</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Coordinator Modal ── */}
      {showCoordModal && (
        <div className="modal show d-block modal-custom" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Coordinator</h5>
                <button className="btn-close" onClick={() => setShowCoordModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                {['Full Name', 'Email', 'Phone'].map(label => (
                  <div className="mb-3" key={label}>
                    <label className="form-label-custom">{label}</label>
                    <input type="text" className="form-control form-control-custom" />
                  </div>
                ))}
                <div className="mb-3">
                  <label className="form-label-custom">Event</label>
                  <select className="form-select form-select-custom">
                    <option>Select event</option>
                    {events.map(e => <option key={e.id}>{e.name}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label-custom">Role</label>
                  <select className="form-select form-select-custom">
                    <option>Lead</option><option>Coordinator</option><option>Volunteer</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0 px-4 pb-4">
                <button className="btn btn-outline-custom" onClick={() => setShowCoordModal(false)}>Cancel</button>
                <button className="btn btn-primary-custom" onClick={() => setShowCoordModal(false)}>Save Coordinator</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Declare Winner Modal ── */}
      {showWinnerModal && (
        <div className="modal show d-block modal-custom" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Declare Winner</h5>
                <button className="btn-close" onClick={() => setShowWinnerModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label-custom">Event</label>
                  <select className="form-select form-select-custom">
                    <option>Select event</option>
                    {events.map(e => <option key={e.id}>{e.name}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label-custom">Winner Group / Participant</label>
                  <select className="form-select form-select-custom">
                    <option>Select winner</option>
                    {seedGroups.map(g => <option key={g.id}>{g.name}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label-custom">Rank</label>
                  <select className="form-select form-select-custom">
                    <option>1st</option><option>2nd</option><option>3rd</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label-custom">Remarks</label>
                  <textarea rows={2} className="form-control form-control-custom" />
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input type="checkbox" id="cert" style={{ accentColor: '#6c63ff', width: 16, height: 16 }} />
                  <label htmlFor="cert" style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Auto-generate e-certificate</label>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0 px-4 pb-4">
                <button className="btn btn-outline-custom" onClick={() => setShowWinnerModal(false)}>Cancel</button>
                <button className="btn btn-primary-custom" onClick={() => setShowWinnerModal(false)}>Confirm Winner</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default AdminDashboard;
