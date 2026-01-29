const Employee = require('../models/Employee');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new employee
exports.createEmployee = async (req, res) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    // Validation
    if (!employeeId || !fullName || !email || !department) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if employee ID already exists
    const existingEmployee = await Employee.findOne({ 
      $or: [{ employeeId }, { email }] 
    });

    if (existingEmployee) {
      return res.status(400).json({ 
        error: 'Employee ID or Email already exists' 
      });
    }

    const employee = new Employee({
      employeeId,
      fullName,
      email,
      department
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Duplicate employee data' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};