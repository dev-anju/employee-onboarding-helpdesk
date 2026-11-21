Employee Onboarding Helpdesk
Employee Onboarding Automation using ServiceNow  |  Internship project
Battula Anjali (160124737004)  |  Guide: E. Ramalakshmi, Assistant Professor, Department of Information Technology, CBIT (A), Hyderabad
Repository: https://github.com/dev-anju/employee-onboarding-helpdesk
1. Overview
A web application that replaces email-and-spreadsheet onboarding with one tracked workflow. A manager submits a single new-hire request; it passes an approval gate and then creates linked HR and IT tasks, with SLA tracking, an activity trail and a live dashboard. The UI follows ServiceNow concepts (Service Catalog, RITM, SCTASK, SLAs, Flow Designer view) and runs as a React front end with a small Express REST API.
2. Key features
Catalog forms: 3-step new-hire wizard, plus hardware and system-access requests.
Approval gate: Hiring Manager or System Admin approves or rejects; tasks stay Pending until approved.
Automated tasks: HR verification and IT provisioning tasks are created automatically; IT cannot close before HR (dependency guard).
Auto-closure: the request closes when every task is Closed Complete.
Dashboard: live counts, filters, search, SLA health, notification centre, activity stream.
Now Assist (simulated): rule-based case summary, drafted customer update and chat assistant (no external AI service).
3. Tech stack
Layer
Technology (from package.json)
Front end
React ^19.3, Bootstrap ^5.3, Vite ^8.3 (@vitejs/plugin-react)
Back end
Node.js (ES modules), Express ^4.22, cors ^2.8
Storage
Flat JSON file: database.json (read and written with the fs module)
Tooling
Oxlint ^1.89 for linting; npm scripts: dev, server, build, lint, preview


4. System requirements
Item
Minimum
Recommended
Operating system
Windows 10, macOS 12 or a recent Linux
Windows 11, latest macOS or Ubuntu LTS
Node.js
Current LTS release (Vite 8 needs a modern Node; older versions will fail)
Latest LTS, with the npm that ships with it
Git
Any recent version, to clone the repo
Latest stable
Browser
Current Chrome, Edge, Firefox or Safari
Chrome or Edge (latest)
Hardware
2 cores, 4 GB RAM, about 500 MB free disk (node_modules)
4+ cores, 8 GB RAM
Network ports
5001 (API) and the Vite dev port (5173 by default) free on localhost
Same
Internet
Needed once, for git clone and npm install
Not needed afterwards


Hardware figures are typical for a Vite + React project, not measured limits.




5. Installation and running
git clone https://github.com/dev-anju/employee-onboarding-helpdesk.git
cd employee-onboarding-helpdesk
npm install


Run the API and the front end in two separate terminals, both from the project folder:
# Terminal 1: API on http://localhost:5001
npm run server

# Terminal 2: web app (Vite prints the URL, normally http://localhost:5173)
npm run dev


Open the URL Vite prints. When the API is reachable, the top bar shows a green "DB Connected (5001)" badge. Other scripts: npm run build (production bundle), npm run preview, npm run lint.
6. Quick start and roles
Switch role from the drop-down in the sidebar: System Admin, Hiring Manager, HR Support, IT Fulfillment. HR and IT see only their own task queue; Admin sees all.
Create a hire: New Hire Onboarding, complete the 3 steps, submit. A RITM and two SCTASKs are created (Pending Approval).
Approve and fulfil: open the request, Approve (as Admin or Hiring Manager), then update tasks. Closing all tasks closes the request.
Start over: Reset Demo Data in the sidebar restores the sample records.
7. Project structure
server.js           Express REST API (port 5001) and seed data
database.json       Persistent data store (created and updated by the API)
src/App.jsx         Whole React UI: views, state, role logic, Now Assist
src/main.jsx        React entry point;  src/*.css  styles
index.html, vite.config.js, package.json, .oxlintrc.json   build and lint config


8. REST API (http://localhost:5001)
Method and path
Purpose
GET /api/health
Service and database status
GET /api/records
List all requests
POST /api/records/onboard
Create an onboarding request with HR and IT tasks
PUT /api/records/:ritm/approve
Approve; tasks move from Pending to Open
PUT /api/tasks/:taskId
Update task state, assignee or checklist; auto-closes the request
POST /api/reset
Restore the seed dataset


9. Known limitations and troubleshooting
Not persisted yet: hardware requests, access requests and rejections are called from the UI but have no server routes, so they live only in the browser session.
No authentication: roles are chosen from a drop-down and enforced in the browser; the API trusts its caller. Do not expose it publicly.
Fixed addresses: the API URL (http://localhost:5001) is written into src/App.jsx and the port in server.js. To change the port, edit both.
Badge not green: start npm run server first; the UI falls back to built-in sample data if the API is down.
Port in use: stop the other process, or let Vite pick the next free port.
Concurrency: synchronous file storage suits a single-user demo, not many simultaneous writers.
License: no license file is included; add one before reusing or distributing the code.
