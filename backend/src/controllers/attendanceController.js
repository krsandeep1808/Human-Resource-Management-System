const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Mark attendance
exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if employee exists
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const attendance = new Attendance({
      employeeId,
      date: new Date(date),
      status
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Attendance already marked for this date' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Get attendance records
exports.getAttendance = async (req, res) => {
  try {
    const { employeeId } = req.query;
    
    let query = {};
    if (employeeId) {
      query.employeeId = employeeId;
    }

    const attendance = await Attendance.find(query)
      .sort({ date: -1 })
      .limit(100);
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};