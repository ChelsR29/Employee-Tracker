const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDepartment, deleteDepartment, deleteRole, deleteEmployee, calculateDepartmentBudget } = require('./databaseOperations');
const db = require('./db');

class CLI {
  run() {
    return inquirer
      .prompt([
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
            'Update an employee manager',
            'View employees by manager',
            'View employees by department',
            'Delete a department',
            'Delete a role',
            'Delete an employee',
            'View department budget',
            'Exit'
          ]
        }
      ])
      .then(answer => {
        switch (answer.action) {
          case 'View all departments':
            viewDepartments().then(() => this.run());
            break;
          case 'View all roles':
            viewRoles().then(() => this.run());
            break;
          case 'View all employees':
            viewEmployees().then(() => this.run());
            break;
          case 'Add a department':
            addDepartment().then(() => this.run());
            break;
          case 'Add a role':
            addRole().then(() => this.run());
            break;
          case 'Add an employee':
            addEmployee().then(() => this.run());
            break;
          case 'Update an employee role':
            updateEmployeeRole().then(() => this.run());
            break;
          case 'Update an employee manager':
            updateEmployeeManager().then(() => this.run());
            break;
          case 'View employees by manager':
            viewEmployeesByManager().then(() => this.run());
            break;
          case 'View employees by department':
            viewEmployeesByDepartment().then(() => this.run());
            break;
          case 'Delete a department':
            deleteDepartment().then(() => this.run());
            break;
          case 'Delete a role':
            deleteRole().then(() => this.run());
            break;
          case 'Delete an employee':
            deleteEmployee().then(() => this.run());
            break;
          case 'View department budget':
            calculateDepartmentBudget().then(() => this.run());
            break;
          case 'Exit':
            db.end();
            console.log('Goodbye!');
            break;
        }
      });
  }
}

module.exports = CLI;
