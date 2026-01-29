import React, { useState, useEffect } from 'react';
import { attendanceAPI, employeeAPI } from '../services/api';

const AttendanceManager = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('Present');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
      if (response.data.length > 0) {
        setSelectedEmployee(response.data[0].employeeId);
      }
    } catch (err) {
      console.error('Failed to fetch employees');
    }
  };

  const fetchAttendance = async (employeeId = '') => {
    try {
      const response = await attendanceAPI.getAll(employeeId);
      setAttendanceRecords(response.data);
    } catch (err) {
      console.error('Failed to fetch attendance');
    }
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await attendanceAPI.mark({
        employeeId: selectedEmployee,
        date: attendanceDate,
        status,
      });
      setMessage('Attendance marked successfully!');
      fetchAttendance(selectedEmployee);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to mark attendance');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const empId = e.target.value;
    setSelectedEmployee(empId);
    fetchAttendance(empId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#374151' }}>Mark Attendance</h2>
        
        {message && (
          <div style={{
            marginBottom: '20px',
            padding: '15px',
            borderRadius: '6px',
            backgroundColor: message.includes('success') ? '#d1fae5' : '#fee2e2',
            color: message.includes('success') ? '#065f46' : '#991b1b'
          }}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleMarkAttendance} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Employee *</label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                required
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp.employeeId}>
                    {emp.employeeId} - {emp.fullName}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Date *</label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                required
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading || !selectedEmployee}
            style={{
              alignSelf: 'flex-start',
              padding: '10px 25px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              opacity: (loading || !selectedEmployee) ? 0.5 : 1
            }}
          >
            {loading ? 'Marking...' : 'Mark Attendance'}
          </button>
        </form>
      </div>

      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#374151' }}>Attendance Records</h2>
          <div style={{ width: '250px' }}>
            <select
              value={selectedEmployee}
              onChange={handleFilterChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
            >
              <option value="">All Employees</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp.employeeId}>
                  {emp.employeeId} - {emp.fullName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {attendanceRecords.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            No attendance records found.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Employee ID</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>Marked At</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record) => (
                  <tr key={record._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '16px', color: '#374151' }}>
                      {formatDate(record.date)}
                    </td>
                    <td style={{ padding: '16px', fontWeight: '500' }}>
                      {record.employeeId}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '500',
                        backgroundColor: record.status === 'Present' ? '#d1fae5' : '#fee2e2',
                        color: record.status === 'Present' ? '#065f46' : '#991b1b'
                      }}>
                        {record.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: '#6b7280' }}>
                      {new Date(record.markedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManager;