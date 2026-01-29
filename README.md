# HRMS Lite - Full-Stack Assignment

A lightweight Human Resource Management System built with MERN stack.

## Features
- **Employee Management:** Add, view, and delete employees
- **Attendance Management:** Mark and track daily attendance
- **RESTful API:** Fully functional backend API
- **Professional UI:** Clean, responsive interface
- **Data Validation:** Email format, unique IDs, required fields
- **Error Handling:** Meaningful error messages

## Tech Stack
- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM
- **Deployment:** Vercel (Frontend), Render (Backend)

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/employees` | Get all employees |
| POST | `/api/employees` | Create new employee |
| DELETE | `/api/employees/:id` | Delete employee |
| POST | `/api/attendance` | Mark attendance |
| GET | `/api/attendance` | Get attendance records |

## Local Development
### Prerequisites
- Node.js 16+
- MongoDB (Local or Atlas)

### Backend Setup
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

## Project Structure
```
hrms-lite/
├── backend/          
│   ├── src/
│   │   ├── models/      
│   │   ├── controllers/ 
│   │   ├── routes/      
│   │   └── server.js    
│   └── package.json
├── frontend/         
│   ├── src/
│   │   ├── components/  
│   │   ├── services/    
│   │   ├── App.jsx      
│   │   └── main.jsx     
│   └── package.json
└── README.md
```

## Features Implemented
1. **Employee Management**
   - Add employee with validation
   - View employee list
   - Delete employee

2. **Attendance Management**
   - Mark daily attendance
   - View attendance history
   - Filter by employee

3. **Validation & Error Handling**
   - Required field validation
   - Email format validation
   - Unique employee ID/email
   - Proper HTTP status codes

## Environment Variables
### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/hrms-lite
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Screenshots
![Employee Management](screenshots/employees.png)
![Attendance Management](screenshots/attendance.png)

## Assumptions & Limitations
- Single admin user (no authentication system)
- Attendance can be marked once per day per employee
- Basic UI without advanced styling frameworks
- No pagination for large datasets
