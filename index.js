// const listed here
const mysql = require('mysql2')
const inquirer = require('inquirer');



// sql connection
const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: '',
  database: 'election'
},
console.log('Connected to database')

);


// Main menu function 
function tableMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            choices:
                ['View All Employees','Add Employee','Update Employee Role','View All Roles'
                ,'Add Role','View All Departments','Add Department', 'Exit Program'],
            description: 'What would you like to do?'
        },


    ]).then(res => {
        switch (res.table) {
            case ('View All Employees'):
                viewEmployees();
                break; 
            case ('Add Employee'):
                addEmployee();
                break;
            case ('Update Employee Role'):
                employeeRoleUpdate();
                break;
            case ('View All Roles'):
                viewRoles();
                break;
            case ('Add Role'):
                addRole();
                break;
            case ('View All Departments'):
                    viewDepartment();
                    break;
            case ('Add Department'):
                departmentQuestions();
                break;
            default:
                console.log('Goodbye!');
                process.exit();
        }
    })
}
    
function viewEmployees() {
    db.query(
        `SELECT employee.id AS 'ID', employee.first_name AS 'First Name', 
        employee.last_name AS 'Last Name', role.title AS 'Title', 
        department.name AS 'Department', role.salary as Salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager' 
        from employee LEFT JOIN role on employee.role_id = role.id 
        LEFT JOIN department ON role.department_id = department.id 
        LEFT JOIN employee manager on manager.id = employee.manager_id`,
        (err, res) => {
            console.table(res)
            tableMenu()
        }
    )
}


function addEmployee() {
    db.query('SELECT * FROM role', (err, res) => {
        const addEmployeeArray = []
        for (let i = 0; i < res.length; i++) {
            const newEmployeeRole = {
                name: res[i].title,
                value: res[i].id
            }
            addEmployeeArray.push(newEmployeeRole)
        }
        db.query('SELECT * FROM employee', (err, res) => {
            const addManagerArray = []
            for (let i = 0; i < res.length; i++) {
                const newEmployeeManager = {
                    name: `${res[i].first_name} ${res[i].last_name}`,
                    value: res[i].id
                }
                addManagerArray.push(newEmployeeManager)
            }
            addManagerArray.push({ name: 'No Manager', value: null })

            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the employee first name?',
                    name: 'employeeFirstName',
                },
                {
                    type: 'input',
                    message: 'What is the employee last name?',
                    name: 'employeeLastName',
                },
                {
                    type: 'list',
                    message: 'What is the employee role?',
                    name: 'employeeRole',
                    choices: addEmployeeArray
                },
                {
                    type: 'list',
                    message: 'Who is the manager for this employee?',
                    name: 'employeeManager',
                    choices: addManagerArray
                }
            ]).then((res) => {
                db.query(
                    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
                    [res.employeeFirstName, res.employeeLastName, res.EmployeeRole, res.employeeManager],
                    (err, res) => {
                        console.log('Approved!  Added the employee to the database.')
                        tableMenu()
                    })
            })
        })
    })
}

function employeeRoleUpdate() {
    db.query('SELECT * FROM employee', (err, res) => {
        const employeeArray = []
        for (let i = 0; i < res.length; i++) {
            const employeeName = {
                name: `${res[i].first_name} ${res[i].last_name}`,
                value: res[i].id
            }
            employeeArray.push(employeeName)
        }
        db.query('SELECT * FROM role', (err, res) => {
            const roleArray = []
            for (let i = 0; i < res.length; i++) {
                const roleName = {
                    name: res[i].title,
                    value: res[i].id
                }
                roleArray.push(roleName)
            }
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'What is the name of the employee?',
                    name: 'employeeName',
                    choices: employeeArray
                },
                {
                    type: 'list',
                    message: 'What is their new role?',
                    name: 'newRole',
                    choices: roleArray
                }
            ]).then((res) => {
                db.query(
                    'UPDATE employee SET role_id = (?) WHERE id = (?)',
                    [res.newRole, res.employeeName],
                    (err, res) => {
                        console.log('Approved! Employee role has been updated')
                        tableMenu()
                    })
            })
        })
    })
}

function viewRoles() {
    db.query(
        `SELECT role.id AS 'ID', role.title AS 'Job Title', role.salary AS 'Salary', department.name AS 'Department' FROM role LEFT JOIN department on role.department_id = department.id`,
        (err, res) => {
            console.table(res)
            tableMenu()
        }
    )
}


function addRole() {
    db.query('SELECT * FROM department', (err, res) => {
        const addRoleArray = []
        for (let i = 0; i < res.length; i++) {
            const newRoleId = {
                name: res[i].name,
                value: res[i].id
            }
            addRoleArray.push(newRoleId)
        }
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the title of the role you would like to add?',
                name: 'roleTitle',
            },
            {
                type: 'input',
                message: 'What is the salary of the role you would like to add?',
                name: 'roleSalary',
            },
            {
                type: 'list',
                message: 'What is the department of the role you would like to add?',
                name: 'roleDepartment',
                choices: addRoleArray
            }
        ]).then((res) => {
            db.query(
                'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
                [res.roleTitle, res.roleSalary, res.roleDepartment],
                (err, res) => {
                    console.log('Approved!  Added the role to the database.')
                    table()
                })
        })
    })
}

function viewDepartment() {
    db.query(
        `SELECT department.id AS 'ID', department.name AS 'Department Name' FROM department`,
        (err, res) => {
            console.table(res)
            tableMenu()
        }
    )
}


function departmentQuestions() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'departmentName',
        }
    ]).then((res) => {
        db.query(
            'INSERT INTO department (name) VALUES (?)',
            [res.departmentName],
            (err, res) => {
                console.log('Approved! Added the department to the database.')
                tableMenu()
            })
    })
}



tableMenu();

