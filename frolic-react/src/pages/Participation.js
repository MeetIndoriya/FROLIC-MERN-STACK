import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Participation() {
  const [groupName, setGroupName] = useState('');
  const [numParticipants, setNumParticipants] = useState('');
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!groupName.trim()) { setError('Please enter a group name.'); return; }
    if (!numParticipants) { setError('Please select number of participants.'); return; }
    setGroups([...groups, { id: Date.now(), name: groupName.trim(), count: numParticipants, status: 'Pending' }]);
    setGroupName('');
    setNumParticipants('');
    setError('');
  };

  const removeGroup = (id) => setGroups(groups.filter(g => g.id !== id));

  return (
    <>
      <Navbar variant="user" />
      <div style={{ background: '#0a0a1a', minHeight: '100vh', padding: '40px 0' }}>
        <div className="container">

          <div className="mb-5">
            <div className="dept-badge">👥 Participation</div>
            <h2 className="section-title">Participation <span>Form</span></h2>
            <p style={{ color: '#9ca3af' }}>Create your event group and add team members.</p>
          </div>

          <div className="row g-4">
            {/* Form */}
            <div className="col-lg-5">
              <div className="stat-card">
                <h5 className="text-white fw-bold mb-4">Create Group</h5>

                {error && (
                  <div className="mb-3 px-3 py-2" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: 8, fontSize: '0.88rem' }}>
                    {error}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label-custom">Group Name</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    placeholder="e.g. Team Alpha"
                    value={groupName}
                    onChange={e => { setGroupName(e.target.value); setError(''); }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label-custom">Number of Participations</label>
                  <select
                    className="form-select form-select-custom"
                    value={numParticipants}
                    onChange={e => { setNumParticipants(e.target.value); setError(''); }}
                  >
                    <option value="">Select...</option>
                    <option value="2">2 Participations</option>
                    <option value="3">3 Participations</option>
                    <option value="4">4 Participations</option>
                  </select>
                </div>

                <button onClick={handleCreate} className="btn btn-primary-custom w-100 py-3">
                  <i className="bi bi-plus-lg me-2"></i>Create Group
                </button>
              </div>
            </div>

            {/* Groups List */}
            <div className="col-lg-7">
              <h5 className="text-white fw-bold mb-3">Created Groups</h5>

              {groups.length === 0 ? (
                <div className="stat-card text-center py-5">
                  <i className="bi bi-people fs-1 mb-3" style={{ color: '#374151' }}></i>
                  <p style={{ color: '#6b7280' }}>No groups created yet. Create your first group!</p>
                </div>
              ) : (
                groups.map(g => (
                  <div key={g.id} className="group-item">
                    <div className="d-flex align-items-center gap-3">
                      <div style={{
                        width: 44, height: 44, borderRadius: 10,
                        background: 'linear-gradient(135deg,#6c63ff,#8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <i className="bi bi-people-fill text-white"></i>
                      </div>
                      <div>
                        <p className="text-white fw-semibold mb-0">{g.name}</p>
                        <p style={{ color: '#9ca3af', fontSize: '0.82rem' }} className="mb-0">{g.count} participants</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge rounded-pill badge-pending px-3 py-1" style={{ fontSize: '0.75rem' }}>{g.status}</span>
                      <button onClick={() => removeGroup(g.id)} className="btn btn-sm" style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none' }}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Participation;
