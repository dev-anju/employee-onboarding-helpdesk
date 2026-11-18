import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

const PORT = 5001;
const app = express();

app.use(cors());
app.use(express.json());

// Initialize database file if not exists
const INITIAL_RECORDS = [
  {
    ritm: 'RITM0010042',
    type: 'Onboarding',
    reqName: 'Onboard: Ravi Kumar',
    requestedBy: 'Anjali B.',
    department: 'Information Technology',
    costCenter: 'CC-4092 (IT Ops)',
    startDate: '2026-11-10',
    state: 'Work in Progress',
    stage: 'Fulfillment',
    priority: '2 - High',
    date: '2026-10-30',
    variables: {
      hireName: 'Ravi Kumar',
      jobTitle: 'Senior Cloud Engineer',
      corporateEmail: 'ravi.kumar@enterprise.com',
      employeeId: 'EMP-9042',
      hardwareProfile: 'Developer Workstation (MacBook Pro M3 Max)'
    },
    slas: [
      { id: 'SLA-101', name: 'Manager Approval SLA', target: '24 Hours', elapsed: 100, status: 'Completed', breached: false, timeRemaining: 'Completed on time' }
    ],
    activityStream: [
      { id: 1, type: 'system', author: 'System Engine', text: 'Onboarding initiated.', time: '09:00 AM' }
    ],
    tasks: [
      { id: 'SCTASK00201', group: 'HR Support', assignedTo: 'Priya Sharma', shortDesc: 'Verify I-9 and Tax Documents', state: 'Closed Complete', checklist: [{ id: 'c1', label: 'Verify Form I-9', done: true }] },
      { id: 'SCTASK00202', group: 'IT Fulfillment', assignedTo: 'Alex Mercer', shortDesc: 'Provision AD Account & Hardware', state: 'Work in Progress', dependency: 'SCTASK00201', checklist: [{ id: 'c2', label: 'Create Active Directory User', done: true }] }
    ]
  },
  {
    ritm: 'RITM0010043',
    type: 'Onboarding',
    reqName: 'Onboard: Sneha Reddy',
    requestedBy: 'Anjali B.',
    department: 'Marketing',
    costCenter: 'CC-3021 (Mktg)',
    startDate: '2026-11-15',
    state: 'Pending Approval',
    stage: 'Waiting for Approval',
    priority: '2 - High',
    date: '2026-10-30',
    variables: { hireName: 'Sneha Reddy', jobTitle: 'Marketing Lead', corporateEmail: 'sneha.reddy@enterprise.com' },
    slas: [{ id: 'SLA-104', name: 'Manager Approval SLA', target: '24 Hours', elapsed: 40, status: 'In Progress', breached: false, timeRemaining: '14h remaining' }],
    activityStream: [{ id: 1, type: 'system', author: 'System Engine', text: 'Awaiting manager approval.', time: '11:15 AM' }],
    tasks: [
      { id: 'SCTASK00204', group: 'HR Support', assignedTo: 'Unassigned', shortDesc: 'Verify I-9 and Tax Documents', state: 'Pending', checklist: [{ id: 'c3', label: 'Form I-9', done: false }] },
      { id: 'SCTASK00205', group: 'IT Fulfillment', assignedTo: 'Unassigned', shortDesc: 'Provision AD Account & Hardware', state: 'Pending', dependency: 'SCTASK00204', checklist: [{ id: 'c4', label: 'Laptop Prep', done: false }] }
    ]
  },
  {
    ritm: 'RITM0010044',
    type: 'Hardware',
    reqName: 'Hardware: External Monitor',
    requestedBy: 'System Admin',
    department: 'Information Technology',
    costCenter: 'CC-4092 (IT Ops)',
    startDate: 'N/A',
    state: 'Work in Progress',
    stage: 'Fulfillment',
    priority: '3 - Moderate',
    date: '2026-10-30',
    variables: { item: 'External Monitor (27" 4K)' },
    slas: [{ id: 'SLA-106', name: 'Hardware Dispatch SLA', target: '72 Hours', elapsed: 55, status: 'In Progress', breached: false, timeRemaining: '24h remaining' }],
    activityStream: [{ id: 1, type: 'system', author: 'System Engine', text: 'Hardware request approved.', time: '08:30 AM' }],
    tasks: [
      { id: 'SCTASK00206', group: 'IT Fulfillment', assignedTo: 'Alex Mercer', shortDesc: 'Procure and Dispatch Monitor', state: 'Open', checklist: [{ id: 'c5', label: 'Test Cable & Dispatch', done: false }] }
    ]
  }
];

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ records: INITIAL_RECORDS }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// REST Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'UP', database: 'database.json (Persistent)' });
});

