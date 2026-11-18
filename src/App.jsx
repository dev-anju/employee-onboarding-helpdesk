import React, { useState, useMemo, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ROLES = ['System Admin', 'Hiring Manager', 'HR Support', 'IT Fulfillment'];

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
      department: 'Information Technology',
      startDate: '2026-11-10',
      employmentType: 'Full-Time (FTE)',
      workModel: 'Hybrid (San Francisco HQ)',
      costCenter: 'CC-4092 (IT Ops)',
      manager: 'Battula Anjali',
      hardwareProfile: 'Developer Workstation (MacBook Pro M3 Max)',
      peripherals: ['External Monitor (27" 4K)', 'Ergonomic Keyboard & Mouse', 'USB-C Docking Station'],
      softwareAccess: ['ServiceNow', 'AWS Production', 'GitHub Enterprise', 'Jira / Confluence', 'Slack'],
      securityClearance: 'Level 2 (Server Room & Prod VPC)',
      corporateEmail: 'ravi.kumar@enterprise.com',
      employeeId: 'EMP-9042',
      deskLocation: 'Building 4, Desk 302',
      assetTag: 'AST-40921',
      serialNumber: 'SN-APL-88219-M3'
    },
    slas: [
      { id: 'SLA-101', name: 'Manager Approval SLA', target: '24 Hours', elapsed: 100, status: 'Completed', breached: false, timeRemaining: 'Completed on time' },
      { id: 'SLA-102', name: 'IT & HR Fulfillment SLA', target: '5 Business Days', elapsed: 65, status: 'In Progress', breached: false, timeRemaining: '1d 18h remaining' },
      { id: 'SLA-103', name: 'Hardware Shipping SLA', target: '72 Hours', elapsed: 45, status: 'In Progress', breached: false, timeRemaining: '38h remaining' }
    ],
    activityStream: [
      { id: 1, type: 'system', author: 'System Engine', text: 'Catalog Item submitted by Anjali B. Workflows triggered.', time: '2026-10-30 09:00 AM' },
      { id: 2, type: 'approval', author: 'Hiring Manager', text: 'Approval granted by Hiring Manager (Battula Anjali).', time: '2026-10-30 10:15 AM' },
      { id: 3, type: 'work_note', author: 'Priya Sharma (HR Support)', text: 'I-9 documentation submitted by candidate; verification complete.', time: '2026-10-31 02:40 PM' },
      { id: 4, type: 'work_note', author: 'Alex Mercer (IT Fulfillment)', text: 'Active Directory account created. Preparing MacBook Pro M3 configuration.', time: '2026-11-01 11:20 AM' }
    ],
    tasks: [
      {
        id: 'SCTASK00201',
        group: 'HR Support',
        assignedTo: 'Priya Sharma',
        shortDesc: 'Verify I-9 and Tax Documents',
        priority: '2 - High',
        state: 'Closed Complete',
        dependency: null,
        slaStatus: 'Met',
        checklist: [
          { id: 'c1', label: 'Verify Form I-9 & Identification Documents', done: true },
          { id: 'c2', label: 'E-Verify Employment Eligibility Confirmation', done: true },
          { id: 'c3', label: 'W-4 & Direct Deposit Payroll Setup', done: true },
          { id: 'c4', label: 'Schedule Day 1 HR Orientation Session', done: true }
        ]
      },
      {
        id: 'SCTASK00202',
        group: 'IT Fulfillment',
        assignedTo: 'Alex Mercer',
        shortDesc: 'Provision AD Account & Hardware',
        priority: '2 - High',
        state: 'Work in Progress',
        dependency: 'SCTASK00201',
        slaStatus: 'Within SLA',
        checklist: [
          { id: 'c5', label: 'Create Okta & Active Directory Account', done: true },
          { id: 'c6', label: 'Assign AWS & GitHub Enterprise Licenses', done: true },
          { id: 'c7', label: 'Configure Laptop Image & MDM Enrollment', done: false },
          { id: 'c8', label: 'Dispatch Hardware Package & Log Tracking #', done: false }
        ]
      }
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
    variables: {
      hireName: 'Sneha Reddy',
      jobTitle: 'Content Marketing Lead',
      department: 'Marketing',
      startDate: '2026-11-15',
      employmentType: 'Full-Time (FTE)',
      workModel: 'Remote (Austin, TX)',
      costCenter: 'CC-3021 (Mktg)',
      manager: 'Battula Anjali',
      hardwareProfile: 'Standard Laptop (Dell Latitude 7440)',
      peripherals: ['External Monitor (27" 4K)', 'Wireless Peripherals Kit'],
      softwareAccess: ['ServiceNow', 'Jira / Confluence', 'Figma Enterprise', 'Slack'],
      securityClearance: 'Level 1 (General Office)',
      corporateEmail: 'sneha.reddy@enterprise.com',
      employeeId: 'EMP-9043',
      deskLocation: 'Remote Home Office',
      assetTag: 'AST-40922',
      serialNumber: 'SN-DELL-91028'
    },
    slas: [
      { id: 'SLA-104', name: 'Manager Approval SLA', target: '24 Hours', elapsed: 40, status: 'In Progress', breached: false, timeRemaining: '14h remaining' },
      { id: 'SLA-105', name: 'Onboarding Resolution SLA', target: '5 Business Days', elapsed: 10, status: 'Pending', breached: false, timeRemaining: 'Pending Approval' }
    ],
    activityStream: [
      { id: 1, type: 'system', author: 'System Engine', text: 'Onboarding Catalog Request submitted by Anjali B. Pending Hiring Manager Approval.', time: '2026-10-30 11:15 AM' }
    ],
    tasks: [
      {
        id: 'SCTASK00204',
        group: 'HR Support',
        assignedTo: 'Unassigned',
        shortDesc: 'Verify I-9 and Tax Documents',
        priority: '2 - High',
        state: 'Pending',
        dependency: null,
        slaStatus: 'Pending',
        checklist: [
          { id: 'c9', label: 'Verify Form I-9 & Tax Identification', done: false },
          { id: 'c10', label: 'E-Verify Employment Confirmation', done: false },
          { id: 'c11', label: 'Setup Benefits & Payroll Profile', done: false }
        ]
      },
      {
        id: 'SCTASK00205',
        group: 'IT Fulfillment',
        assignedTo: 'Unassigned',
        shortDesc: 'Provision AD Account & Hardware',
        priority: '2 - High',
        state: 'Pending',
        dependency: 'SCTASK00204',
        slaStatus: 'Pending',
        checklist: [
          { id: 'c12', label: 'Provision Google Workspace & Slack Account', done: false },
          { id: 'c13', label: 'Order & Ship Dell Latitude 7440', done: false },
          { id: 'c14', label: 'Assign Marketing Software Licenses', done: false }
        ]
      }
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
    variables: {
      item: 'External Monitor (27" 4K UHD)',
      justification: 'Dual-monitor setup required for DevOps infrastructure monitoring dashboards.',
      assetTag: 'AST-MON-3819',
      serialNumber: 'SN-DELL-MON-4481'
    },
    slas: [
      { id: 'SLA-106', name: 'Hardware Dispatch SLA', target: '72 Hours', elapsed: 55, status: 'In Progress', breached: false, timeRemaining: '24h remaining' }
    ],
    activityStream: [
      { id: 1, type: 'system', author: 'System Engine', text: 'Hardware request logged and auto-approved for IT Ops.', time: '2026-10-30 08:30 AM' },
      { id: 2, type: 'work_note', author: 'Alex Mercer (IT Fulfillment)', text: 'Monitor pulled from local hardware inventory shelf. Ready for courier pick-up.', time: '2026-10-30 01:10 PM' }
    ],
    tasks: [
      {
        id: 'SCTASK00206',
        group: 'IT Fulfillment',
        assignedTo: 'Alex Mercer',
        shortDesc: 'Procure and Dispatch Monitor',
        priority: '3 - Moderate',
        state: 'Open',
        dependency: null,
        slaStatus: 'Within SLA',
        checklist: [
          { id: 'c15', label: 'Verify Asset Tag and Serial in CMDB', done: true },
          { id: 'c16', label: 'Test DisplayPort and HDMI Cables', done: true },
          { id: 'c17', label: 'Generate Dispatch Shipping Label', done: false }
        ]
      }
    ]
  },
  {
    ritm: 'RITM0010045',
    type: 'Access',
    reqName: 'Access: AWS Production',
    requestedBy: 'David Kim',
    department: 'Engineering',
    costCenter: 'CC-5012 (Cloud Infra)',
    startDate: 'N/A',
    state: 'Closed Complete',
    stage: 'Completed',
    priority: '1 - Critical',
    date: '2026-10-28',
    variables: {
      system: 'AWS Production IAM Role (Read/Write)',
      justification: 'Quarterly cluster maintenance and database migration tasks.',
      securityClearance: 'Level 3 - Root/Prod'
    },
    slas: [
      { id: 'SLA-107', name: 'Privileged Access SLA', target: '4 Hours', elapsed: 100, status: 'Completed', breached: false, timeRemaining: 'Fulfilled in 1h 40m' }
    ],
    activityStream: [
      { id: 1, type: 'system', author: 'System Engine', text: 'Emergency access request submitted with manager endorsement.', time: '2026-10-28 09:10 AM' },
      { id: 2, type: 'approval', author: 'Hiring Manager', text: 'Manager approval granted.', time: '2026-10-28 09:25 AM' },
      { id: 3, type: 'work_note', author: 'Security Ops', text: 'IAM MFA enforced policy attached. Access valid for 90 days.', time: '2026-10-28 10:50 AM' }
    ],
    tasks: [
      {
        id: 'SCTASK00207',
        group: 'IT Fulfillment',
        assignedTo: 'Alex Mercer',
        shortDesc: 'Provision AWS IAM Prod Role',
        priority: '1 - Critical',
        state: 'Closed Complete',
        dependency: null,
        slaStatus: 'Met',
        checklist: [
          { id: 'c18', label: 'Verify Security Group Approval', done: true },
          { id: 'c19', label: 'Attach AWS IAM Policy & Enforce MFA', done: true }
        ]
      }
    ]
  }
];

