-- Only have this file to check how it runs in mysql

SELECT role.id, role.title, role.salary, department.name AS department_name
FROM role
JOIN department ON role.department_id = department.id;

SELECT 
    e.id AS employee_id, 
    e.first_name, 
    e.last_name, 
    r.title, 
    d.name AS department, 
    r.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM 
    employee e
JOIN 
    role r ON e.role_id = r.id
JOIN 
    department d ON r.department_id = d.id
LEFT JOIN 
    employee m ON e.manager_id = m.id;
