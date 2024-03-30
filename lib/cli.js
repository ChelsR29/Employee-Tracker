const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employee_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

function startApp() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]).then(answer => {
    switch (answer.action) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        db.end();
        console.log('Goodbye!');
        break;
    }
  });
}

function viewDepartments() {
  db.query('SELECT * FROM department', (err, res) => {
    if (err) {
      console.error('Error viewing departments: ' + err);
      return;
    }
    console.table(res);
    startApp();
  });
}

function viewRoles() {
  db.query('SELECT * FROM role', (err, res) => {
    if (err) {
      console.error('Error viewing roles: ' + err);
      return;
    }
    console.table(res);
    startApp();
  });
}

function viewEmployees() {
  db.query('SELECT * FROM employee', (err, res) => {
    if (err) {
      console.error('Error viewing employees: ' + err);
      return;
    }
    console.table(res);
    startApp();
  });
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter department name:'
    }
  ]).then(answer => {
    db.query('INSERT INTO department SET ?', answer, (err, res) => {
      if (err) {
        console.error('Error adding department: ' + err);
        return;
      }
      console.log('Department added successfully.');
      startApp();
    });
  });
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter role title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter role salary:'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter department ID:'
    }
  ]).then(answer => {
    db.query('INSERT INTO role SET ?', answer, (err, res) => {
      if (err) {
        console.error('Error adding role: ' + err);
        return;
      }
      console.log('Role added successfully.');
      startApp();
    });
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: "Enter employee's first name:"
    },
    {
      type: 'input',
      name: 'last_name',
      message: "Enter employee's last name:"
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter role ID:'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter manager ID (leave blank if none):'
    }
  ]).then(answer => {
    db.query('INSERT INTO employee SET ?', answer, (err, res) => {
      if (err) {
        console.error('Error adding employee: ' + err);
        return;
      }
      console.log('Employee added successfully.');
      startApp();
    });
  });
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Enter employee ID:'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter new role ID:'
    }
  ]).then(answer => {
    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.role_id, answer.employee_id], (err, res) => {
      if (err) {
        console.error('Error updating employee role: ' + err);
        return;
      }
      console.log('Employee role updated successfully.');
      startApp();
    });
  });
}

module.exports = {
  startApp
};





