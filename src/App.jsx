import React, { useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ROLES = ['System Admin', 'Hiring Manager', 'HR Support', 'IT Fulfillment'];

export default function App() {
  const [view, setView] = useState('dashboard'); 
  const [activeRole, setActiveRole] = useState('System Admin');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReq, setSelectedReq] = useState(null);
  const [activeTab, setActiveTab] = useState('sctasks');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    hireName: '', jobTitle: '', department: 'Information Technology', startDate: '', 
    employmentType: 'Full-Time (FTE)', costCenter: 'CC-4092 (IT Ops)', manager: '',
    hardwareProfile: 'Standard Laptop', softwareAccess: []
  });

  const [hardwareData, setHardwareData] = useState({ item: 'MacBook Pro M3', justification: '' });
  const [accessData, setAccessData] = useState({ system: 'AWS Production', justification: '' });

  const [records, setRecords] = useState([
    { 
      ritm: 'RITM0010042', type: 'Onboarding', reqName: 'Onboard: Ravi Kumar', requestedBy: 'Anjali B.', 
      department: 'Information Technology', costCenter: 'CC-4092 (IT Ops)', 
      startDate: '2026-11-10', state: 'Work in Progress', stage: 'Fulfillment', 
      date: '2026-10-30', 
      tasks: [
        { id: 'SCTASK00201', group: 'HR Support', shortDesc: 'Verify I-9 and Tax Documents', state: 'Closed Complete' },
        { id: 'SCTASK00202', group: 'IT Fulfillment', shortDesc: 'Provision AD Account & Hardware', state: 'Work in Progress' }
      ]
    },
    { 
      ritm: 'RITM0010043', type: 'Onboarding', reqName: 'Onboard: Sneha Reddy', requestedBy: 'Anjali B.', 
      department: 'Marketing', costCenter: 'CC-3021 (Mktg)', 
      startDate: '2026-11-15', state: 'Pending Approval', stage: 'Waiting for Approval', 
      date: '2026-10-30', 
      tasks: [
        { id: 'SCTASK00204', group: 'HR Support', shortDesc: 'Verify I-9 and Tax Documents', state: 'Pending' },
        { id: 'SCTASK00205', group: 'IT Fulfillment', shortDesc: 'Provision AD Account & Hardware', state: 'Pending' }
      ]
    },
    { 
      ritm: 'RITM0010044', type: 'Hardware', reqName: 'Hardware: External Monitor', requestedBy: 'System Admin', 
      department: 'Information Technology', costCenter: 'CC-4092 (IT Ops)', 
      startDate: 'N/A', state: 'Work in Progress', stage: 'Fulfillment', 
      date: '2026-10-30', 
      tasks: [
        { id: 'SCTASK00206', group: 'IT Fulfillment', shortDesc: 'Procure and Dispatch Monitor', state: 'Open' }
      ]
    }
  ]);

  const metrics = useMemo(() => ({
    total: records.length,
    pending: records.filter(r => r.stage === 'Waiting for Approval').length,
    active: records.filter(r => r.state === 'Work in Progress').length,
  }), [records]);

  const filteredRecords = records.filter(r => 
    r.reqName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.ritm.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const myApprovals = records.filter(r => r.state === 'Pending Approval');
  const myTasks = records.flatMap(r => r.tasks.map(t => ({ ...t, parentRitm: r.ritm, parentReq: r.reqName })))
                         .filter(t => activeRole === 'System Admin' || t.group === activeRole);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  const handleSoftwareToggle = (app) => {
    setFormData(prev => ({
      ...prev, softwareAccess: prev.softwareAccess.includes(app) ? prev.softwareAccess.filter(i => i !== app) : [...prev.softwareAccess, app]
    }));
  };

  const submitOnboarding = () => {
    const newRitm = `RITM00100${44 + records.length}`;
    const newRecord = {
      ritm: newRitm, type: 'Onboarding', reqName: `Onboard: ${formData.hireName}`, requestedBy: activeRole,
      department: formData.department, costCenter: formData.costCenter, startDate: formData.startDate,
      state: 'Pending Approval', stage: 'Waiting for Approval', date: new Date().toISOString().split('T')[0],
      tasks: [
        { id: `SCTASK0030${records.length + 1}`, group: 'HR Support', shortDesc: 'Verify Documents', state: 'Pending' },
        { id: `SCTASK0030${records.length + 2}`, group: 'IT Fulfillment', shortDesc: 'Provision Hardware', state: 'Pending' }
      ]
    };
    setRecords([newRecord, ...records]);
    setView('dashboard');
    setFormStep(1);
    setFormData({ hireName: '', jobTitle: '', department: 'Information Technology', startDate: '', employmentType: 'Full-Time (FTE)', costCenter: 'CC-4092 (IT Ops)', manager: '', hardwareProfile: 'Standard Laptop', softwareAccess: [] });
    showToast(`Order Placed: ${newRitm} generated.`);
  };

  const submitHardware = (e) => {
    e.preventDefault();
    const newRitm = `RITM00100${44 + records.length}`;
    setRecords([{
      ritm: newRitm, type: 'Hardware', reqName: `Hardware: ${hardwareData.item}`, requestedBy: activeRole,
      department: 'N/A', costCenter: 'N/A', startDate: 'N/A', state: 'Pending Approval', stage: 'Waiting for Approval', date: new Date().toISOString().split('T')[0],
      tasks: [{ id: `SCTASK0030${records.length + 1}`, group: 'IT Fulfillment', shortDesc: `Procure ${hardwareData.item}`, state: 'Pending' }]
    }, ...records]);
    setView('dashboard');
    setHardwareData({ item: 'MacBook Pro M3', justification: '' });
    showToast(`Hardware Request ${newRitm} submitted.`);
  };

  const submitAccess = (e) => {
    e.preventDefault();
    const newRitm = `RITM00100${44 + records.length}`;
    setRecords([{
      ritm: newRitm, type: 'Access', reqName: `Access: ${accessData.system}`, requestedBy: activeRole,
      department: 'N/A', costCenter: 'N/A', startDate: 'N/A', state: 'Pending Approval', stage: 'Waiting for Approval', date: new Date().toISOString().split('T')[0],
      tasks: [{ id: `SCTASK0030${records.length + 1}`, group: 'IT Fulfillment', shortDesc: `Provision ${accessData.system} Access`, state: 'Pending' }]
    }, ...records]);
    setView('dashboard');
    setAccessData({ system: 'AWS Production', justification: '' });
    showToast(`Access Request ${newRitm} submitted.`);
  };

  const approveRequest = (ritmId = selectedReq?.ritm) => {
    if (activeRole !== 'System Admin' && activeRole !== 'Hiring Manager') {
      showToast('Error: Only Hiring Managers can approve requests.', 'error');
      return;
    }
    setRecords(records.map(r => {
      if (r.ritm === ritmId) {
        return { ...r, state: 'Work in Progress', stage: 'Fulfillment', tasks: r.tasks.map(t => ({ ...t, state: 'Open' })) };
      }
      return r;
    }));
    if (selectedReq && selectedReq.ritm === ritmId) {
      const updatedReq = records.find(r => r.ritm === ritmId);
      setSelectedReq({ ...updatedReq, state: 'Work in Progress', stage: 'Fulfillment', tasks: updatedReq.tasks.map(t => ({ ...t, state: 'Open' })) });
    }
    showToast(`${ritmId} Approved. SCTASKs automatically opened.`);
  };

  const updateScTask = (taskId, newState, parentRitm) => {
    setRecords(records.map(r => {
      if (r.ritm === parentRitm) {
        const updatedTasks = r.tasks.map(t => t.id === taskId ? { ...t, state: newState } : t);
        const allClosed = updatedTasks.every(t => t.state === 'Closed Complete');
        return { ...r, tasks: updatedTasks, state: allClosed ? 'Closed Complete' : r.state, stage: allClosed ? 'Completed' : r.stage };
      }
      return r;
    }));
    
    if (selectedReq && selectedReq.ritm === parentRitm) {
      const updatedTasks = selectedReq.tasks.map(t => t.id === taskId ? { ...t, state: newState } : t);
      const allClosed = updatedTasks.every(t => t.state === 'Closed Complete');
      setSelectedReq({ ...selectedReq, tasks: updatedTasks, state: allClosed ? 'Closed Complete' : selectedReq.state, stage: allClosed ? 'Completed' : selectedReq.stage });
    }
    showToast(`${taskId} updated to ${newState}.`);
  };

  const getBadge = (state) => {
    if(state === 'Pending' || state.includes('Approval')) return 'badge-yellow';
    if(state === 'Open' || state === 'Work in Progress') return 'badge-blue';
    if(state === 'Closed Complete' || state === 'Completed') return 'badge-green';
    return 'badge-gray';
  };

  const customStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    #root { display: flex; width: 100%; height: 100vh; max-width: none; padding: 0; margin: 0; text-align: left; }
    body { background-color: #f4f6f8; font-family: 'Inter', sans-serif; color: #1f2937; margin: 0; overflow: hidden; }
    .sidebar { width: 260px; background: #111827; color: #9ca3af; display: flex; flex-direction: column; height: 100vh; overflow-y: auto; flex-shrink: 0; }
    .main-content { flex-grow: 1; display: flex; flex-direction: column; height: 100vh; overflow-y: auto; background: #f3f4f6; }
    .topbar { height: 60px; background: #ffffff; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; flex-shrink: 0; }
    .content-area { padding: 24px; overflow-y: auto; }
    .nav-header { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; padding: 24px 20px 8px; color: #4b5563; }
    .nav-item { padding: 10px 20px; color: #d1d5db; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 12px; font-size: 0.9rem; border-left: 3px solid transparent; }
    .nav-item:hover, .nav-item.active { background: #1f2937; color: #ffffff; border-left: 3px solid #3b82f6; }
    .glass-panel { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .status-badge { padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; display: inline-block; }
    .badge-gray { background: #f3f4f6; color: #4b5563; }
    .badge-blue { background: #dbeafe; color: #1d4ed8; }
    .badge-yellow { background: #fef9c3; color: #854d0e; }
    .badge-green { background: #dcfce3; color: #166534; }
    .wizard-steps { display: flex; border-bottom: 1px solid #e5e7eb; margin-bottom: 24px; padding-bottom: 16px; }
    .step-item { flex: 1; text-align: center; position: relative; color: #9ca3af; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;}
    .step-item.active { color: #2563eb; }
    .step-item.completed { color: #10b981; }
    .form-control, .form-select { border-radius: 6px; font-size: 0.9rem; border-color: #d1d5db; padding: 0.5rem 0.75rem; }
    .toast-container { position: fixed; bottom: 24px; right: 24px; z-index: 1050; }
    .custom-toast { background: #1f2937; color: white; padding: 12px 20px; border-radius: 8px; font-size: 0.9rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); display: flex; gap: 10px; align-items: center;}
  `;

  return (
    <>
      <style>{customStyles}</style>
      {toast.show && <div className="toast-container"><div className="custom-toast"><span>{toast.type === 'error' ? '🚫' : '✅'}</span><span className="fw-medium">{toast.message}</span></div></div>}

      <div className="sidebar shadow">
        <div className="p-4 border-bottom border-secondary d-flex align-items-center gap-2">
          <div className="bg-primary text-white rounded p-1 fw-bold text-center" style={{width: '28px', height: '28px', lineHeight: '20px'}}>SN</div>
          <span className="fw-bold fs-6 text-white" style={{letterSpacing: '0.05em'}}>Enterprise Portal</span>
        </div>
        
        <div className="nav-header">Service Catalog</div>
        <div className={`nav-item ${view === 'catalog' ? 'active' : ''}`} onClick={() => {setView('catalog'); setSelectedReq(null);}}>📋 New Hire Onboarding</div>
        <div className={`nav-item ${view === 'hardware' ? 'active' : ''}`} onClick={() => {setView('hardware'); setSelectedReq(null);}}>💻 Hardware Request</div>
        <div className={`nav-item ${view === 'access' ? 'active' : ''}`} onClick={() => {setView('access'); setSelectedReq(null);}}>🔑 Access Request</div>

        <div className="nav-header mt-3">My Workspace</div>
        <div className={`nav-item ${view === 'dashboard' ? 'active' : ''}`} onClick={() => {setView('dashboard'); setSelectedReq(null);}}>📊 Dashboard & Reports</div>
        <div className={`nav-item ${view === 'approvals' ? 'active' : ''}`} onClick={() => {setView('approvals'); setSelectedReq(null);}}>✔️ My Approvals <span className="badge bg-danger ms-auto">{myApprovals.length}</span></div>
        <div className={`nav-item ${view === 'tasks' ? 'active' : ''}`} onClick={() => {setView('tasks'); setSelectedReq(null);}}>📝 My Tasks <span className="badge bg-primary ms-auto">{myTasks.filter(t => t.state !== 'Closed Complete').length}</span></div>
        
        <div className="mt-auto p-4 border-top border-secondary">
          <div className="text-uppercase text-muted" style={{fontSize: '0.65rem'}}>Logged in as</div>
          <div className="fw-bold text-white fs-6 mb-2">Battula Anjali</div>
          <select className="form-select form-select-sm bg-dark text-white border-secondary" value={activeRole} onChange={(e) => setActiveRole(e.target.value)}>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div className="main-content">
        <div className="topbar shadow-sm">
          <div className="fw-bold text-secondary">
            {view === 'catalog' ? 'Service Catalog > HR Services > Onboarding' : 
             view === 'hardware' ? 'Service Catalog > Hardware Request' :
             view === 'access' ? 'Service Catalog > Access Request' :
             view === 'approvals' ? 'My Workspace > Approvals' :
             view === 'tasks' ? 'My Workspace > Tasks' :
             selectedReq ? `Requested Items > ${selectedReq.ritm}` : 'Dashboards > Overview'}
          </div>
          <div className="d-flex align-items-center gap-3">
            <input type="text" className="form-control form-control-sm bg-light" placeholder="Global Search..." style={{width: '250px', borderRadius: '15px'}} />
            <div className="bg-light rounded-circle text-center border" style={{width: '32px', height: '32px', lineHeight: '30px'}}>🔔</div>
          </div>
        </div>

        <div className="content-area">
          
          {/* HARDWARE REQUEST VIEW */}
          {view === 'hardware' && (
            <div className="container-fluid mx-auto" style={{maxWidth: '700px'}}>
              <div className="glass-panel p-5">
                <h3 className="fw-bold mb-1">Request IT Hardware</h3>
                <p className="text-muted mb-4 small">Submit a request for physical IT assets. Subject to manager approval.</p>
                <form onSubmit={submitHardware}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Select Hardware Item</label>
                    <select className="form-select" value={hardwareData.item} onChange={e=>setHardwareData({...hardwareData, item: e.target.value})}>
                      <option>MacBook Pro M3</option><option>Dell Latitude 7440</option><option>External Monitor (27")</option><option>Wireless Peripherals Kit</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label small fw-bold">Business Justification</label>
                    <textarea className="form-control" rows="3" required value={hardwareData.justification} onChange={e=>setHardwareData({...hardwareData, justification: e.target.value})}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-bold">Submit Hardware Request</button>
                </form>
              </div>
            </div>
          )}

          {/* ACCESS REQUEST VIEW */}
          {view === 'access' && (
            <div className="container-fluid mx-auto" style={{maxWidth: '700px'}}>
              <div className="glass-panel p-5">
                <h3 className="fw-bold mb-1">Request System Access</h3>
                <p className="text-muted mb-4 small">Request logical access to enterprise applications and databases.</p>
                <form onSubmit={submitAccess}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Select System</label>
                    <select className="form-select" value={accessData.system} onChange={e=>setAccessData({...accessData, system: e.target.value})}>
                      <option>AWS Production</option><option>GitHub Enterprise</option><option>Salesforce CRM</option><option>Enterprise VPN</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label small fw-bold">Business Justification</label>
                    <textarea className="form-control" rows="3" required value={accessData.justification} onChange={e=>setAccessData({...accessData, justification: e.target.value})}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-bold">Submit Access Request</button>
                </form>
              </div>
            </div>
          )}

          {/* MY APPROVALS VIEW */}
          {view === 'approvals' && (
            <div className="container-fluid">
              <h3 className="fw-bold mb-4">Pending Approvals</h3>
              <div className="glass-panel overflow-hidden">
                <table className="table table-hover align-middle mb-0 bg-white" style={{fontSize: '0.85rem'}}>
                  <thead className="bg-light text-muted text-uppercase" style={{fontSize: '0.75rem', letterSpacing: '0.5px'}}>
                    <tr><th className="px-4 py-3">RITM Number</th><th>Request Details</th><th>Requested By</th><th>State</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {myApprovals.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-4 text-muted">No approvals required at this time.</td></tr>
                    ) : myApprovals.map(req => (
                      <tr key={req.ritm}>
                        <td className="px-4 py-3 text-primary fw-bold">{req.ritm}</td>
                        <td className="fw-medium text-dark">{req.reqName}</td>
                        <td>{req.requestedBy}</td>
                        <td><span className={`status-badge ${getBadge(req.state)}`}>{req.state}</span></td>
                        <td>
                          <button className="btn btn-sm btn-success fw-bold" onClick={() => approveRequest(req.ritm)}>Approve</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MY TASKS VIEW */}
          {view === 'tasks' && (
            <div className="container-fluid">
              <h3 className="fw-bold mb-4">My Group Tasks ({activeRole})</h3>
              <div className="glass-panel overflow-hidden">
                <table className="table table-hover align-middle mb-0 bg-white" style={{fontSize: '0.85rem'}}>
                  <thead className="bg-light text-muted text-uppercase" style={{fontSize: '0.75rem', letterSpacing: '0.5px'}}>
                    <tr><th className="px-4 py-3">Task Number</th><th>Parent RITM</th><th>Short Description</th><th>State</th><th>Update Action</th></tr>
                  </thead>
                  <tbody>
                    {myTasks.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-4 text-muted">No active tasks assigned to your group.</td></tr>
                    ) : myTasks.map(task => (
                      <tr key={task.id}>
                        <td className="px-4 py-3 text-primary fw-bold">{task.id}</td>
                        <td>{task.parentRitm}<br/><span className="text-muted small">{task.parentReq}</span></td>
                        <td className="fw-medium text-dark">{task.shortDesc}</td>
                        <td><span className={`status-badge ${getBadge(task.state)}`}>{task.state}</span></td>
                        <td>
                          <select 
                            className="form-select form-select-sm w-auto" 
                            value={task.state} 
                            onChange={(e) => updateScTask(task.id, e.target.value, task.parentRitm)}
                            disabled={task.state === 'Closed Complete' || task.state === 'Pending'}
                          >
                            <option value="Pending">Pending</option><option value="Open">Open</option>
                            <option value="Work in Progress">Work in Progress</option><option value="Closed Complete">Closed Complete</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MULTI-STEP CATALOG WIZARD */}
          {view === 'catalog' && (
            <div className="container-fluid mx-auto" style={{maxWidth: '900px'}}>
              <div className="glass-panel p-5">
                <h3 className="fw-bold mb-1">Employee Onboarding Request</h3>
                <p className="text-muted mb-4 small">Submit this form to trigger the automated cross-departmental onboarding workflow.</p>
                <div className="wizard-steps">
                  <div className={`step-item ${formStep >= 1 ? (formStep === 1 ? 'active' : 'completed') : ''}`}>1. Profile</div>
                  <div className={`step-item ${formStep >= 2 ? (formStep === 2 ? 'active' : 'completed') : ''}`}>2. Identity & Access</div>
                  <div className={`step-item ${formStep === 3 ? 'active' : ''}`}>3. Review</div>
                </div>

                {formStep === 1 && (
                  <div className="row g-4">
                    <div className="col-md-6"><label className="form-label small fw-bold">New Hire Full Name *</label><input type="text" className="form-control" value={formData.hireName} onChange={e=>setFormData({...formData, hireName: e.target.value})} /></div>
                    <div className="col-md-6"><label className="form-label small fw-bold">Job Title *</label><input type="text" className="form-control" value={formData.jobTitle} onChange={e=>setFormData({...formData, jobTitle: e.target.value})} /></div>
                    <div className="col-md-6"><label className="form-label small fw-bold">Start Date *</label><input type="date" className="form-control" value={formData.startDate} onChange={e=>setFormData({...formData, startDate: e.target.value})} /></div>
                    <div className="col-md-6"><label className="form-label small fw-bold">Department</label>
                      <select className="form-select" value={formData.department} onChange={e=>setFormData({...formData, department: e.target.value})}><option>Information Technology</option><option>Human Resources</option><option>Sales</option></select>
                    </div>
                    <div className="col-12 text-end mt-4"><button className="btn btn-primary px-4 fw-bold" onClick={() => setFormStep(2)} disabled={!formData.hireName || !formData.startDate}>Next Step →</button></div>
                  </div>
                )}
                {formStep === 2 && (
                  <div className="row g-4">
                    <div className="col-12">
                      <label className="form-label small fw-bold">Hardware Profile</label>
                      <select className="form-select" value={formData.hardwareProfile} onChange={e=>setFormData({...formData, hardwareProfile: e.target.value})}><option>Standard Laptop</option><option>Developer Workstation</option></select>
                    </div>
                    <div className="col-12 d-flex flex-wrap gap-3 mt-3">
                      {['ServiceNow', 'AWS', 'GitHub Enterprise', 'Jira / Confluence'].map(app => (
                        <div className="form-check form-check-inline border rounded px-3 py-2 bg-white" key={app}>
                          <input className="form-check-input" type="checkbox" checked={formData.softwareAccess.includes(app)} onChange={() => handleSoftwareToggle(app)} />
                          <label className="form-check-label small fw-medium ms-1">{app}</label>
                        </div>
                      ))}
                    </div>
                    <div className="col-12 d-flex justify-content-between mt-4">
                      <button className="btn btn-outline-secondary px-4 fw-bold" onClick={() => setFormStep(1)}>← Back</button>
                      <button className="btn btn-primary px-4 fw-bold" onClick={() => setFormStep(3)}>Review Configuration →</button>
                    </div>
                  </div>
                )}
                {formStep === 3 && (
                  <div>
                    <div className="bg-light p-4 rounded border mb-4">
                      <h5 className="fw-bold mb-3">Order Summary</h5>
                      <div className="row g-3 small">
                        <div className="col-6"><strong>New Hire:</strong> {formData.hireName}</div>
                        <div className="col-6"><strong>Hardware:</strong> {formData.hardwareProfile}</div>
                        <div className="col-12"><strong>Software:</strong> {formData.softwareAccess.join(', ') || 'None'}</div>
                      </div>
                    </div>
                    <div className="col-12 d-flex justify-content-between mt-4">
                      <button className="btn btn-outline-secondary px-4 fw-bold" onClick={() => setFormStep(2)}>← Edit</button>
                      <button className="btn btn-success px-5 fw-bold fs-6" onClick={submitOnboarding}>🛒 Order Now</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DASHBOARD */}
          {view === 'dashboard' && !selectedReq && (
            <div className="container-fluid">
              <div className="row g-4 mb-4">
                <div className="col-md-3"><div className="glass-panel p-4 border-top border-4 border-secondary"><div className="text-muted small fw-bold text-uppercase">Total Records</div><div className="fs-2 fw-bold">{metrics.total}</div></div></div>
                <div className="col-md-3"><div className="glass-panel p-4 border-top border-4 border-warning"><div className="text-muted small fw-bold text-uppercase">Pending Approval</div><div className="fs-2 fw-bold">{metrics.pending}</div></div></div>
                <div className="col-md-3"><div className="glass-panel p-4 border-top border-4 border-primary"><div className="text-muted small fw-bold text-uppercase">Active Fulfillment</div><div className="fs-2 fw-bold">{metrics.active}</div></div></div>
              </div>

              <div className="glass-panel overflow-hidden">
                <div className="p-3 border-bottom bg-white d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fw-bold">Requested Items (RITM) List</h6>
                  <input type="text" className="form-control form-control-sm w-25" placeholder="Search RITMs..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} />
                </div>
                <table className="table table-hover align-middle mb-0 bg-white" style={{fontSize: '0.85rem'}}>
                  <thead className="bg-light text-muted text-uppercase" style={{fontSize: '0.75rem', letterSpacing: '0.5px'}}>
                    <tr><th className="px-4 py-3">Number</th><th>Item</th><th>Type</th><th>State</th><th>Stage</th></tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map(req => (
                      <tr key={req.ritm} style={{cursor: 'pointer'}} onClick={() => setSelectedReq(req)}>
                        <td className="px-4 py-3 text-primary fw-bold">{req.ritm}</td>
                        <td className="fw-medium text-dark">{req.reqName}</td>
                        <td><span className="badge bg-light text-dark border">{req.type}</span></td>
                        <td><span className={`status-badge ${getBadge(req.state)}`}>{req.state}</span></td>
                        <td><span className="text-secondary fw-medium">{req.stage}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* RITM DETAIL VIEW */}
          {view === 'dashboard' && selectedReq && (
            <div className="container-fluid">
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <button className="btn btn-sm btn-white border shadow-sm fw-bold" onClick={() => setSelectedReq(null)}>← Back to List</button>
                {selectedReq.state === 'Pending Approval' && <button className="btn btn-sm btn-success fw-bold px-4" onClick={() => approveRequest()}>✓ Approve Request</button>}
              </div>

              <div className="glass-panel p-4 mb-4 bg-white">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h4 className="fw-bold mb-1">{selectedReq.ritm} : {selectedReq.reqName}</h4>
                    <div className="text-muted small">Requested by {selectedReq.requestedBy} on {selectedReq.date}</div>
                  </div>
                  <div className="text-end">
                    <span className={`status-badge ${getBadge(selectedReq.state)} mb-1`}>{selectedReq.state}</span>
                    <div className="small text-muted fw-bold text-uppercase">Stage: {selectedReq.stage}</div>
                  </div>
                </div>
              </div>

              <ul className="nav nav-tabs border-bottom-0 mb-3" style={{gap: '5px'}}>
                <li className="nav-item">
                  <button className="nav-link border-0 fw-bold rounded-top active bg-white text-primary border border-bottom-0 shadow-sm">Catalog Tasks (SCTASK)</button>
                </li>
              </ul>

              <div className="glass-panel bg-white overflow-hidden">
                <table className="table align-middle mb-0" style={{fontSize: '0.85rem'}}>
                  <thead className="bg-light text-muted text-uppercase" style={{fontSize: '0.75rem'}}>
                    <tr><th className="px-4 py-3">Task Number</th><th>Short Description</th><th>Assignment Group</th><th>State</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {selectedReq.tasks.map(task => (
                      <tr key={task.id}>
                        <td className="px-4 py-3 text-primary fw-bold">{task.id}</td>
                        <td className="fw-medium">{task.shortDesc}</td>
                        <td><span className="badge bg-secondary">{task.group}</span></td>
                        <td><span className={`status-badge ${getBadge(task.state)}`}>{task.state}</span></td>
                        <td>
                          <select 
                            className="form-select form-select-sm w-auto" 
                            value={task.state} 
                            onChange={(e) => updateScTask(task.id, e.target.value, selectedReq.ritm)}
                            disabled={selectedReq.state === 'Pending Approval' || task.state === 'Closed Complete'}
                          >
                            <option value="Pending">Pending</option><option value="Open">Open</option>
                            <option value="Work in Progress">Work in Progress</option><option value="Closed Complete">Closed Complete</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                    {selectedReq.tasks.length === 0 && <tr><td colSpan="5" className="text-center py-4 text-muted">No tasks generated yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}