const inquirer = require('inquirer');
const db = require('./db');

function viewDepartments() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM department', (err, res) => {
            if (err) {
                reject('Error viewing departments: ' + err);
            } else {
                console.table(res);
                resolve();
            }
        });
    });
}

function viewRoles() {
    return new Promise((resolve, reject) => {
        db.query('SELECT role.id, role.title, role.salary, department.name AS department_name FROM role JOIN department ON role.department_id = department.id', (err, res) => {
            if (err) {
                reject('Error viewing roles: ' + err);
            } else {
                console.table(res);
                resolve();
            }
        });
    });
}

function viewEmployees() {
    return new Promise((resolve, reject) => {
        db.query('SELECT e.id AS employee_id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id ORDER BY e.id;', (err, res) => {
            if (err) {
                reject('Error viewing employees: ' + err);
            } else {
                console.table(res);
                resolve();
            }
        });
    });
}

function addDepartment() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter department name:'
            }
        ]).then(answer => {
            db.query('INSERT INTO department SET ?', answer, (err, res) => {
                if (err) {
                    reject('Error adding department: ' + err);
                } else {
                    console.log('Department added successfully.');
                    resolve();
                }
            });
        });
    });
}

function addRole() {
    return new Promise((resolve, reject) => {
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
                    reject('Error adding role: ' + err);
                } else {
                    console.log('Role added successfully.');
                    resolve();
                }
            });
        });
    });
}

function addEmployee() {
    return new Promise((resolve, reject) => {
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
                    reject('Error adding employee: ' + err);
                } else {
                    console.log('Employee added successfully.');
                    resolve();
                }
            });
        });
    });
}

function updateEmployeeRole() {
    return new Promise((resolve, reject) => {
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
                    reject('Error updating employee role: ' + err);
                } else {
                    console.log('Employee role updated successfully.');
                    resolve();
                }
            });
        });
    });
}

function updateEmployeeManager() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'Enter employee ID:'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter new manager ID:'
            }
        ]).then(answer => {
            db.query('UPDATE employee SET manager_id = ? WHERE id = ?', [answer.manager_id, answer.employee_id], (err, res) => {
                if (err) {
                    reject('Error updating employee manager: ' + err);
                } else {
                    console.log('Employee manager updated successfully.');
                    resolve();
                }
            });
        });
    });
}

function viewEmployeesByManager() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter manager ID:'
            }
        ]).then(answer => {
            db.query('SELECT * FROM employee WHERE manager_id = ?', [answer.manager_id], (err, res) => {
                if (err) {
                    reject('Error viewing employees by manager: ' + err);
                } else {
                    console.table(res);
                    resolve();
                }
            });
        });
    });
}

function viewEmployeesByDepartment() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter department ID:'
            }
        ]).then(answer => {
            db.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id WHERE role.department_id = ?', [answer.department_id], (err, res) => {
                if (err) {
                    reject('Error viewing employees by department: ' + err);
                } else {
                    console.table(res);
                    resolve();
                }
            });
        });
    });
}

function deleteDepartment() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter department ID to delete:'
            }
        ]).then(answer => {
            db.query('DELETE FROM department WHERE id = ?', [answer.department_id], (err, res) => {
                if (err) {
                    reject('Error deleting department: ' + err);
                } else {
                    console.log('Department deleted successfully.');
                    resolve();
                }
            });
        });
    });
}

function deleteRole() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter role ID to delete:'
            }
        ]).then(answer => {
            db.query('DELETE FROM role WHERE id = ?', [answer.role_id], (err, res) => {
                if (err) {
                    reject('Error deleting role: ' + err);
                } else {
                    console.log('Role deleted successfully.');
                    resolve();
                }
            });
        });
    });
}

function deleteEmployee() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'Enter employee ID to delete:'
            }
        ]).then(answer => {
            db.query('DELETE FROM employee WHERE id = ?', [answer.employee_id], (err, res) => {
                if (err) {
                    reject('Error deleting employee: ' + err);
                } else {
                    console.log('Employee deleted successfully.');
                    resolve();
                }
            });
        });
    });
}

function calculateDepartmentBudget() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter department ID to calculate budget:'
            }
        ]).then(answer => {
            db.query('SELECT SUM(salary) AS total_budget FROM employee JOIN role ON employee.role_id = role.id WHERE role.department_id = ?', [answer.department_id], (err, res) => {
                if (err) {
                    reject('Error calculating department budget: ' + err);
                } else {
                    console.log(`Total utilized budget of department ${answer.department_id}: $${res[0].total_budget}`);
                    resolve();
                }
            });
        });
    });
}


module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    calculateDepartmentBudget
};