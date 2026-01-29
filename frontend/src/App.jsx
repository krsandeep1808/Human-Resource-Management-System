import React, { useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import AttendanceManager from './components/AttendanceManager';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('employees');

  const handleEmployeeAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>HRMS Lite</h1>
          <p style={{ color: '#6b7280', marginTop: '5px' }}>Human Resource Management System</p>
        </div>
      </header>

      <nav style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex' }}>
          <button
            onClick={() => setActiveTab('employees')}
            style={{
              padding: '16px 24px',
              fontWeight: '500',
              fontSize: '16px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === 'employees' ? '2px solid #3b82f6' : 'none',
              color: activeTab === 'employees' ? '#3b82f6' : '#6b7280'
            }}
          >
            Employee Management
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            style={{
              padding: '16px 24px',
              fontWeight: '500',
              fontSize: '16px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === 'attendance' ? '2px solid #3b82f6' : 'none',
              color: activeTab === 'attendance' ? '#3b82f6' : '#6b7280'
            }}
          >
            Attendance Management
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
        {activeTab === 'employees' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <EmployeeForm onEmployeeAdded={handleEmployeeAdded} />
            <EmployeeList refreshTrigger={refreshKey} />
          </div>
        ) : (
          <AttendanceManager />
        )}
      </main>

      <footer style={{ 
        backgroundColor: 'white', 
        borderTop: '1px solid #e5e7eb',
        marginTop: '40px',
        padding: '20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            HRMS Lite © {new Date().getFullYear()} - Full-Stack Assignment Solution
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;