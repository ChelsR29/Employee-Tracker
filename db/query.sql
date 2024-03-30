-- Get all departments
SELECT * FROM department;

-- Get all roles
SELECT * FROM role;

-- Get all employees
SELECT * FROM employee;

-- Insert a new department
INSERT INTO department (name) VALUES (?);

-- Insert a new role
INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);

-- Insert a new employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);

-- Update an employee's role
UPDATE employee SET role_id = ? WHERE id = ?;
