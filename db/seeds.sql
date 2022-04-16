INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Carter', 'Nadain', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Joe', 'Fresh', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Honey', 'Doodle', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Duke', 'Thedog', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Fanny', 'Keefer', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Klay', 'Thompson', 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Steph', 'Curry', 6, null);

INSERT INTO department (department_name)
VALUES ('Management');
INSERT INTO department (department_name)
VALUES ('Sales');
INSERT INTO department (department_name)
VALUES ('Accounting');
INSERT INTO department (department_name)
VALUES ('Reception');
INSERT INTO department (department_name)
VALUES ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('General Manager', 125000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Salesman', 75000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 100000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Receptionist', 50000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Human Resource Officer', 80000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 300000, null);