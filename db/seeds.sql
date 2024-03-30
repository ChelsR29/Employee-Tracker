-- Inserting departments
INSERT INTO department (name) VALUES 
('Information Technology'),
('Operations');

-- Inserting roles
INSERT INTO role (title, salary, department_id) VALUES 
('IT Support Specialist', 60000.00, 1),
('Software Engineer', 80000.00, 1),
('Operations Assistant', 50000.00, 2),
('Operations Manager', 70000.00, 2);

-- Inserting employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 2, NULL),     -- Software Engineer, no manager
('Jane', 'Smith', 4, NULL),    -- Operations Manager, no manager
('Michael', 'Johnson', 1, 1),  -- IT Support Specialist, reports to John Doe
('Emily', 'Williams', 3, 2),   -- Operations Assistant, reports to Jane Smith
('David', 'Brown', 1, 1),      -- IT Support Specialist, reports to John Doe
('Sarah', 'Miller', 3, 2),     -- Operations Assistant, reports to Jane Smith
('Chris', 'Wilson', 1, 1),     -- IT Support Specialist, reports to John Doe
('Jessica', 'Jones', 3, 2),    -- Operations Assistant, reports to Jane Smith
('Kevin', 'Davis', 1, 1),      -- IT Support Specialist, reports to John Doe
('Michelle', 'Taylor', 3, 2);  -- Operations Assistant, reports to Jane Smith