export default function App() {
  const [view, setView] = useState('dashboard');
  const [activeRole, setActiveRole] = useState('System Admin');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReq, setSelectedReq] = useState(null);
  const [activeTab, setActiveTab] = useState('sctasks');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Live Backend Database Connection State
  const [dbConnected, setDbConnected] = useState(false);

  // Filters for Dashboard
  const [typeFilter, setTypeFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [showAiBanner, setShowAiBanner] = useState(true);

  // Notification Center
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'RITM0010043 (Sneha Reddy) is awaiting Hiring Manager approval.', unread: true, ritm: 'RITM0010043', time: '10m ago' },
    { id: 2, text: 'SCTASK00202 (AD & Hardware) has reached 65% SLA threshold.', unread: true, ritm: 'RITM0010042', time: '1h ago' },
    { id: 3, text: 'RITM0010045 (AWS Production) was Closed Complete.', unread: false, ritm: 'RITM0010045', time: 'Yesterday' }
  ]);

  // Modal States
  const [activeTaskModal, setActiveTaskModal] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('Headcount on hold / Budget review');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskData, setNewTaskData] = useState({ shortDesc: '', group: 'IT Fulfillment', priority: '2 - High' });

  // Activity Stream Composer State
  const [noteType, setNoteType] = useState('work_note');
  const [noteText, setNoteText] = useState('');

  // AI Now Assist Copilot (In-ticket summary state)
  const [aiSummary, setAiSummary] = useState(null);
  const [isGeneratingAiSummary, setIsGeneratingAiSummary] = useState(false);

  // AI Virtual Agent Chatbot State
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hello Anjali! I'm **Now Assist AI**, your enterprise virtual assistant. How can I help you today?",
      time: 'Just now',
      actions: [
        { label: '🔍 Check Ravi Kumar Onboarding', query: 'Status of Ravi Kumar' },
        { label: '⏳ What is pending approval?', query: 'Show pending approvals' },
        { label: '📋 Help me onboard a new hire', query: 'Help me onboard an employee' },
        { label: '💻 Request hardware guidelines', query: 'Hardware request policy' }
      ]
    }
  ]);

  const aiChatEndRef = useRef(null);

  useEffect(() => {
    if (isAiChatOpen && aiChatEndRef.current) {
      aiChatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, isAiTyping, isAiChatOpen]);

  // Catalog Wizard Form Data
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    hireName: '',
    jobTitle: '',
    department: 'Information Technology',
    startDate: '',
    employmentType: 'Full-Time (FTE)',
    workModel: 'Hybrid (San Francisco HQ)',
    costCenter: 'CC-4092 (IT Ops)',
    manager: 'Battula Anjali',
    hardwareProfile: 'Developer Workstation (MacBook Pro M3 Max)',
    peripherals: ['External Monitor (27" 4K)', 'Ergonomic Keyboard & Mouse'],
    softwareAccess: ['ServiceNow', 'AWS Production', 'GitHub Enterprise', 'Slack'],
    securityClearance: 'Level 2 (Server Room & Prod VPC)',
    shippingAddress: '100 Silicon Way, San Francisco, CA'
  });

  const [hardwareData, setHardwareData] = useState({ item: 'MacBook Pro M3', justification: '' });
  const [accessData, setAccessData] = useState({ system: 'AWS Production', justification: '' });

  // Main Records Data initialized with INITIAL_RECORDS
  const [records, setRecords] = useState(INITIAL_RECORDS);

  // FETCH LIVE DATA FROM BACKEND DATABASE ON MOUNT
  useEffect(() => {
    fetch('http://localhost:5001/api/records')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.records)) {
          setRecords(data.records);
          setDbConnected(true);
        }
      })
      .catch(err => {
        console.warn('Backend server offline, using local memory state:', err);
        setDbConnected(false);
      });
  }, []);

  // Synchronize selectedReq with state
  const currentSelectedReq = useMemo(() => {
    if (!selectedReq) return null;
    return records.find(r => r.ritm === selectedReq.ritm) || selectedReq;
  }, [records, selectedReq]);

  useEffect(() => {
    setAiSummary(null);
  }, [selectedReq?.ritm]);

  // Dynamic Metrics
  const metrics = useMemo(() => ({
    total: records.length,
    pending: records.filter(r => r.state === 'Pending Approval').length,
    active: records.filter(r => r.state === 'Work in Progress').length,
    completed: records.filter(r => r.state === 'Closed Complete').length
  }), [records]);

  // Filtered Records based on query, type and state filters
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      const matchSearch =
        r.reqName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.ritm.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.requestedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.department && r.department.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchType = typeFilter === 'All' || r.type === typeFilter;
      const matchState = stateFilter === 'All' || r.state === stateFilter;

      return matchSearch && matchType && matchState;
    });
  }, [records, searchQuery, typeFilter, stateFilter]);

  const myApprovals = useMemo(() => {
    return records.filter(r => r.state === 'Pending Approval');
  }, [records]);

  const myTasks = useMemo(() => {
    return records.flatMap(r =>
      r.tasks.map(t => ({
        ...t,
        parentRitm: r.ritm,
        parentReq: r.reqName,
        parentState: r.state
      }))
    ).filter(t => activeRole === 'System Admin' || t.group === activeRole);
  }, [records, activeRole]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  const handleSoftwareToggle = (app) => {
    setFormData(prev => ({
      ...prev,
      softwareAccess: prev.softwareAccess.includes(app)
        ? prev.softwareAccess.filter(i => i !== app)
        : [...prev.softwareAccess, app]
    }));
  };

  const handlePeripheralToggle = (item) => {
    setFormData(prev => ({
      ...prev,
      peripherals: prev.peripherals.includes(item)
        ? prev.peripherals.filter(i => i !== item)
        : [...prev.peripherals, item]
    }));
  };

  const generatedEmail = useMemo(() => {
    if (!formData.hireName.trim()) return 'firstname.lastname@enterprise.com';
    const clean = formData.hireName.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim().split(' ');
    if (clean.length === 1) return `${clean[0]}@enterprise.com`;
    return `${clean[0]}.${clean[clean.length - 1]}@enterprise.com`;
  }, [formData.hireName]);

  const generatedEmpId = useMemo(() => {
    return `EMP-${9000 + records.length + 1}`;
  }, [records.length]);

  const submitOnboarding = async () => {
    const newRitm = `RITM00100${45 + records.length}`;
    const newRecord = {
      ritm: newRitm,
      type: 'Onboarding',
      reqName: `Onboard: ${formData.hireName}`,
      requestedBy: activeRole === 'System Admin' ? 'Battula Anjali (Admin)' : activeRole,
      department: formData.department,
      costCenter: formData.costCenter,
      startDate: formData.startDate,
      state: 'Pending Approval',
      stage: 'Waiting for Approval',
      priority: '2 - High',
      date: new Date().toISOString().split('T')[0],
      variables: {
        ...formData,
        corporateEmail: generatedEmail,
        employeeId: generatedEmpId,
        assetTag: `AST-${40930 + records.length}`,
        serialNumber: `SN-APL-${88300 + records.length}-M3`
      },
      slas: [
        { id: `SLA-${Date.now()}-1`, name: 'Manager Approval SLA', target: '24 Hours', elapsed: 5, status: 'In Progress', breached: false, timeRemaining: '23h 30m remaining' },
        { id: `SLA-${Date.now()}-2`, name: 'Onboarding Fulfillment SLA', target: '5 Business Days', elapsed: 0, status: 'Pending', breached: false, timeRemaining: 'Pending Approval' }
      ],
      activityStream: [
        {
          id: Date.now(),
          type: 'system',
          author: 'System Engine',
          text: `Employee Onboarding Catalog Order submitted for ${formData.hireName}. Workflow initiated with Approval Gate.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      tasks: [
        {
          id: `SCTASK0030${records.length * 2 + 1}`,
          group: 'HR Support',
          assignedTo: 'Unassigned',
          shortDesc: 'Verify I-9, Tax Documents & Background Check',
          priority: '2 - High',
          state: 'Pending',
          dependency: null,
          slaStatus: 'Pending',
          checklist: [
            { id: 'nc1', label: 'Verify Identification & I-9 Documents', done: false },
            { id: 'nc2', label: 'Complete E-Verify Background Verification', done: false },
            { id: 'nc3', label: 'Setup Benefits and Payroll Profile', done: false },
            { id: 'nc4', label: 'Schedule Day 1 Welcome Orientation', done: false }
          ]
        },
        {
          id: `SCTASK0030${records.length * 2 + 2}`,
          group: 'IT Fulfillment',
          assignedTo: 'Unassigned',
          shortDesc: 'Provision AD/Okta Account, Cloud Access & Hardware',
          priority: '2 - High',
          state: 'Pending',
          dependency: `SCTASK0030${records.length * 2 + 1}`,
          slaStatus: 'Pending',
          checklist: [
            { id: 'nc5', label: 'Provision Corporate Email & Active Directory', done: false },
            { id: 'nc6', label: `Assign Software Licenses: ${formData.softwareAccess.slice(0, 3).join(', ')}`, done: false },
            { id: 'nc7', label: `Configure ${formData.hardwareProfile}`, done: false },
            { id: 'nc8', label: 'Courier Package to Desk / Home Address', done: false }
          ]
        }
      ]
    };

    // Optimistic UI update
    setRecords(prev => [newRecord, ...prev]);

    // Send to Backend API
    try {
      const res = await fetch('http://localhost:5001/api/records/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, requestedBy: activeRole })
      });
      const data = await res.json();
      if (data && data.success && data.record) {
        setRecords(prev => [data.record, ...prev.filter(r => r.ritm !== newRitm)]);
        setDbConnected(true);
      }
    } catch (e) {
      console.warn('Backend unavailable, persisted to UI state cache only');
    }

    setView('dashboard');
    setFormStep(1);
    setFormData({
      hireName: '',
      jobTitle: '',
      department: 'Information Technology',
      startDate: '',
      employmentType: 'Full-Time (FTE)',
      workModel: 'Hybrid (San Francisco HQ)',
      costCenter: 'CC-4092 (IT Ops)',
      manager: 'Battula Anjali',
      hardwareProfile: 'Developer Workstation (MacBook Pro M3 Max)',
      peripherals: ['External Monitor (27" 4K)'],
      softwareAccess: ['ServiceNow', 'AWS Production', 'Slack'],
      securityClearance: 'Level 2 (Server Room & Prod VPC)',
      shippingAddress: ''
    });

    setNotifications(prev => [
      { id: Date.now(), text: `New Request: ${newRitm} (Onboard: ${newRecord.variables.hireName}) awaiting approval.`, unread: true, ritm: newRitm, time: 'Just now' },
      ...prev
    ]);

    showToast(`Order Placed: ${newRitm} generated. Automated workflow triggered!`);
  };

  const submitHardware = async (e) => {
    e.preventDefault();
    const newRitm = `RITM00100${45 + records.length}`;
    const newRecord = {
      ritm: newRitm,
      type: 'Hardware',
      reqName: `Hardware: ${hardwareData.item}`,
      requestedBy: activeRole,
      department: 'Information Technology',
      costCenter: 'CC-4092 (IT Ops)',
      startDate: 'N/A',
      state: 'Pending Approval',
      stage: 'Waiting for Approval',
      priority: '3 - Moderate',
      date: new Date().toISOString().split('T')[0],
      variables: {
        item: hardwareData.item,
        justification: hardwareData.justification,
        assetTag: `AST-HW-${5000 + records.length}`
      },
      slas: [
        { id: `SLA-${Date.now()}`, name: 'Hardware Dispatch SLA', target: '72 Hours', elapsed: 10, status: 'In Progress', breached: false, timeRemaining: '68h remaining' }
      ],
      activityStream: [
        { id: Date.now(), type: 'system', author: 'System Engine', text: `Hardware request submitted for ${hardwareData.item}.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ],
      tasks: [
        {
          id: `SCTASK0030${records.length + 1}`,
          group: 'IT Fulfillment',
          assignedTo: 'Unassigned',
          shortDesc: `Procure and Configure ${hardwareData.item}`,
          priority: '3 - Moderate',
          state: 'Pending',
          dependency: null,
          slaStatus: 'Pending',
          checklist: [
            { id: 'h1', label: 'Verify Stock Availability in IT Depot', done: false },
            { id: 'h2', label: 'Tag Asset in ServiceNow CMDB', done: false },
            { id: 'h3', label: 'Dispatch to Requester Desk', done: false }
          ]
        }
      ]
    };
    setRecords(prev => [newRecord, ...prev]);

    try {
      const res = await fetch('http://localhost:5001/api/records/hardware', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...hardwareData, requestedBy: activeRole })
      });
      const data = await res.json();
      if (data && data.success && data.record) {
        setRecords(prev => [data.record, ...prev.filter(r => r.ritm !== newRitm)]);
        setDbConnected(true);
      }
    } catch (err) {
      console.warn('Backend unavailable, persisted to UI cache');
    }

    setView('dashboard');
    setHardwareData({ item: 'MacBook Pro M3', justification: '' });
    showToast(`Hardware Request ${newRitm} submitted successfully.`);
  };

  const submitAccess = async (e) => {
    e.preventDefault();
    const newRitm = `RITM00100${45 + records.length}`;
    const newRecord = {
      ritm: newRitm,
      type: 'Access',
      reqName: `Access: ${accessData.system}`,
      requestedBy: activeRole,
      department: 'Information Technology',
      costCenter: 'CC-4092 (IT Ops)',
      startDate: 'N/A',
      state: 'Pending Approval',
      stage: 'Waiting for Approval',
      priority: '2 - High',
      date: new Date().toISOString().split('T')[0],
      variables: {
        system: accessData.system,
        justification: accessData.justification
      },
      slas: [
        { id: `SLA-${Date.now()}`, name: 'Security Access Approval SLA', target: '24 Hours', elapsed: 15, status: 'In Progress', breached: false, timeRemaining: '20h remaining' }
      ],
      activityStream: [
        { id: Date.now(), type: 'system', author: 'System Engine', text: `System access request for ${accessData.system} submitted.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ],
      tasks: [
        {
          id: `SCTASK0030${records.length + 1}`,
          group: 'IT Fulfillment',
          assignedTo: 'Unassigned',
          shortDesc: `Grant ${accessData.system} Access and MFA Configuration`,
          priority: '2 - High',
          state: 'Pending',
          dependency: null,
          slaStatus: 'Pending',
          checklist: [
            { id: 'a1', label: 'Verify Information Security Compliance Clearance', done: false },
            { id: 'a2', label: 'Provision IAM / SSO RBAC Group', done: false }
          ]
        }
      ]
    };
    setRecords(prev => [newRecord, ...prev]);

    try {
      const res = await fetch('http://localhost:5001/api/records/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...accessData, requestedBy: activeRole })
      });
      const data = await res.json();
      if (data && data.success && data.record) {
        setRecords(prev => [data.record, ...prev.filter(r => r.ritm !== newRitm)]);
        setDbConnected(true);
      }
    } catch (err) {
      console.warn('Backend unavailable, saved locally');
    }

    setView('dashboard');
    setAccessData({ system: 'AWS Production', justification: '' });
    showToast(`Access Request ${newRitm} submitted successfully.`);
  };

  const approveRequest = async (ritmId = currentSelectedReq?.ritm) => {
    if (activeRole !== 'System Admin' && activeRole !== 'Hiring Manager') {
      showToast('Error: Only Hiring Managers or System Admins possess approval authority.', 'error');
      return;
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setRecords(prevRecords =>
      prevRecords.map(r => {
        if (r.ritm === ritmId) {
          const updatedTasks = r.tasks.map(t => ({
            ...t,
            state: t.state === 'Pending' ? 'Open' : t.state,
            slaStatus: t.state === 'Pending' ? 'Within SLA' : t.slaStatus
          }));

          const updatedActivities = [
            ...r.activityStream,
            {
              id: Date.now(),
              type: 'approval',
              author: `${activeRole} (Battula Anjali)`,
              text: `Request Approved. Automated Flow Designer transitioned stage to Fulfillment. SCTASKs unlocked.`,
              time: timestamp
            }
          ];

          return {
            ...r,
            state: 'Work in Progress',
            stage: 'Fulfillment',
            tasks: updatedTasks,
            activityStream: updatedActivities
          };
        }
        return r;
      })
    );

    try {
      await fetch(`http://localhost:5001/api/records/${ritmId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approvedBy: `${activeRole} (Battula Anjali)` })
      });
      setDbConnected(true);
    } catch (err) {
      console.warn('Backend approve call offline');
    }

    showToast(`${ritmId} Approved. Catalog Tasks automatically dispatched to Fulfillment Groups.`);
  };

  const handleRejectConfirm = async () => {
    if (!currentSelectedReq) return;
    const ritmId = currentSelectedReq.ritm;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setRecords(prevRecords =>
      prevRecords.map(r => {
        if (r.ritm === ritmId) {
          const updatedTasks = r.tasks.map(t => ({
            ...t,
            state: 'Closed Incomplete'
          }));

          const updatedActivities = [
            ...r.activityStream,
            {
              id: Date.now(),
              type: 'system',
              author: `${activeRole} (Battula Anjali)`,
              text: `REQUEST REJECTED: "${rejectionReason}". All associated SCTASKs marked Closed Incomplete / Cancelled.`,
              time: timestamp
            }
          ];

          return {
            ...r,
            state: 'Closed Rejected',
            stage: 'Cancelled',
            tasks: updatedTasks,
            activityStream: updatedActivities
          };
        }
        return r;
      })
    );

    try {
      await fetch(`http://localhost:5001/api/records/${ritmId}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rejectedBy: `${activeRole} (Battula Anjali)`, reason: rejectionReason })
      });
    } catch (e) {
      console.warn('Backend reject call offline');
    }

    setShowRejectModal(false);
    showToast(`${ritmId} has been Rejected and Cancelled.`, 'error');
  };

  const updateScTask = async (taskId, newState, parentRitm) => {
    const parent = records.find(r => r.ritm === parentRitm);
    const targetTask = parent?.tasks.find(t => t.id === taskId);

    if (newState === 'Closed Complete' && targetTask?.dependency) {
      const prerequisite = parent.tasks.find(t => t.id === targetTask.dependency);
      if (prerequisite && prerequisite.state !== 'Closed Complete') {
        showToast(
          `Prerequisite Blocked: Cannot complete ${taskId} until prerequisite (${prerequisite.id}: ${prerequisite.shortDesc}) is Closed Complete.`,
          'error'
        );
        return;
      }
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setRecords(prevRecords =>
      prevRecords.map(r => {
        if (r.ritm === parentRitm) {
          const updatedTasks = r.tasks.map(t => {
            if (t.id === taskId) {
              return {
                ...t,
                state: newState,
                slaStatus: newState === 'Closed Complete' ? 'Met' : t.slaStatus
              };
            }
            return t;
          });

          const allClosed = updatedTasks.every(t => t.state === 'Closed Complete');
          let newParentState = r.state;
          let newParentStage = r.stage;

          if (allClosed) {
            newParentState = 'Closed Complete';
            newParentStage = 'Completed';
          }

          const updatedActivities = [
            ...r.activityStream,
            {
              id: Date.now(),
              type: 'work_note',
              author: `${activeRole} (Battula Anjali)`,
              text: `Task ${taskId} status updated to [${newState}].${allClosed ? ' All tasks completed; RITM automatically Closed Complete.' : ''}`,
              time: timestamp
            }
          ];

          return {
            ...r,
            tasks: updatedTasks,
            state: newParentState,
            stage: newParentStage,
            activityStream: updatedActivities
          };
        }
        return r;
      })
    );

    if (activeTaskModal && activeTaskModal.id === taskId) {
      setActiveTaskModal(prev => ({ ...prev, state: newState }));
    }

    try {
      await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: newState })
      });
    } catch (e) {
      console.warn('Backend task update offline');
    }

    showToast(`${taskId} state updated to ${newState}.`);
  };

  const handleChecklistToggle = (checkId) => {
    if (!activeTaskModal || !currentSelectedReq) return;

    const parentRitm = currentSelectedReq.ritm;
    const taskId = activeTaskModal.id;

    setRecords(prevRecords =>
      prevRecords.map(r => {
        if (r.ritm === parentRitm) {
          const updatedTasks = r.tasks.map(t => {
            if (t.id === taskId) {
              const updatedChecklist = (t.checklist || []).map(c =>
                c.id === checkId ? { ...c, done: !c.done } : c
              );
              return { ...t, checklist: updatedChecklist };
            }
            return t;
          });
          return { ...r, tasks: updatedTasks };
        }
        return r;
      })
    );

    setActiveTaskModal(prev => ({
      ...prev,
      checklist: (prev.checklist || []).map(c =>
        c.id === checkId ? { ...c, done: !c.done } : c
      )
    }));
  };

  const handleAddAdhocTask = (e) => {
    e.preventDefault();
    if (!currentSelectedReq || !newTaskData.shortDesc.trim()) return;

    const newTaskId = `SCTASK00${350 + Math.floor(Math.random() * 100)}`;
    const newTask = {
      id: newTaskId,
      group: newTaskData.group,
      assignedTo: 'Unassigned',
      shortDesc: newTaskData.shortDesc,
      priority: newTaskData.priority,
      state: 'Open',
      dependency: null,
      slaStatus: 'Within SLA',
      checklist: [{ id: 'adhoc1', label: newTaskData.shortDesc, done: false }]
    };

    setRecords(prevRecords =>
      prevRecords.map(r => {
        if (r.ritm === currentSelectedReq.ritm) {
          return {
            ...r,
            tasks: [...r.tasks, newTask],
            activityStream: [
              ...r.activityStream,
              {
                id: Date.now(),
                type: 'work_note',
                author: `${activeRole} (Battula Anjali)`,
                text: `Ad-hoc Task ${newTaskId} added: "${newTaskData.shortDesc}" assigned to ${newTaskData.group}.`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]
          };
        }
        return r;
      })
    );

    setShowAddTaskModal(false);
    setNewTaskData({ shortDesc: '', group: 'IT Fulfillment', priority: '2 - High' });
    showToast(`Ad-hoc task ${newTaskId} successfully created.`);
  };

  const handlePostNote = (e) => {
    e.preventDefault();
    if (!currentSelectedReq || !noteText.trim()) return;

    const newEntry = {
      id: Date.now(),
      type: noteType,
      author: `${activeRole} (Battula Anjali)`,
      text: noteText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setRecords(prevRecords =>
      prevRecords.map(r => {
        if (r.ritm === currentSelectedReq.ritm) {
          return {
            ...r,
            activityStream: [...r.activityStream, newEntry]
          };
        }
        return r;
      })
    );

    setNoteText('');
    showToast(`${noteType === 'work_note' ? 'Work note (Internal)' : 'Additional comment (Customer visible)'} posted.`);
  };

  // Generate In-Ticket AI Summary (Now Assist)
  const handleGenerateAiSummary = () => {
    if (!currentSelectedReq) return;
    setIsGeneratingAiSummary(true);

    setTimeout(() => {
      const openTasks = currentSelectedReq.tasks.filter(t => t.state !== 'Closed Complete');
      const closedTasks = currentSelectedReq.tasks.filter(t => t.state === 'Closed Complete');

      setAiSummary({
        executiveDigest: `${currentSelectedReq.reqName} is currently in [${currentSelectedReq.stage}] stage with state [${currentSelectedReq.state}]. ${closedTasks.length} of ${currentSelectedReq.tasks.length} fulfillment tasks completed.`,
        keyBlocker: currentSelectedReq.state === 'Pending Approval'
          ? 'Request is awaiting Hiring Manager approval before fulfillment tasks can unlock.'
          : openTasks.length > 0
          ? `Waiting on completion of ${openTasks[0].id} (${openTasks[0].shortDesc}) by ${openTasks[0].group}.`
          : 'All tasks completed. Ready for automated Day 1 closure.',
        slaRiskAssessment: currentSelectedReq.slas?.some(s => s.elapsed > 75)
          ? '⚠️ Moderate SLA Risk: Hardware procurement is past 50% elapsed threshold.'
          : '🟢 Low SLA Risk: All milestones tracking within standard operational thresholds.',
        recommendedAction: currentSelectedReq.state === 'Pending Approval'
          ? 'Prompt Hiring Manager to review and approve.'
          : openTasks.length > 0
          ? `Nudge ${openTasks[0].assignedTo !== 'Unassigned' ? openTasks[0].assignedTo : openTasks[0].group} to expedite task fulfillment.`
          : 'Send welcome credentials to candidate.'
      });
      setIsGeneratingAiSummary(false);
      showToast('Now Assist AI Summary generated.');
    }, 600);
  };

  // AI Draft Customer Update to insert into Activity Stream
  const handleAiDraftCustomerUpdate = () => {
    if (!currentSelectedReq) return;
    const name = currentSelectedReq.variables?.hireName || 'Candidate';
    const email = currentSelectedReq.variables?.corporateEmail || 'corporate email';
    const draftText = `Hello ${name}, your onboarding setup is progressing on schedule. Your identity account (${email}) and hardware provisioning are actively being coordinated by our IT & HR teams. Please let us know if you have any questions before your Day 1 start date. - IT Service Desk`;

    setNoteType('comment');
    setNoteText(draftText);
    setActiveTab('activity');
    showToast('AI drafted customer comment loaded into composer below!');
  };

  // Conversational Virtual Agent Query Processor
  const handleSendAiMessage = (userQueryText) => {
    const query = (userQueryText || aiInput).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiMessages(prev => [...prev, userMsg]);
    setAiInput('');
    setIsAiTyping(true);

    setTimeout(() => {
      const qLower = query.toLowerCase();
      let botResponse = '';
      let botActions = [];

      const matchedRecord = records.find(r =>
        qLower.includes(r.ritm.toLowerCase()) ||
        qLower.includes(r.reqName.toLowerCase()) ||
        (r.variables?.hireName && qLower.includes(r.variables.hireName.toLowerCase()))
      );

      if (matchedRecord) {
        const openTasks = matchedRecord.tasks.filter(t => t.state !== 'Closed Complete');
        botResponse = `📄 **${matchedRecord.ritm}**: ${matchedRecord.reqName}\n\n` +
          `• **State**: ${matchedRecord.state}\n` +
          `• **Stage**: ${matchedRecord.stage}\n` +
          `• **Department**: ${matchedRecord.department}\n` +
          `• **Open Tasks**: ${openTasks.length > 0 ? openTasks.map(t => `${t.id} (${t.group})`).join(', ') : 'None (All Completed)'}\n` +
          `• **Target Start Date**: ${matchedRecord.startDate || 'N/A'}`;

        botActions = [
          {
            label: `👉 Open ${matchedRecord.ritm} Detail`,
            onClick: () => {
              setSelectedReq(matchedRecord);
              setView('dashboard');
              setIsAiChatOpen(false);
            }
          }
        ];
      } else if (qLower.includes('approval') || qLower.includes('pending')) {
        const pending = records.filter(r => r.state === 'Pending Approval');
        if (pending.length === 0) {
          botResponse = '🎉 Great news! There are currently **0 requests pending approval**. All active requests have been authorized and are moving through fulfillment.';
        } else {
          botResponse = `⏳ There are currently **${pending.length} request(s) awaiting approval**:\n\n` +
            pending.map(p => `• **${p.ritm}**: ${p.reqName} (Requested by ${p.requestedBy})`).join('\n') +
            `\n\n*Would you like to review and approve these now?*`;

          botActions = pending.map(p => ({
            label: `Review ${p.ritm}`,
            onClick: () => {
              setSelectedReq(p);
              setView('dashboard');
              setIsAiChatOpen(false);
            }
          }));
        }
      } else if (qLower.includes('hardware') || qLower.includes('laptop') || qLower.includes('macbook')) {
        botResponse = "💻 **Enterprise Hardware Standards Policy**:\n\n" +
          "• **Engineering / DevOps**: MacBook Pro M3 Max (64GB) or Lenovo ThinkPad P1\n" +
          "• **Marketing / Sales / HR**: Dell Latitude 7440 or ThinkPad X1 Carbon\n" +
          "• **Standard Peripherals**: 27\" 4K UHD External Display, Ergonomic Keyboard & Mouse, USB-C Dock\n\n" +
          "Would you like to submit a new hardware procurement ticket?";

        botActions = [
          {
            label: '➕ Create Hardware Request',
            onClick: () => {
              setView('hardware');
              setSelectedReq(null);
              setIsAiChatOpen(false);
            }
          }
        ];
      } else if (qLower.includes('onboard') || qLower.includes('hire') || qLower.includes('new employee')) {
        botResponse = "📋 **Automated Employee Onboarding Workflow**:\n\n" +
          "When you submit an Onboarding request via the portal:\n" +
          "1. **Manager Approval Gate**: Automatically routed to the reporting manager\n" +
          "2. **HR Compliance**: Form I-9, tax verification, and background check\n" +
          "3. **IT Provisioning**: Automated Okta, Google/M365, Slack & laptop dispatch\n" +
          "4. **Day 1 Readiness**: Welcome credentials dispatched prior to start date\n\n" +
          "Ready to onboard a new team member?";

        botActions = [
          {
            label: '🚀 Start Onboarding Wizard',
            onClick: () => {
              setView('catalog');
              setSelectedReq(null);
              setIsAiChatOpen(false);
            }
          }
        ];
      } else if (qLower.includes('sla') || qLower.includes('breach')) {
        botResponse = "⏱️ **Service Level Agreement (SLA) Health Report**:\n\n" +
          "• **Approval SLA (Target: 24h)**: 100% compliance rate\n" +
          "• **Resolution SLA (Target: 5 days)**: Average fulfillment turnaround is 2.8 business days\n" +
          "• **Active Alerts**: RITM0010042 has 1d 18h remaining on its fulfillment window.";
      } else {
        botResponse = `🤖 I can assist you with your ServiceNow enterprise workflow tasks:\n\n` +
          `• Looking up candidate onboarding tickets (e.g. *\"Status of Ravi Kumar\"*)\n` +
          `• Reviewing pending approvals (e.g. *\"What needs approval?\"*)\n` +
          `• Fast-tracking IT Hardware or System Access requests\n` +
          `• Checking fulfillment task and SLA deadlines`;

        botActions = [
          { label: '🔍 Check Ravi Kumar', query: 'Status of Ravi Kumar' },
          { label: '⏳ Check Approvals', query: 'Show pending approvals' },
          { label: '📋 New Hire Onboarding', query: 'Help me onboard an employee' }
        ];
      }

      setAiMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: botActions
        }
      ]);
      setIsAiTyping(false);
    }, 500);
  };

  const handleExportCSV = () => {
    const headers = ['RITM Number', 'Item Name', 'Type', 'Department', 'Requested By', 'Start Date', 'State', 'Stage'];
    const rows = filteredRecords.map(r => [
      r.ritm,
      `"${r.reqName.replace(/"/g, '""')}"`,
      r.type,
      `"${r.department}"`,
      `"${r.requestedBy}"`,
      r.startDate,
      r.state,
      r.stage
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ServiceNow_RITM_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${filteredRecords.length} records to CSV.`);
  };

  const getWorkflowStages = (req) => {
    if (!req) return [];

    const isRejected = req.state === 'Closed Rejected';
    const isApprovalDone = req.state !== 'Pending Approval' && !isRejected;

    const hrTasks = req.tasks.filter(t => t.group === 'HR Support');
    const hrDone = hrTasks.length > 0 && hrTasks.every(t => t.state === 'Closed Complete');
    const hrWip = hrTasks.some(t => t.state === 'Work in Progress' || t.state === 'Open');

    const itTasks = req.tasks.filter(t => t.group === 'IT Fulfillment');
    const itDone = itTasks.length > 0 && itTasks.every(t => t.state === 'Closed Complete');
    const itWip = itTasks.some(t => t.state === 'Work in Progress' || t.state === 'Open');

    const allClosed = req.state === 'Closed Complete';

    return [
      {
        name: '1. Manager Approval',
        status: isRejected ? 'rejected' : isApprovalDone ? 'completed' : 'active',
        desc: isRejected ? 'Rejected' : isApprovalDone ? 'Approved' : 'Pending Review'
      },
      {
        name: '2. HR Compliance',
        status: isRejected ? 'pending' : hrDone ? 'completed' : hrWip ? 'active' : 'pending',
        desc: hrDone ? 'I-9 Verified' : hrWip ? 'In Progress' : 'Awaiting Approval'
      },
      {
        name: '3. IT & Identity',
        status: isRejected ? 'pending' : itDone ? 'completed' : itWip ? 'active' : 'pending',
        desc: itDone ? 'Provisioned' : itWip ? 'Active Setup' : 'Pending'
      },
      {
        name: '4. Asset Logistics',
        status: isRejected ? 'pending' : allClosed ? 'completed' : itDone ? 'completed' : itWip ? 'active' : 'pending',
        desc: allClosed ? 'Dispatched' : itWip ? 'Hardware Prep' : 'Queued'
      },
      {
        name: '5. Day 1 Ready',
        status: allClosed ? 'completed' : 'pending',
        desc: allClosed ? 'Ready for Day 1' : 'Incomplete'
      }
    ];
  };

  const getBadge = (state) => {
    if (!state) return 'badge-gray';
    if (state === 'Pending' || state.includes('Approval') || state.includes('Waiting')) return 'badge-yellow';
    if (state === 'Open' || state === 'Work in Progress') return 'badge-blue';
    if (state === 'Closed Complete' || state === 'Completed') return 'badge-green';
    if (state.includes('Rejected') || state.includes('Incomplete') || state.includes('Cancelled')) return 'badge-red';
    return 'badge-gray';
  };

  const getPriorityBadge = (prio) => {
    if (!prio) return 'badge bg-secondary';
    if (prio.includes('Critical') || prio.includes('1')) return 'badge bg-danger';
    if (prio.includes('High') || prio.includes('2')) return 'badge bg-warning text-dark';
    if (prio.includes('Moderate') || prio.includes('3')) return 'badge bg-info text-dark';
    return 'badge bg-light text-dark border';
  };

  const customStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    #root { display: flex; width: 100%; height: 100vh; max-width: none; padding: 0; margin: 0; text-align: left; }
    body { background-color: #f4f6f8; font-family: 'Inter', sans-serif; color: #1f2937; margin: 0; overflow: hidden; }
    .sidebar { width: 260px; background: #111827; color: #9ca3af; display: flex; flex-direction: column; height: 100vh; overflow-y: auto; flex-shrink: 0; }
    .main-content { flex-grow: 1; display: flex; flex-direction: column; height: 100vh; overflow-y: auto; background: #f3f4f6; }
    .topbar { height: 60px; background: #ffffff; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; flex-shrink: 0; position: relative; }
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
    .badge-red { background: #fee2e2; color: #991b1b; }
    .wizard-steps { display: flex; border-bottom: 1px solid #e5e7eb; margin-bottom: 24px; padding-bottom: 16px; }
    .step-item { flex: 1; text-align: center; position: relative; color: #9ca3af; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;}
    .step-item.active { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 8px; }
    .step-item.completed { color: #10b981; }
    .form-control, .form-select { border-radius: 6px; font-size: 0.9rem; border-color: #d1d5db; padding: 0.5rem 0.75rem; }
    .toast-container { position: fixed; bottom: 85px; right: 24px; z-index: 2000; }
    .custom-toast { background: #1f2937; color: white; padding: 12px 20px; border-radius: 8px; font-size: 0.9rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); display: flex; gap: 10px; align-items: center;}

    /* ServiceNow Stage Progress Flow Bar */
    .stage-chevron-container { display: flex; overflow-x: auto; gap: 4px; padding: 6px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; }
    .stage-chevron { flex: 1; min-width: 140px; padding: 8px 12px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-align: center; position: relative; display: flex; flex-direction: column; justify-content: center; }
    .stage-chevron.completed { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
    .stage-chevron.active { background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2); }
    .stage-chevron.pending { background: #ffffff; color: #94a3b8; border: 1px solid #e2e8f0; }
    .stage-chevron.rejected { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }

    /* Work Notes & Activity Stream */
    .activity-bubble { position: relative; padding: 14px; border-radius: 6px; margin-bottom: 12px; font-size: 0.85rem; }
    .activity-work-note { background: #fffbeb; border-left: 4px solid #f59e0b; color: #78350f; }
    .activity-comment { background: #eff6ff; border-left: 4px solid #3b82f6; color: #1e3a8a; }
    .activity-system { background: #f9fafb; border-left: 4px solid #9ca3af; color: #374151; }

    /* Notifications Dropdown */
    .notification-dropdown { position: absolute; top: 55px; right: 24px; width: 340px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); z-index: 1050; }
    .notification-item { padding: 10px 14px; border-bottom: 1px solid #f3f4f6; font-size: 0.8rem; cursor: pointer; transition: 0.2s; }
    .notification-item:hover { background: #f8fafc; }
    .notification-item.unread { background: #f0fdf4; }

    /* Modal Backdrop */
    .custom-modal-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(17, 24, 39, 0.6); z-index: 1500; display: flex; align-items: center; justify-content: center; }
    .custom-modal-content { background: #ffffff; border-radius: 8px; width: 95%; max-width: 650px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2); }

    /* Flow Designer Node */
    .flow-node { border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; background: white; margin-bottom: 10px; display: flex; align-items: center; gap: 12px; }

    /* Now Assist AI Bot Launcher & Window */
    .ai-fab-launcher { position: fixed; bottom: 20px; right: 24px; z-index: 1200; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; border: none; border-radius: 30px; padding: 10px 18px; font-weight: 600; font-size: 0.85rem; box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35); cursor: pointer; display: flex; align-items: center; gap: 8px; transition: transform 0.2s, box-shadow 0.2s; }
    .ai-fab-launcher:hover { transform: translateY(-2px); box-shadow: 0 12px 25px rgba(37, 99, 235, 0.45); }
    .ai-pulse-dot { width: 8px; height: 8px; background: #34d399; border-radius: 50%; box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.4); animation: pulse 2s infinite; }
    @keyframes pulse { 0% { transform: scale(0.95); opacity: 0.8; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(0.95); opacity: 0.8; } }

    .ai-chat-window { position: fixed; bottom: 75px; right: 24px; width: 390px; height: 550px; background: #ffffff; border-radius: 12px; box-shadow: 0 15px 35px -5px rgba(0,0,0,0.25); z-index: 1200; display: flex; flex-direction: column; overflow: hidden; border: 1px solid #e2e8f0; animation: slideUp 0.25s ease-out; }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .ai-chat-header { background: #111827; color: white; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
    .ai-chat-body { flex: 1; padding: 14px; overflow-y: auto; background: #f8fafc; display: flex; flex-direction: column; gap: 10px; font-size: 0.85rem; }
    .ai-msg { max-width: 85%; padding: 10px 14px; border-radius: 10px; line-height: 1.4; word-wrap: break-word; }
    .ai-msg-bot { align-self: flex-start; background: #ffffff; border: 1px solid #e2e8f0; color: #1e293b; border-bottom-left-radius: 2px; }
    .ai-msg-user { align-self: flex-end; background: #2563eb; color: #ffffff; border-bottom-right-radius: 2px; }
    .ai-action-chip { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 14px; padding: 4px 10px; font-size: 0.72rem; font-weight: 600; cursor: pointer; display: inline-block; margin-top: 5px; margin-right: 5px; transition: background 0.15s; }
    .ai-action-chip:hover { background: #dbeafe; }
    .ai-chat-footer { padding: 10px 12px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; gap: 8px; flex-shrink: 0; }
    .ai-typing-indicator { font-style: italic; font-size: 0.75rem; color: #64748b; padding-left: 4px; }
  `;

  return (
    <>
      <style>{customStyles}</style>

      {/* TOAST SYSTEM */}
      {toast.show && (
        <div className="toast-container">
          <div className="custom-toast">
            <span>{toast.type === 'error' ? '🚫' : toast.type === 'warning' ? '⚠️' : '✅'}</span>
            <span className="fw-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* REJECTION JUSTIFICATION MODAL */}
      {showRejectModal && (
        <div className="custom-modal-backdrop" onClick={() => setShowRejectModal(false)}>
          <div className="custom-modal-content p-4" onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-danger mb-0">Reject Request: {currentSelectedReq?.ritm}</h5>
              <button className="btn btn-sm btn-close" onClick={() => setShowRejectModal(false)}></button>
            </div>
            <p className="text-muted small mb-3">
              Rejecting this request will immediately mark it as <strong>Closed Rejected</strong>, cancel all scheduled Catalog Tasks (SCTASKs), and notify stakeholders in the Activity Stream.
            </p>
            <div className="mb-3">
              <label className="form-label small fw-bold">Select Rejection Reason Preset</label>
              <select className="form-select form-select-sm" value={rejectionReason} onChange={e => setRejectionReason(e.target.value)}>
                <option>Headcount on hold / Budget review</option>
                <option>Duplicate onboarding ticket submitted</option>
                <option>Offer rescinded or candidate declined</option>
                <option>Incorrect Department, Cost Center or Reporting Manager</option>
                <option>Missing required HR compliance attachments</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Additional Rejection Notes</label>
              <textarea className="form-control" rows="3" placeholder="Provide detailed context for the audit log..." value={rejectionReason} onChange={e => setRejectionReason(e.target.value)}></textarea>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowRejectModal(false)}>Cancel</button>
              <button className="btn btn-sm btn-danger fw-bold px-4" onClick={handleRejectConfirm}>Confirm & Reject Request</button>
            </div>
          </div>
        </div>
      )}

      {/* AD-HOC SCTASK MODAL */}
      {showAddTaskModal && (
        <div className="custom-modal-backdrop" onClick={() => setShowAddTaskModal(false)}>
          <div className="custom-modal-content p-4" onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Create Ad-hoc Catalog Task (SCTASK)</h5>
              <button className="btn btn-sm btn-close" onClick={() => setShowAddTaskModal(false)}></button>
            </div>
            <p className="text-muted small mb-3">Append an ad-hoc fulfillment task to {currentSelectedReq?.ritm}.</p>
            <form onSubmit={handleAddAdhocTask}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Short Description *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Order Special Ergonomic Keyboard & Setup Security Token"
                  required
                  value={newTaskData.shortDesc}
                  onChange={e => setNewTaskData({ ...newTaskData, shortDesc: e.target.value })}
                />
              </div>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Assignment Group</label>
                  <select className="form-select" value={newTaskData.group} onChange={e => setNewTaskData({ ...newTaskData, group: e.target.value })}>
                    <option>IT Fulfillment</option>
                    <option>HR Support</option>
                    <option>Security & Facilities</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Priority</label>
                  <select className="form-select" value={newTaskData.priority} onChange={e => setNewTaskData({ ...newTaskData, priority: e.target.value })}>
                    <option>1 - Critical</option>
                    <option>2 - High</option>
                    <option>3 - Moderate</option>
                    <option>4 - Low</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setShowAddTaskModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-sm btn-primary fw-bold px-4">Generate SCTASK</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCTASK INTERACTIVE DETAIL MODAL */}
      {activeTaskModal && currentSelectedReq && (
        <div className="custom-modal-backdrop" onClick={() => setActiveTaskModal(null)}>
          <div className="custom-modal-content p-4" onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
              <div>
                <span className="text-primary fw-bold small">{activeTaskModal.id}</span>
                <h5 className="fw-bold mb-1">{activeTaskModal.shortDesc}</h5>
                <span className="text-muted small">Parent: <strong>{currentSelectedReq.ritm}</strong> ({currentSelectedReq.reqName})</span>
              </div>
              <button className="btn btn-sm btn-close" onClick={() => setActiveTaskModal(null)}></button>
            </div>

            <div className="row g-3 bg-light p-3 rounded mb-3 small">
              <div className="col-md-4">
                <div className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Assignment Group</div>
                <div className="fw-bold text-dark">{activeTaskModal.group}</div>
              </div>
              <div className="col-md-4">
                <div className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Assigned To</div>
                <select
                  className="form-select form-select-sm mt-1"
                  value={activeTaskModal.assignedTo || 'Unassigned'}
                  onChange={e => {
                    const newAssignee = e.target.value;
                    setActiveTaskModal({ ...activeTaskModal, assignedTo: newAssignee });
                    setRecords(records.map(r => r.ritm === currentSelectedReq.ritm ? {
                      ...r,
                      tasks: r.tasks.map(t => t.id === activeTaskModal.id ? { ...t, assignedTo: newAssignee } : t)
                    } : r));
                    showToast(`${activeTaskModal.id} assigned to ${newAssignee}`);
                  }}
                >
                  <option>Unassigned</option>
                  <option>Battula Anjali</option>
                  <option>Alex Mercer</option>
                  <option>Priya Sharma</option>
                  <option>David Kim</option>
                </select>
              </div>
              <div className="col-md-4">
                <div className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>State</div>
                <select
                  className="form-select form-select-sm mt-1"
                  value={activeTaskModal.state}
                  onChange={e => updateScTask(activeTaskModal.id, e.target.value, currentSelectedReq.ritm)}
                  disabled={currentSelectedReq.state === 'Pending Approval' || activeTaskModal.state === 'Closed Complete'}
                >
                  <option value="Pending">Pending</option>
                  <option value="Open">Open</option>
                  <option value="Work in Progress">Work in Progress</option>
                  <option value="Closed Complete">Closed Complete</option>
                </select>
              </div>
            </div>

            {/* Dependency Warning */}
            {activeTaskModal.dependency && (
              <div className="alert alert-warning py-2 px-3 small d-flex align-items-center gap-2 mb-3">
                <span>⚠️</span>
                <span><strong>Sequential Dependency:</strong> This task requires completion of prerequisite <strong>{activeTaskModal.dependency}</strong> before closing.</span>
              </div>
            )}

            {/* Checklist Section */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0">Fulfillment Checklist & Verification</h6>
                <span className="badge bg-secondary" style={{ fontSize: '0.7rem' }}>
                  {activeTaskModal.checklist?.filter(c => c.done).length || 0} / {activeTaskModal.checklist?.length || 0} Done
                </span>
              </div>
              <div className="list-group">
                {activeTaskModal.checklist?.map(chk => (
                  <label key={chk.id} className="list-group-item list-group-item-action d-flex align-items-center gap-2 small" style={{ cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      className="form-check-input mt-0"
                      checked={chk.done}
                      onChange={() => handleChecklistToggle(chk.id)}
                      disabled={currentSelectedReq.state === 'Pending Approval' || activeTaskModal.state === 'Closed Complete'}
                    />
                    <span className={chk.done ? 'text-decoration-line-through text-muted' : 'fw-medium'}>{chk.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center pt-2 border-top">
              <div className="small text-muted">SLA Status: <span className="fw-bold text-success">{activeTaskModal.slaStatus || 'Within SLA'}</span></div>
              <button className="btn btn-sm btn-primary px-4 fw-bold" onClick={() => setActiveTaskModal(null)}>Done</button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING NOW ASSIST AI VIRTUAL AGENT BOT */}
      <button className="ai-fab-launcher" onClick={() => setIsAiChatOpen(!isAiChatOpen)}>
        <span className="ai-pulse-dot"></span>
        <span>🤖 Now Assist AI</span>
      </button>

      {/* VIRTUAL AGENT INTERACTIVE CHAT WINDOW */}
      {isAiChatOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-primary text-white rounded-circle p-1 fw-bold text-center" style={{ width: '28px', height: '28px', lineHeight: '20px' }}>🤖</div>
              <div>
                <div className="fw-bold small">Now Assist Virtual Agent</div>
                <div className="text-success" style={{ fontSize: '0.65rem' }}>● Online • ServiceNow GenAI</div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-sm text-light p-0"
                style={{ fontSize: '0.75rem' }}
                title="Clear Chat"
                onClick={() => setAiMessages([
                  {
                    id: Date.now(),
                    sender: 'bot',
                    text: 'Chat history cleared. How may I assist you with your ServiceNow requests?',
                    time: 'Just now',
                    actions: [
                      { label: '🔍 Check Ravi Kumar', query: 'Status of Ravi Kumar' },
                      { label: '⏳ Check Approvals', query: 'Show pending approvals' }
                    ]
                  }
                ])}
              >
                🔄
              </button>
              <button className="btn btn-sm text-light p-0" onClick={() => setIsAiChatOpen(false)}>✕</button>
            </div>
          </div>

          <div className="ai-chat-body">
            {aiMessages.map(m => (
              <div key={m.id} className={`ai-msg ${m.sender === 'bot' ? 'ai-msg-bot' : 'ai-msg-user'}`}>
                <div style={{ whiteSpace: 'pre-line' }}>{m.text}</div>
                {m.actions && m.actions.length > 0 && (
                  <div className="mt-2 pt-1 border-top">
                    {m.actions.map((act, idx) => (
                      <span
                        key={idx}
                        className="ai-action-chip"
                        onClick={() => act.onClick ? act.onClick() : handleSendAiMessage(act.query)}
                      >
                        {act.label}
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-muted mt-1" style={{ fontSize: '0.65rem', textAlign: m.sender === 'bot' ? 'left' : 'right' }}>
                  {m.time}
                </div>
              </div>
            ))}
            {isAiTyping && (
              <div className="ai-typing-indicator">
                <span>🤖 Now Assist is analyzing tickets and policies...</span>
              </div>
            )}
            <div ref={aiChatEndRef} />
          </div>

          <form
            className="ai-chat-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendAiMessage();
            }}
          >
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Ask anything (e.g. status, approvals, policies)..."
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
            />
            <button type="submit" className="btn btn-sm btn-primary fw-bold px-3" disabled={!aiInput.trim()}>
              ➤
            </button>
          </form>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <div className="sidebar shadow">
        <div className="p-4 border-bottom border-secondary d-flex align-items-center gap-2">
          <div className="bg-primary text-white rounded p-1 fw-bold text-center" style={{ width: '28px', height: '28px', lineHeight: '20px' }}>SN</div>
          <span className="fw-bold fs-6 text-white" style={{ letterSpacing: '0.05em' }}>Enterprise Portal</span>
        </div>

        <div className="nav-header">Service Catalog</div>
        <div className={`nav-item ${view === 'catalog' ? 'active' : ''}`} onClick={() => { setView('catalog'); setSelectedReq(null); }}>📋 New Hire Onboarding</div>
        <div className={`nav-item ${view === 'hardware' ? 'active' : ''}`} onClick={() => { setView('hardware'); setSelectedReq(null); }}>💻 Hardware Request</div>
        <div className={`nav-item ${view === 'access' ? 'active' : ''}`} onClick={() => { setView('access'); setSelectedReq(null); }}>🔑 Access Request</div>

        <div className="nav-header mt-3">My Workspace</div>
        <div className={`nav-item ${view === 'dashboard' ? 'active' : ''}`} onClick={() => { setView('dashboard'); setSelectedReq(null); }}>📊 Dashboard & Reports</div>
        <div className={`nav-item ${view === 'approvals' ? 'active' : ''}`} onClick={() => { setView('approvals'); setSelectedReq(null); }}>
          ✔️ My Approvals <span className="badge bg-danger ms-auto">{myApprovals.length}</span>
        </div>
        <div className={`nav-item ${view === 'tasks' ? 'active' : ''}`} onClick={() => { setView('tasks'); setSelectedReq(null); }}>
          📝 My Tasks <span className="badge bg-primary ms-auto">{myTasks.filter(t => t.state !== 'Closed Complete').length}</span>
        </div>

        <div className="mt-auto p-4 border-top border-secondary">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div className="text-uppercase text-muted" style={{ fontSize: '0.65rem' }}>Logged in as</div>
            <span className="badge bg-secondary" style={{ fontSize: '0.65rem' }}>HRSD & ITSM</span>
          </div>
          <div className="fw-bold text-white fs-6 mb-2">Battula Anjali</div>
          <select className="form-select form-select-sm bg-dark text-white border-secondary mb-2" value={activeRole} onChange={(e) => setActiveRole(e.target.value)}>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button
            className="btn btn-xs btn-outline-secondary w-100 text-light py-1"
            style={{ fontSize: '0.7rem' }}
            onClick={() => {
              setRecords(INITIAL_RECORDS);
              showToast('Demo environment reset to baseline.');
            }}
          >
            🔄 Reset Demo Data
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="main-content">
        {/* TOPBAR */}
        <div className="topbar shadow-sm">
          <div className="fw-bold text-secondary">
            {view === 'catalog' ? 'Service Catalog > HR Services > Onboarding' :
             view === 'hardware' ? 'Service Catalog > Hardware Request' :
             view === 'access' ? 'Service Catalog > Access Request' :
             view === 'approvals' ? 'My Workspace > Approvals' :
             view === 'tasks' ? `My Workspace > Tasks (${activeRole})` :
             currentSelectedReq ? `Requested Items > ${currentSelectedReq.ritm} : ${currentSelectedReq.reqName}` : 'Dashboards > Overview'}
          </div>

          <div className="d-flex align-items-center gap-3">
            {/* Live Backend & Database Status Badge */}
            <div
              className="d-flex align-items-center gap-2 px-2 py-1 rounded-pill"
              style={{
                background: dbConnected ? '#dcfce7' : '#fee2e2',
                border: `1px solid ${dbConnected ? '#86efac' : '#fca5a5'}`
              }}
              title={dbConnected ? 'Backend running on Port 5001 with active database.json' : 'Backend offline, running on in-memory state'}
            >
              <span
                className="badge rounded-circle p-1"
                style={{
                  width: '8px',
                  height: '8px',
                  background: dbConnected ? '#16a34a' : '#dc2626'
                }}
              > </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: dbConnected ? '#166534' : '#991b1b' }}>
                {dbConnected ? '🟢 DB Connected (5001)' : '🔴 DB Offline'}
              </span>
            </div>

            <input
              type="text"
              className="form-control form-control-sm bg-light"
              placeholder="Global Search (RITM, Name, Dept)..."
              style={{ width: '260px', borderRadius: '15px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Notification Bell with Badge & Dropdown */}
            <div style={{ position: 'relative' }}>
              <div
                className="bg-light rounded-circle text-center border"
                style={{ width: '34px', height: '34px', lineHeight: '32px', cursor: 'pointer' }}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                🔔
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                    {notifications.filter(n => n.unread).length}
                  </span>
                )}
              </div>

              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
                    <span className="fw-bold small">Enterprise Notifications</span>
                    <button
                      className="btn btn-link btn-sm text-decoration-none p-0 text-primary"
                      style={{ fontSize: '0.75rem' }}
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                    >
                      Mark all read
                    </button>
                  </div>
                  <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        className={`notification-item ${n.unread ? 'unread' : ''}`}
                        onClick={() => {
                          const target = records.find(r => r.ritm === n.ritm);
                          if (target) {
                            setSelectedReq(target);
                            setView('dashboard');
                          }
                          setShowNotifications(false);
                        }}
                      >
                        <div className="fw-medium text-dark">{n.text}</div>
                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="content-area">

          {/* HARDWARE REQUEST VIEW */}
          {view === 'hardware' && (
            <div className="container-fluid mx-auto" style={{ maxWidth: '700px' }}>
              <div className="glass-panel p-5">
                <h3 className="fw-bold mb-1">Request IT Hardware</h3>
                <p className="text-muted mb-4 small">Submit a request for physical IT assets. Subject to manager approval.</p>
                <form onSubmit={submitHardware}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Select Hardware Item</label>
                    <select className="form-select" value={hardwareData.item} onChange={e => setHardwareData({ ...hardwareData, item: e.target.value })}>
                      <option>MacBook Pro M3</option>
                      <option>Dell Latitude 7440</option>
                      <option>External Monitor (27" 4K UHD)</option>
                      <option>Wireless Peripherals Kit</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label small fw-bold">Business Justification</label>
                    <textarea className="form-control" rows="3" required placeholder="Explain why this equipment is needed..." value={hardwareData.justification} onChange={e => setHardwareData({ ...hardwareData, justification: e.target.value })}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-bold">Submit Hardware Request</button>
                </form>
              </div>
            </div>
          )}

          {/* ACCESS REQUEST VIEW */}
          {view === 'access' && (
            <div className="container-fluid mx-auto" style={{ maxWidth: '700px' }}>
              <div className="glass-panel p-5">
                <h3 className="fw-bold mb-1">Request System Access</h3>
                <p className="text-muted mb-4 small">Request logical access to enterprise applications and databases.</p>
                <form onSubmit={submitAccess}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Select System</label>
                    <select className="form-select" value={accessData.system} onChange={e => setAccessData({ ...accessData, system: e.target.value })}>
                      <option>AWS Production</option>
                      <option>GitHub Enterprise</option>
                      <option>Salesforce CRM</option>
                      <option>Enterprise VPN</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label small fw-bold">Business Justification</label>
                    <textarea className="form-control" rows="3" required placeholder="Describe technical scope and role..." value={accessData.justification} onChange={e => setAccessData({ ...accessData, justification: e.target.value })}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-bold">Submit Access Request</button>
                </form>
              </div>
            </div>
          )}

          {/* MY APPROVALS VIEW */}
          {view === 'approvals' && (
            <div className="container-fluid">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="fw-bold mb-0">Pending Approvals</h3>
                  <span className="text-muted small">Requests requiring managerial sign-off before fulfillment tasks are triggered.</span>
                </div>
                <span className="badge bg-secondary">Viewing as: {activeRole}</span>
              </div>

              <div className="glass-panel overflow-hidden">
                <table className="table table-hover align-middle mb-0 bg-white" style={{ fontSize: '0.85rem' }}>
                  <thead className="bg-light text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                    <tr>
                      <th className="px-4 py-3">RITM Number</th>
                      <th>Request Details</th>
                      <th>Requested By</th>
                      <th>Department</th>
                      <th>State</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myApprovals.length === 0 ? (
                      <tr><td colSpan="6" className="text-center py-4 text-muted">No approvals required at this time.</td></tr>
                    ) : myApprovals.map(req => (
                      <tr key={req.ritm}>
                        <td className="px-4 py-3 text-primary fw-bold" style={{ cursor: 'pointer' }} onClick={() => { setSelectedReq(req); setView('dashboard'); }}>
                          {req.ritm}
                        </td>
                        <td className="fw-medium text-dark">{req.reqName}</td>
                        <td>{req.requestedBy}</td>
                        <td><span className="badge bg-light text-dark border">{req.department}</span></td>
                        <td><span className={`status-badge ${getBadge(req.state)}`}>{req.state}</span></td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-success fw-bold px-3" onClick={() => approveRequest(req.ritm)}>Approve</button>
                            <button className="btn btn-sm btn-outline-danger fw-bold" onClick={() => { setSelectedReq(req); setShowRejectModal(true); }}>Reject</button>
                          </div>
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
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="fw-bold mb-0">My Group Tasks ({activeRole})</h3>
                  <span className="text-muted small">Catalog Fulfillment Tasks (SCTASKs) currently assigned to your team.</span>
                </div>
                <span className="badge bg-primary px-3 py-2">Open Tasks: {myTasks.filter(t => t.state !== 'Closed Complete').length}</span>
              </div>

              <div className="glass-panel overflow-hidden">
                <table className="table table-hover align-middle mb-0 bg-white" style={{ fontSize: '0.85rem' }}>
                  <thead className="bg-light text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                    <tr>
                      <th className="px-4 py-3">Task Number</th>
                      <th>Parent RITM</th>
                      <th>Short Description</th>
                      <th>Assigned To</th>
                      <th>SLA Health</th>
                      <th>State</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myTasks.length === 0 ? (
                      <tr><td colSpan="7" className="text-center py-4 text-muted">No active tasks assigned to your group.</td></tr>
                    ) : myTasks.map(task => (
                      <tr key={task.id}>
                        <td className="px-4 py-3 text-primary fw-bold" style={{ cursor: 'pointer' }} onClick={() => {
                          const parent = records.find(r => r.ritm === task.parentRitm);
                          if (parent) setSelectedReq(parent);
                          setActiveTaskModal(task);
                        }}>
                          {task.id} 🔍
                        </td>
                        <td>
                          <strong className="text-dark">{task.parentRitm}</strong><br />
                          <span className="text-muted small">{task.parentReq}</span>
                        </td>
                        <td className="fw-medium text-dark">{task.shortDesc}</td>
                        <td><span className="badge bg-light text-secondary border">{task.assignedTo || 'Unassigned'}</span></td>
                        <td>
                          <span className={`badge ${task.slaStatus === 'Met' ? 'bg-success' : task.slaStatus === 'Within SLA' ? 'bg-primary' : 'bg-warning text-dark'}`}>
                            {task.slaStatus || 'Within SLA'}
                          </span>
                        </td>
                        <td><span className={`status-badge ${getBadge(task.state)}`}>{task.state}</span></td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <select
                              className="form-select form-select-sm w-auto"
                              value={task.state}
                              onChange={(e) => updateScTask(task.id, e.target.value, task.parentRitm)}
                              disabled={task.parentState === 'Pending Approval' || task.state === 'Closed Complete'}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Open">Open</option>
                              <option value="Work in Progress">Work in Progress</option>
                              <option value="Closed Complete">Closed Complete</option>
                            </select>
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              title="Open Checklist & Notes"
                              onClick={() => {
                                const parent = records.find(r => r.ritm === task.parentRitm);
                                if (parent) setSelectedReq(parent);
                                setActiveTaskModal(task);
                              }}
                            >
                              📋
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

          {/* MULTI-STEP CATALOG WIZARD */}
          {view === 'catalog' && (
            <div className="container-fluid mx-auto" style={{ maxWidth: '920px' }}>
              <div className="glass-panel p-5">
                <h3 className="fw-bold mb-1">Employee Onboarding Request</h3>
                <p className="text-muted mb-4 small">Submit this form to trigger the automated cross-departmental onboarding workflow.</p>
                <div className="wizard-steps">
                  <div className={`step-item ${formStep >= 1 ? (formStep === 1 ? 'active' : 'completed') : ''}`}>1. Profile</div>
                  <div className={`step-item ${formStep >= 2 ? (formStep === 2 ? 'active' : 'completed') : ''}`}>2. Identity & Access</div>
                  <div className={`step-item ${formStep >= 3 ? 'active' : ''}`}>3. Review</div>
                </div>

                {/* STEP 1: PROFILE */}
                {formStep === 1 && (
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">New Hire Full Name *</label>
                      <input type="text" className="form-control" placeholder="e.g. Maya Chen" value={formData.hireName} onChange={e => setFormData({ ...formData, hireName: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Job Title *</label>
                      <input type="text" className="form-control" placeholder="e.g. Senior Frontend Engineer" value={formData.jobTitle} onChange={e => setFormData({ ...formData, jobTitle: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Start Date *</label>
                      <input type="date" className="form-control" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Department</label>
                      <select
                        className="form-select"
                        value={formData.department}
                        onChange={e => {
                          const dept = e.target.value;
                          const cc = dept === 'Information Technology' ? 'CC-4092 (IT Ops)' : dept === 'Human Resources' ? 'CC-1020 (HR)' : 'CC-3021 (Sales)';
                          setFormData({ ...formData, department: dept, costCenter: cc });
                        }}
                      >
                        <option>Information Technology</option>
                        <option>Human Resources</option>
                        <option>Sales</option>
                        <option>Marketing</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Work Model</label>
                      <select className="form-select" value={formData.workModel} onChange={e => setFormData({ ...formData, workModel: e.target.value })}>
                        <option>Hybrid (San Francisco HQ)</option>
                        <option>Remote (US Domestic)</option>
                        <option>On-site (Austin Technology Hub)</option>
                        <option>Hybrid (London Office)</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Employment Type</label>
                      <select className="form-select" value={formData.employmentType} onChange={e => setFormData({ ...formData, employmentType: e.target.value })}>
                        <option>Full-Time (FTE)</option>
                        <option>Contractor (C2C)</option>
                        <option>Intern / Co-Op</option>
                      </select>
                    </div>

                    {/* Auto-generated Preview */}
                    <div className="col-12">
                      <div className="p-3 bg-light rounded border d-flex justify-content-between align-items-center">
                        <div className="small text-muted">
                          <strong>Automated Identity Preview:</strong> Corporate Email: <span className="text-primary fw-bold">{generatedEmail}</span> | Cost Center: <span className="fw-bold">{formData.costCenter}</span>
                        </div>
                        <span className="badge bg-success">{generatedEmpId}</span>
                      </div>
                    </div>

                    <div className="col-12 text-end mt-4">
                      <button className="btn btn-primary px-4 fw-bold" onClick={() => setFormStep(2)} disabled={!formData.hireName || !formData.startDate}>
                        Next Step →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: IDENTITY & ACCESS */}
                {formStep === 2 && (
                  <div className="row g-4">
                    <div className="col-12">
                      <label className="form-label small fw-bold">Hardware Provisioning Profile</label>
                      <select className="form-select" value={formData.hardwareProfile} onChange={e => setFormData({ ...formData, hardwareProfile: e.target.value })}>
                        <option>Developer Workstation (MacBook Pro M3 Max - 64GB)</option>
                        <option>Standard Laptop (Dell Latitude 7440 - 16GB)</option>
                        <option>Executive Ultrabook (Lenovo ThinkPad X1 Carbon)</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold mb-2">Hardware Peripherals & Accessories</label>
                      <div className="d-flex flex-wrap gap-2">
                        {['External Monitor (27" 4K)', 'Ergonomic Keyboard & Mouse', 'Jabra Noise-Canceling Headset', 'USB-C Docking Station'].map(item => (
                          <div className="form-check form-check-inline border rounded px-3 py-2 bg-white" key={item}>
                            <input className="form-check-input" type="checkbox" checked={formData.peripherals.includes(item)} onChange={() => handlePeripheralToggle(item)} />
                            <label className="form-check-label small fw-medium ms-1">{item}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-bold mb-2">Enterprise Software & System Permissions</label>
                      <div className="d-flex flex-wrap gap-3">
                        {['ServiceNow', 'AWS Production', 'GitHub Enterprise', 'Jira / Confluence', 'Salesforce CRM', 'Figma Enterprise', 'Slack'].map(app => (
                          <div className="form-check form-check-inline border rounded px-3 py-2 bg-white" key={app}>
                            <input className="form-check-input" type="checkbox" checked={formData.softwareAccess.includes(app)} onChange={() => handleSoftwareToggle(app)} />
                            <label className="form-check-label small fw-medium ms-1">{app}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Facility Security Badge Clearance</label>
                      <select className="form-select" value={formData.securityClearance} onChange={e => setFormData({ ...formData, securityClearance: e.target.value })}>
                        <option>Level 1 (General Office & Amenities)</option>
                        <option>Level 2 (Server Room & Prod VPC)</option>
                        <option>Level 3 (Mission-Critical Datacenter)</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Equipment Shipping Address (For Remote)</label>
                      <input type="text" className="form-control" placeholder="123 Tech Blvd, Austin, TX" value={formData.shippingAddress} onChange={e => setFormData({ ...formData, shippingAddress: e.target.value })} />
                    </div>

                    <div className="col-12 d-flex justify-content-between mt-4">
                      <button className="btn btn-outline-secondary px-4 fw-bold" onClick={() => setFormStep(1)}>← Back</button>
                      <button className="btn btn-primary px-4 fw-bold" onClick={() => setFormStep(3)}>Review Configuration →</button>
                    </div>
                  </div>
                )}

                {/* STEP 3: REVIEW & ORDER */}
                {formStep === 3 && (
                  <div>
                    <div className="bg-light p-4 rounded border mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Order Summary & Automated Fulfillment Preview</h5>
                        <span className="badge bg-primary">Auto-Workflow Triggered</span>
                      </div>
                      <div className="row g-3 small">
                        <div className="col-md-4"><strong>New Hire:</strong> {formData.hireName}</div>
                        <div className="col-md-4"><strong>Job Title:</strong> {formData.jobTitle}</div>
                        <div className="col-md-4"><strong>Department:</strong> {formData.department}</div>
                        <div className="col-md-4"><strong>Start Date:</strong> {formData.startDate}</div>
                        <div className="col-md-4"><strong>Corporate Email:</strong> {generatedEmail}</div>
                        <div className="col-md-4"><strong>Employee ID:</strong> {generatedEmpId}</div>
                        <div className="col-md-6"><strong>Hardware Profile:</strong> {formData.hardwareProfile}</div>
                        <div className="col-md-6"><strong>Peripherals:</strong> {formData.peripherals.join(', ') || 'None'}</div>
                        <div className="col-12"><strong>Software Access:</strong> {formData.softwareAccess.join(', ') || 'None'}</div>
                      </div>
                    </div>

                    <div className="alert alert-info py-2 px-3 small mb-4">
                      ℹ️ <strong>ServiceNow Flow Designer will automatically create:</strong><br />
                      • 1 Approval Record for Hiring Manager ({formData.manager})<br />
                      • 1 HR Verification Task (SCTASK) for Form I-9 & Tax compliance<br />
                      • 1 IT Fulfillment Task (SCTASK) for AD Account & Hardware Dispatch
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

          {/* DASHBOARD VIEW */}
          {view === 'dashboard' && !currentSelectedReq && (
            <div className="container-fluid">
              {/* NOW ASSIST PROACTIVE AI ADVISOR BANNER */}
              {showAiBanner && (
                <div className="alert alert-primary border-primary d-flex align-items-center justify-content-between p-3 mb-4 rounded shadow-sm bg-white">
                  <div className="d-flex align-items-center gap-3">
                    <span className="fs-4">✨</span>
                    <div>
                      <div className="fw-bold text-primary small">Now Assist AI Proactive Advisor</div>
                      <div className="text-secondary small">
                        <strong>RITM0010043 (Sneha Reddy)</strong> has been pending manager approval for 48 hours. Suggest approving today to prevent hardware dispatch delay.
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-primary fw-bold"
                      onClick={() => {
                        const target = records.find(r => r.ritm === 'RITM0010043');
                        if (target) setSelectedReq(target);
                      }}
                    >
                      Review RITM0010043
                    </button>
                    <button className="btn btn-sm btn-link text-muted p-0 ms-2" onClick={() => setShowAiBanner(false)}>✕</button>
                  </div>
                </div>
              )}

              {/* TOP METRIC CARDS */}
              <div className="row g-4 mb-4">
                <div className="col-md-3" style={{ cursor: 'pointer' }} onClick={() => { setStateFilter('All'); setTypeFilter('All'); }}>
                  <div className="glass-panel p-4 border-top border-4 border-secondary">
                    <div className="text-muted small fw-bold text-uppercase">Total Records</div>
                    <div className="fs-2 fw-bold">{metrics.total}</div>
                  </div>
                </div>
                <div className="col-md-3" style={{ cursor: 'pointer' }} onClick={() => setStateFilter('Pending Approval')}>
                  <div className="glass-panel p-4 border-top border-4 border-warning">
                    <div className="text-muted small fw-bold text-uppercase">Pending Approval</div>
                    <div className="fs-2 fw-bold">{metrics.pending}</div>
                  </div>
                </div>
                <div className="col-md-3" style={{ cursor: 'pointer' }} onClick={() => setStateFilter('Work in Progress')}>
                  <div className="glass-panel p-4 border-top border-4 border-primary">
                    <div className="text-muted small fw-bold text-uppercase">Active Fulfillment</div>
                    <div className="fs-2 fw-bold">{metrics.active}</div>
                  </div>
                </div>
                <div className="col-md-3" style={{ cursor: 'pointer' }} onClick={() => setStateFilter('Closed Complete')}>
                  <div className="glass-panel p-4 border-top border-4 border-success">
                    <div className="text-muted small fw-bold text-uppercase">Closed Complete</div>
                    <div className="fs-2 fw-bold">{metrics.completed}</div>
                  </div>
                </div>
              </div>

              {/* RITM LIST WITH ADVANCED FILTERS */}
              <div className="glass-panel overflow-hidden">
                <div className="p-3 border-bottom bg-white d-flex flex-wrap justify-content-between align-items-center gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <h6 className="mb-0 fw-bold">Requested Items (RITM) List</h6>
                    <span className="badge bg-light text-dark border">{filteredRecords.length} records</span>
                  </div>

                  <div className="d-flex flex-wrap align-items-center gap-2">
                    {/* Type Filter */}
                    <select className="form-select form-select-sm w-auto" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                      <option value="All">All Types</option>
                      <option value="Onboarding">Onboarding</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Access">Access</option>
                    </select>

                    {/* State Filter */}
                    <select className="form-select form-select-sm w-auto" value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
                      <option value="All">All States</option>
                      <option value="Pending Approval">Pending Approval</option>
                      <option value="Work in Progress">Work in Progress</option>
                      <option value="Closed Complete">Closed Complete</option>
                      <option value="Closed Rejected">Closed Rejected</option>
                    </select>

                    {/* Quick Search */}
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={{ width: '180px' }}
                      placeholder="Search RITMs..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />

                    {/* Export to CSV Button */}
                    <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1" onClick={handleExportCSV} title="Export current list to CSV">
                      <span>📥</span> Export
                    </button>
                  </div>
                </div>

                <table className="table table-hover align-middle mb-0 bg-white" style={{ fontSize: '0.85rem' }}>
                  <thead className="bg-light text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                    <tr>
                      <th className="px-4 py-3">Number</th>
                      <th>Item</th>
                      <th>Type</th>
                      <th>Department</th>
                      <th>Priority</th>
                      <th>State</th>
                      <th>Stage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.length === 0 ? (
                      <tr><td colSpan="7" className="text-center py-4 text-muted">No records match the current filter criteria.</td></tr>
                    ) : (
                      filteredRecords.map(req => (
                        <tr key={req.ritm} style={{ cursor: 'pointer' }} onClick={() => setSelectedReq(req)}>
                          <td className="px-4 py-3 text-primary fw-bold">{req.ritm}</td>
                          <td className="fw-medium text-dark">{req.reqName}</td>
                          <td><span className="badge bg-light text-dark border">{req.type}</span></td>
                          <td>{req.department || 'N/A'}</td>
                          <td><span className={getPriorityBadge(req.priority)}>{req.priority || '3 - Moderate'}</span></td>
                          <td><span className={`status-badge ${getBadge(req.state)}`}>{req.state}</span></td>
                          <td><span className="text-secondary fw-medium">{req.stage}</span></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* RITM DETAIL VIEW (RICH SERVICENOW FORM INTERFACE) */}
          {view === 'dashboard' && currentSelectedReq && (
            <div className="container-fluid">
              {/* Back & Top Actions Bar */}
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <button className="btn btn-sm btn-white border shadow-sm fw-bold" onClick={() => setSelectedReq(null)}>
                  ← Back to List
                </button>
                <div className="d-flex align-items-center gap-2">
                  {/* GenAI Copilot Actions */}
                  <button
                    className="btn btn-sm btn-outline-primary fw-bold d-flex align-items-center gap-1 shadow-sm"
                    onClick={handleGenerateAiSummary}
                    disabled={isGeneratingAiSummary}
                  >
                    <span>✨</span> {isGeneratingAiSummary ? 'Analyzing with AI...' : 'Now Assist Summary'}
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary fw-bold d-flex align-items-center gap-1 shadow-sm"
                    onClick={handleAiDraftCustomerUpdate}
                  >
                    <span>💬</span> AI Draft Update
                  </button>

                  {currentSelectedReq.state === 'Pending Approval' && (
                    <>
                      <button className="btn btn-sm btn-success fw-bold px-4" onClick={() => approveRequest(currentSelectedReq.ritm)}>
                        ✓ Approve Request
                      </button>
                      <button className="btn btn-sm btn-outline-danger fw-bold px-3" onClick={() => setShowRejectModal(true)}>
                        ✕ Reject
                      </button>
                    </>
                  )}
                  {activeRole === 'System Admin' && (
                    <button className="btn btn-sm btn-primary fw-bold" onClick={() => setShowAddTaskModal(true)}>
                      + Add Task
                    </button>
                  )}
                </div>
              </div>

              {/* In-Ticket AI Summary Box */}
              {aiSummary && (
                <div className="p-3 mb-3 rounded bg-white border border-primary shadow-sm small">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <span className="fs-5">✨</span>
                      <strong className="text-primary">Now Assist Generative Case Brief</strong>
                      <span className="badge bg-light text-primary border">Now Assist GenAI</span>
                    </div>
                    <button className="btn btn-sm btn-link text-muted p-0" onClick={() => setAiSummary(null)}>✕</button>
                  </div>
                  <div className="mb-2"><strong>Executive Digest:</strong> {aiSummary.executiveDigest}</div>
                  <div className="mb-2"><strong>Fulfillment Blocker:</strong> {aiSummary.keyBlocker}</div>
                  <div className="mb-2"><strong>SLA Health:</strong> {aiSummary.slaRiskAssessment}</div>
                  <div className="p-2 bg-light rounded text-dark">
                    <strong>Recommended Next Action:</strong> {aiSummary.recommendedAction}
                  </div>
                </div>
              )}

              {/* RITM Header Summary Card */}
              <div className="glass-panel p-4 mb-3 bg-white">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="badge bg-primary">{currentSelectedReq.type}</span>
                      <h4 className="fw-bold mb-0">{currentSelectedReq.ritm} : {currentSelectedReq.reqName}</h4>
                      <span className={getPriorityBadge(currentSelectedReq.priority)}>{currentSelectedReq.priority || '2 - High'}</span>
                    </div>
                    <div className="text-muted small">
                      Requested by <strong>{currentSelectedReq.requestedBy}</strong> on {currentSelectedReq.date} | Cost Center: {currentSelectedReq.costCenter}
                    </div>
                  </div>
                  <div className="text-end">
                    <span className={`status-badge ${getBadge(currentSelectedReq.state)} mb-1`}>{currentSelectedReq.state}</span>
                    <div className="small text-muted fw-bold text-uppercase">Stage: {currentSelectedReq.stage}</div>
                  </div>
                </div>

                {/* ServiceNow Visual Process Stage Chevron Flow Bar */}
                <div className="stage-chevron-container">
                  {getWorkflowStages(currentSelectedReq).map((st, i) => (
                    <div key={i} className={`stage-chevron ${st.status}`}>
                      <div className="fw-bold">{st.name}</div>
                      <div style={{ fontSize: '0.65rem' }}>{st.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multi-Tab Navigation for RITM Form */}
              <ul className="nav nav-tabs border-bottom mb-3" style={{ gap: '5px' }}>
                <li className="nav-item">
                  <button
                    className={`nav-link border-0 fw-bold rounded-top ${activeTab === 'sctasks' ? 'active bg-white text-primary border border-bottom-0 shadow-sm' : 'text-secondary'}`}
                    onClick={() => setActiveTab('sctasks')}
                  >
                    Catalog Tasks (SCTASK) <span className="badge bg-secondary ms-1">{currentSelectedReq.tasks.length}</span>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link border-0 fw-bold rounded-top ${activeTab === 'variables' ? 'active bg-white text-primary border border-bottom-0 shadow-sm' : 'text-secondary'}`}
                    onClick={() => setActiveTab('variables')}
                  >
                    Variables & Payload
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link border-0 fw-bold rounded-top ${activeTab === 'workflow' ? 'active bg-white text-primary border border-bottom-0 shadow-sm' : 'text-secondary'}`}
                    onClick={() => setActiveTab('workflow')}
                  >
                    Flow Designer (Visual)
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link border-0 fw-bold rounded-top ${activeTab === 'sla' ? 'active bg-white text-primary border border-bottom-0 shadow-sm' : 'text-secondary'}`}
                    onClick={() => setActiveTab('sla')}
                  >
                    Task SLAs <span className="badge bg-secondary ms-1">{currentSelectedReq.slas?.length || 0}</span>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link border-0 fw-bold rounded-top ${activeTab === 'activity' ? 'active bg-white text-primary border border-bottom-0 shadow-sm' : 'text-secondary'}`}
                    onClick={() => setActiveTab('activity')}
                  >
                    Activity & Work Notes <span className="badge bg-secondary ms-1">{currentSelectedReq.activityStream?.length || 0}</span>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link border-0 fw-bold rounded-top ${activeTab === 'assets' ? 'active bg-white text-primary border border-bottom-0 shadow-sm' : 'text-secondary'}`}
                    onClick={() => setActiveTab('assets')}
                  >
                    Linked CIs & Assets
                  </button>
                </li>
              </ul>

              {/* TAB 1: CATALOG TASKS */}
              {activeTab === 'sctasks' && (
                <div className="glass-panel bg-white overflow-hidden">
                  <table className="table align-middle mb-0" style={{ fontSize: '0.85rem' }}>
                    <thead className="bg-light text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>
                      <tr>
                        <th className="px-4 py-3">Task Number</th>
                        <th>Short Description</th>
                        <th>Assignment Group</th>
                        <th>Assigned To</th>
                        <th>Priority</th>
                        <th>State</th>
                        <th>Update Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSelectedReq.tasks.map(task => (
                        <tr key={task.id}>
                          <td
                            className="px-4 py-3 text-primary fw-bold"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setActiveTaskModal(task)}
                            title="Click to view checklist & edit task"
                          >
                            {task.id} 🔍
                          </td>
                          <td className="fw-medium">
                            {task.shortDesc}
                            {task.dependency && (
                              <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                                ↳ Depends on: <strong>{task.dependency}</strong>
                              </div>
                            )}
                          </td>
                          <td><span className="badge bg-secondary">{task.group}</span></td>
                          <td><span className="badge bg-light text-dark border">{task.assignedTo || 'Unassigned'}</span></td>
                          <td><span className={getPriorityBadge(task.priority)}>{task.priority || '2 - High'}</span></td>
                          <td><span className={`status-badge ${getBadge(task.state)}`}>{task.state}</span></td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <select
                                className="form-select form-select-sm w-auto"
                                value={task.state}
                                onChange={(e) => updateScTask(task.id, e.target.value, currentSelectedReq.ritm)}
                                disabled={currentSelectedReq.state === 'Pending Approval' || task.state === 'Closed Complete'}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Open">Open</option>
                                <option value="Work in Progress">Work in Progress</option>
                                <option value="Closed Complete">Closed Complete</option>
                              </select>
                              <button className="btn btn-sm btn-outline-secondary" onClick={() => setActiveTaskModal(task)}>
                                Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {currentSelectedReq.tasks.length === 0 && (
                        <tr><td colSpan="7" className="text-center py-4 text-muted">No tasks generated yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 2: VARIABLES & FORM PAYLOAD */}
              {activeTab === 'variables' && (
                <div className="glass-panel p-4 bg-white">
                  <h6 className="fw-bold mb-3">ServiceNow Catalog Item Variables</h6>
                  <div className="row g-4 small">
                    {currentSelectedReq.variables ? (
                      Object.entries(currentSelectedReq.variables).map(([key, val]) => (
                        <div key={key} className="col-md-4">
                          <div className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.7rem' }}>
                            {key.replace(/([A-Z])/g, ' $1')}
                          </div>
                          <div className="fw-semibold text-dark mt-1">
                            {Array.isArray(val) ? val.join(', ') : String(val)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12 text-muted">No catalog variables recorded.</div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: VISUAL FLOW DESIGNER */}
              {activeTab === 'workflow' && (
                <div className="glass-panel p-4 bg-white">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">Flow Designer: Cross-Departmental Onboarding Execution</h6>
                    <span className="badge bg-success">Engine: Flow Designer V2</span>
                  </div>
                  <div className="flow-node">
                    <span className="fs-5">🟢</span>
                    <div className="flex-grow-1">
                      <div className="fw-bold small">Trigger: Catalog Order Submitted</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>Evaluated criteria: Department = {currentSelectedReq.department} | Initiated by {currentSelectedReq.requestedBy}</div>
                    </div>
                    <span className="badge bg-success">Success</span>
                  </div>
                  <div className="flow-node">
                    <span className="fs-5">{currentSelectedReq.state === 'Pending Approval' ? '🟡' : currentSelectedReq.state === 'Closed Rejected' ? '🔴' : '🟢'}</span>
                    <div className="flex-grow-1">
                      <div className="fw-bold small">Action: Ask for Approval (Hiring Manager)</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>Rule: Manager approval required for hardware procurement and cloud account creation.</div>
                    </div>
                    <span className={`badge ${currentSelectedReq.state === 'Pending Approval' ? 'bg-warning text-dark' : currentSelectedReq.state === 'Closed Rejected' ? 'bg-danger' : 'bg-success'}`}>
                      {currentSelectedReq.state === 'Pending Approval' ? 'Waiting' : currentSelectedReq.state === 'Closed Rejected' ? 'Rejected' : 'Approved'}
                    </span>
                  </div>
                  <div className="flow-node">
                    <span className="fs-5">{currentSelectedReq.state === 'Pending Approval' ? '⚪' : '🟢'}</span>
                    <div className="flex-grow-1">
                      <div className="fw-bold small">Action: Parallel Branch - Create Catalog Tasks</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>Created HR Compliance SCTASK and IT Hardware Provisioning SCTASK.</div>
                    </div>
                    <span className="badge bg-secondary">Executed</span>
                  </div>
                  <div className="flow-node">
                    <span className="fs-5">{currentSelectedReq.state === 'Closed Complete' ? '🟢' : '⚪'}</span>
                    <div className="flex-grow-1">
                      <div className="fw-bold small">Closure: Send Day 1 Welcome Email & Close RITM</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>Triggered automatically when all child SCTASKs reach Closed Complete state.</div>
                    </div>
                    <span className={`badge ${currentSelectedReq.state === 'Closed Complete' ? 'bg-success' : 'bg-light text-dark border'}`}>
                      {currentSelectedReq.state === 'Closed Complete' ? 'Completed' : 'Pending Tasks'}
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 4: TASK SLAS */}
              {activeTab === 'sla' && (
                <div className="glass-panel p-4 bg-white">
                  <h6 className="fw-bold mb-3">Service Level Agreements (SLAs)</h6>
                  <table className="table align-middle mb-0" style={{ fontSize: '0.85rem' }}>
                    <thead className="bg-light text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>
                      <tr>
                        <th>SLA Definition</th>
                        <th>Target Duration</th>
                        <th>Elapsed %</th>
                        <th>Time Remaining</th>
                        <th>Breached?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSelectedReq.slas?.map(sla => (
                        <tr key={sla.id}>
                          <td className="fw-bold text-dark">{sla.name}</td>
                          <td>{sla.target}</td>
                          <td style={{ width: '220px' }}>
                            <div className="d-flex align-items-center gap-2">
                              <div className="progress flex-grow-1" style={{ height: '8px' }}>
                                <div
                                  className={`progress-bar ${sla.elapsed > 75 ? 'bg-warning' : sla.elapsed === 100 ? 'bg-success' : 'bg-primary'}`}
                                  style={{ width: `${sla.elapsed}%` }}
                                ></div>
                              </div>
                              <span className="small text-muted">{sla.elapsed}%</span>
                            </div>
                          </td>
                          <td className="small">{sla.timeRemaining}</td>
                          <td>
                            <span className={`badge ${sla.breached ? 'bg-danger' : 'bg-success'}`}>
                              {sla.breached ? 'Breached' : 'Within SLA'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 5: ACTIVITY STREAM & WORK NOTES */}
              {activeTab === 'activity' && (
                <div className="glass-panel p-4 bg-white">
                  <h6 className="fw-bold mb-3">Activity Stream & Work Notes (Audit History)</h6>

                  {/* Comment Composer */}
                  <form onSubmit={handlePostNote} className="mb-4 p-3 bg-light rounded border">
                    <div className="d-flex gap-3 mb-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="noteTypeRadio"
                          id="radioWorkNote"
                          checked={noteType === 'work_note'}
                          onChange={() => setNoteType('work_note')}
                        />
                        <label className="form-check-label small fw-bold text-warning" htmlFor="radioWorkNote">
                          🟡 Work Notes (Internal Only)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="noteTypeRadio"
                          id="radioComment"
                          checked={noteType === 'comment'}
                          onChange={() => setNoteType('comment')}
                        />
                        <label className="form-check-label small fw-bold text-primary" htmlFor="radioComment">
                          🔵 Additional Comments (Customer Visible)
                        </label>
                      </div>
                    </div>
                    <textarea
                      className="form-control mb-2"
                      rows="2"
                      placeholder={noteType === 'work_note' ? 'Enter internal technical updates or fulfiller notes...' : 'Enter message visible to requester...'}
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                    ></textarea>
                    <div className="text-end">
                      <button type="submit" className="btn btn-sm btn-primary fw-bold px-3" disabled={!noteText.trim()}>
                        Post {noteType === 'work_note' ? 'Work Note' : 'Comment'}
                      </button>
                    </div>
                  </form>

                  {/* Activity Timeline List */}
                  <div className="timeline">
                    {currentSelectedReq.activityStream?.map(act => (
                      <div
                        key={act.id}
                        className={`activity-bubble ${act.type === 'work_note' ? 'activity-work-note' : act.type === 'comment' ? 'activity-comment' : 'activity-system'}`}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <strong>{act.author}</strong>
                          <span className="text-muted" style={{ fontSize: '0.7rem' }}>{act.time}</span>
                        </div>
                        <div>{act.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: LINKED CIS & ASSETS */}
              {activeTab === 'assets' && (
                <div className="glass-panel p-4 bg-white">
                  <h6 className="fw-bold mb-3">ServiceNow CMDB Configuration Items (CIs) Linked</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="p-3 border rounded bg-light">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <strong className="text-dark">💻 Hardware CI: Computer</strong>
                          <span className="badge bg-success">In Stock / Assigned</span>
                        </div>
                        <div className="small text-muted">
                          Asset Tag: <strong>{currentSelectedReq.variables?.assetTag || 'AST-40921'}</strong><br />
                          Serial Number: <strong>{currentSelectedReq.variables?.serialNumber || 'SN-APL-88219'}</strong><br />
                          Model: <strong>{currentSelectedReq.variables?.hardwareProfile || 'Enterprise Workstation'}</strong><br />
                          MDM Agent: <strong>Enrolled & Encrypted (FileVault)</strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-3 border rounded bg-light">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <strong className="text-dark">🔑 Identity CI: Okta / Active Directory</strong>
                          <span className="badge bg-primary">Active Directory</span>
                        </div>
                        <div className="small text-muted">
                          Email: <strong>{currentSelectedReq.variables?.corporateEmail || 'user@enterprise.com'}</strong><br />
                          Employee ID: <strong>{currentSelectedReq.variables?.employeeId || 'EMP-9042'}</strong><br />
                          Security Clearance: <strong>{currentSelectedReq.variables?.securityClearance || 'Level 1'}</strong><br />
                          MFA Enforcement: <strong>FIDO2 WebAuthn & Okta Verify</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </>
  );
}
