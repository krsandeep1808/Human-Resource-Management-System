import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API calls
export const employeeAPI = {
  getAll: () => api.get('/employees'),
  create: (employeeData) => api.post('/employees', employeeData),
  delete: (id) => api.delete(`/employees/${id}`),
};

// Attendance API calls
export const attendanceAPI = {
  mark: (attendanceData) => api.post('/attendance', attendanceData),
  getAll: (employeeId) => api.get(`/attendance${employeeId ? `?employeeId=${employeeId}` : ''}`),
};