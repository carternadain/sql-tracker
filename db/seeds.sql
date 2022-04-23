USE employee_DB;


INSERT INTO department (id, department_name)
VALUES (1, 'Management'),
 (2, 'Sales'),
 (3, 'Accounting'),
 (4, 'Reception'),
 (5, 'Human Resources');

INSERT INTO role (id, title, salary, department_id)
VALUES (1,'General Manager', 125000, 1),
(2,'Salesman', 75000, 2),
(3,'Accountant', 100000, 4),
(4,'Receptionist', 50000, 3),
(5,'Human Resource Officer', 80000, 5),
(6,'CEO', 300000, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1,'Carter', 'Nadain', 1, null),
 (2,'Joe', 'Fresh', 2, 1),
 (3,'Honey', 'Doodle', 2, 1),
 (4,'Duke', 'Thedog', 4, 1),
 (5,'Fanny', 'Keefer', 3, 1),
 (6,'Klay', 'Thompson', 5, 2),
 (7,'Steph', 'Curry', 6, null);