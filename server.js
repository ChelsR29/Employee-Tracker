const fs = require('fs');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employee_db'
}, err => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
  startApp();
});

// Start the application
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

// Read SQL queries from the queries.sql file
const sqlQueries = fs.readFileSync('queries.sql', 'utf8');

// View all departments
function viewDepartments() {
  db.query(sqlQueries.getAllDepartments, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// View all roles
function viewRoles() {
  db.query(sqlQueries.getAllRoles, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// View all employees
function viewEmployees() {
  db.query(sqlQueries.getAllEmployees, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Add a department
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter department name:'
    }
  ]).then(answer => {
    db.query(sqlQueries.addDepartment, answer, (err, res) => {
      if (err) throw err;
      console.log('Department added successfully.');
      startApp();
    });
  });
}

// Add a role
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
    db.query(sqlQueries.addRole, answer, (err, res) => {
      if (err) throw err;
      console.log('Role added successfully.');
      startApp();
    });
  });
}

// Add an employee
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
    db.query(sqlQueries.addEmployee, answer, (err, res) => {
      if (err) throw err;
      console.log('Employee added successfully.');
      startApp();
    });
  });
}

// Update an employee role
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
    db.query(sqlQueries.updateEmployeeRole, [answer.role_id, answer.employee_id], (err, res) => {
      if (err) throw err;
      console.log('Employee role updated successfully.');
      startApp();
    });
  });
}