app.get('/api/records', (req, res) => {
  const data = readDB();
  res.json({ success: true, count: data.records.length, records: data.records });
});

app.post('/api/records/onboard', (req, res) => {
  const data = readDB();
  const newIndex = data.records.length + 1;
  const newRitm = `RITM00100${45 + newIndex}`;
  const now = new Date().toISOString().split('T')[0];

  const newRecord = {
    ritm: newRitm,
    type: 'Onboarding',
    reqName: `Onboard: ${req.body.hireName}`,
    requestedBy: req.body.requestedBy || 'Battula Anjali',
    department: req.body.department || 'Information Technology',
    costCenter: req.body.costCenter || 'CC-4092 (IT Ops)',
    startDate: req.body.startDate,
    state: 'Pending Approval',
    stage: 'Waiting for Approval',
    priority: '2 - High',
    date: now,
    variables: req.body,
    slas: [{ id: `SLA-${Date.now()}`, name: 'Approval SLA', target: '24 Hours', elapsed: 5, status: 'In Progress', breached: false, timeRemaining: '23h remaining' }],
    activityStream: [{ id: Date.now(), type: 'system', author: 'System Engine', text: `Onboarding requested for ${req.body.hireName}`, time: 'Just now' }],
    tasks: [
      { id: `SCTASK0030${newIndex * 2 + 1}`, group: 'HR Support', assignedTo: 'Unassigned', shortDesc: 'Verify I-9 & Documents', state: 'Pending', checklist: [{ id: 'c1', label: 'Verify I-9', done: false }] },
      { id: `SCTASK0030${newIndex * 2 + 2}`, group: 'IT Fulfillment', assignedTo: 'Unassigned', shortDesc: 'Provision AD & Hardware', state: 'Pending', dependency: `SCTASK0030${newIndex * 2 + 1}`, checklist: [{ id: 'c2', label: 'Setup Laptop', done: false }] }
    ]
  };

  data.records.unshift(newRecord);
  writeDB(data);
  res.status(201).json({ success: true, ritm: newRitm, record: newRecord });
});

app.put('/api/records/:ritm/approve', (req, res) => {
  const data = readDB();
  const record = data.records.find(r => r.ritm === req.params.ritm);
  if (!record) return res.status(404).json({ success: false, error: 'Not found' });

  record.state = 'Work in Progress';
  record.stage = 'Fulfillment';
  record.tasks = record.tasks.map(t => ({ ...t, state: t.state === 'Pending' ? 'Open' : t.state }));
  record.activityStream.push({ id: Date.now(), type: 'approval', author: req.body.approvedBy || 'Hiring Manager', text: 'Request Approved.', time: 'Just now' });

  writeDB(data);
  res.json({ success: true, record });
});

app.put('/api/tasks/:taskId', (req, res) => {
  const data = readDB();
  let foundTask, foundRecord;

  for (const r of data.records) {
    const t = r.tasks.find(x => x.id === req.params.taskId);
    if (t) { foundRecord = r; foundTask = t; break; }
  }

  if (!foundTask) return res.status(404).json({ success: false, error: 'Task not found' });

  if (req.body.state) foundTask.state = req.body.state;
  if (req.body.assignedTo) foundTask.assignedTo = req.body.assignedTo;
  if (req.body.checklist) foundTask.checklist = req.body.checklist;

  const allClosed = foundRecord.tasks.every(t => t.state === 'Closed Complete');
  if (allClosed) {
    foundRecord.state = 'Closed Complete';
    foundRecord.stage = 'Completed';
  }

  writeDB(data);
  res.json({ success: true, task: foundTask, record: foundRecord });
});

app.post('/api/reset', (req, res) => {
  writeDB({ records: INITIAL_RECORDS });
  res.json({ success: true, message: 'Database reset to baseline.' });
});

app.listen(PORT, () => {
  console.log(`🚀 ServiceNow Backend API running on http://localhost:${PORT}`);
  console.log(`📂 Database saved to database.json`);
});