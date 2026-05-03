# Company Management System - Frontend

A modern, responsive React-based dashboard application for company management with role-based views, real-time features, and comprehensive business operations.

## Features

✅ **Role-Based Dashboards**
- Admin: Full system overview, user management, analytics
- Manager: Team management, task assignment, reports  
- Employee: Personal tasks, attendance, profile

✅ **Task Management**
- Create and assign tasks
- Track task status (Pending, In-progress, Completed, On-hold)
- Priority levels and due dates
- Real-time status updates

✅ **Inventory System**
- View inventory items and current stock levels
- Low-stock alerts and reorder tracking
- Add new items (admin only)
- Stock level management

✅ **Attendance**
- Clock in/out functionality
- Attendance history and records
- Time tracking with timestamps
- Export attendance reports

✅ **Billing & Invoices**
- Create and manage invoices
- Generate PDF invoices
- Export to Excel
- Invoice status tracking

✅ **Real-time Chat**
- Multi-room conference chat
- Real-time messaging with Socket.IO
- Department and team rooms
- Message history

✅ **User Management** (Admin only)
- Create, edit, delete users
- Assign roles and departments
- Manage user accounts
- Activity tracking

✅ **Modern UI/UX**
- Power BI-inspired dashboard design
- Responsive Bootstrap layout
- Real-time data updates
- Clean, professional interface
- Dark/Light theme support (optional)

## Tech Stack

- **Framework:** React (vanilla JavaScript)
- **Styling:** Bootstrap 5 + Custom CSS
- **HTTP Client:** Fetch API
- **Real-time:** Socket.IO
- **Icons:** Font Awesome 6
- **Build:** HTML5 + ES6+

## Installation & Setup

### Prerequisites
- Backend running on `http://localhost:4000`
- MongoDB seeded with test data

### Running the Frontend

**Option 1: Simple HTTP Server**
```bash
cd frontend

# Using Python
python -m http.server 8000

# Or using Node.js global http-server
npx http-server
```

Then open `http://localhost:8000` in your browser.

**Option 2: Integrated with Backend**

Set up a proxy in your backend's Express app to serve the frontend:
```javascript
app.use(express.static(path.join(__dirname, '../frontend')));
```

## Default Test Credentials

### Admin Account
- Email: `admin@example.com`
- Password: `adminpass`

### Manager Account
- Email: `manager@example.com`
- Password: `managerpass`

### Employee Account
- Email: `employee1@example.com`
- Password: `employeepass`

## Available Pages

### Dashboard
- **Admin:** System overview with KPIs, recent tasks, low-stock alerts, revenue metrics
- **Manager:** Team dashboard with pending approvals, task completion metrics
- **Employee:** Personal dashboard with assigned tasks, attendance status, progress

### Tasks
- List all assigned tasks
- Create new tasks (manager/admin)
- Update task status
- Filter by priority and status
- Due date tracking

### Inventory
- Browse all inventory items
- View stock levels and pricing
- Low-stock alerts
- Add items (admin only)
- Track reorder levels

### Attendance
- Clock in/out (employees)
- View attendance history
- Export attendance records
- Manual correction (manager/admin)

### Invoices
- List all invoices
- Create new invoices
- Download PDF invoices
- Export to Excel
- Track invoice status (Draft, Sent, Paid, Overdue)

### Chat
- Join conference rooms (General, Management, Support)
- Real-time messaging
- Multiple rooms support
- Message history

### User Management (Admin only)
- View all users
- Create new users with roles
- Delete inactive users
- Role and department assignment

## File Structure

```
frontend/
├── index.html        # Main HTML file with styling
├── main.js           # Complete app logic
└── README.md         # This file
```

## API Integration

The frontend communicates with the backend via REST API:

```javascript
const API = (path, opts = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = 'Bearer ' + token;
  return fetch('/api' + path, Object.assign({ headers }, opts));
};
```

### Authentication Flow
1. User enters credentials on login page
2. Frontend POSTs to `/api/auth/login`
3. Backend returns JWT token and user data
4. Token stored in localStorage
5. Token included in Authorization header for all subsequent requests

### Real-time Chat Connection
```javascript
const socket = io();
socket.on('receive-message', (data) => {
  // Handle incoming message
});
```

## Styling & Customization

Main styles defined in `index.html <style>` tag:

```css
--primary: #1f77b4      /* Main color (Power BI blue) */
--success: #2ca02c      /* Success state */
--danger: #d62728       /* Error/delete */
--warning: #ff7f0e      /* Warning */
--dark: #2c3e50         /* Sidebar color */
```

Customize by modifying CSS variables or Bootstrap utilities.

## Features in Detail

### Dashboard Widgets
- **KPI Cards:** Show key performance indicators with icons
- **Recent Tasks:** Lists latest assigned tasks with status
- **Low Stock Alerts:** Inventory items below reorder level
- **Charts:** Sales, completion rates, attendance trends (expandable with Chart.js)

### Task Management
- **Status Colors:**
  - Warning: Pending
  - Info: In Progress
  - Success: Completed
  - Secondary: On Hold

### Inventory Alerts
- **Alert System:** Items with quantity ≤ reorder level shown in red
- **Export:** Download full inventory to Excel
- **Real-time Updates:** Stock levels update across all views

### Attendance Tracking
- **Clock In/Out:** One-click time tracking
- **History:** View past 20 attendance records
- **Timestamps:** Precise clock in/out times
- **Exports:** Download attendance reports by date range

### Invoice Management
- **Auto-numbering:** Invoices numbered sequentially
- **PDF Export:** Generate downloadable PDFs
- **Status Workflow:** Draft → Sent → Paid/Overdue
- **Excel Export:** All invoices exportable to spreadsheet

## Responsive Design

- **Desktop:** Full sidebar, content spans width
- **Tablet:** Collapsible sidebar, optimized tables
- **Mobile:** Stacked layout, touch-friendly buttons

## Error Handling

- Invalid credentials on login show error message
- Failed API calls prompt logout and return to login
- 404/500 errors display user-friendly messages
- Form validation before submission

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lightweight JavaScript (no frameworks)
- Efficient DOM updates
- Local storage for token persistence
- Async/await for clean code flow

## Security

- JWT token-based authentication
- Tokens stored securely in localStorage
- API headers include CORS and Content-Type
- Role-based access control on frontend
- Password entered only on login (never stored)

## Troubleshooting

### Login Failed
- Ensure backend is running on port 4000
- Check database is seeded with test users
- Verify credentials: admin@example.com / adminpass

### Data Not Loading
- Open browser console (F12) for errors
- Check Network tab for failed requests
- Verify backend API is responding
- Check JWT token is valid

### Chat Not Connecting
- Ensure Socket.IO is loaded (check script tag)
- Verify backend Socket.IO is enabled
- Check browser console for connection errors

### Styles Not Applied
- Clear browser cache (Ctrl+Shift+Del)
- Check Bootstrap CDN is loaded
- Verify custom CSS in style tag

## Future Enhancements

- Add Chart.js for data visualization
- Implement recurring tasks
- Add file attachments to tasks
- Calendar view for attendance
- Advanced filtering and search
- Mobile app (React Native)
- Video conferencing integration (WebRTC)
- SMS/Email notifications
- Advanced reporting with dashboards

## License

MIT

## Support

For issues or questions, check backend API documentation in `backend/README.md`

