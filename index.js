// const listed here
const mysql = require('mysql2')
const inquirer = require('inquirer');
// const Connection = require('mysql/lib/Connection');
// const cTable = require('console.table')


// sql connection
const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: '',
  database: 'employee_DB'

},);

db.connect((err) => {
    if (err) throw err;
    console.log('connection succesful!')
});

// Main menu function 
function tableMenu() {
    inquirer.prompt({
        
            type: 'list',
            name: 'table',
            description: 'What would you like to do?',
            choices:
                ['View All Employees','Add Employee','Update Employee Role','View All Roles'
                ,'Add Role','View All Departments','Add Department', 'Exit Program'],
           
        
    })
    
    .then(res => {
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
            default: ('Exit');
                console.log ('Program Ended')
                process.exit();
                
        }
    })
}
    
function viewEmployees() {
    db.query
        ('SELECT * FROM employee', (err,data) => {
            if (err) throw err;
            console.log('showing all employees:');
            console.table(data);
            tableMenu();
    });
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
     db.query('SELECT * FROM role', (err, data) => {
            if (err) throw err;
            console.log('Showing all roles:');
            console.table(data);
            tableMenu();
        });
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
                    tableMenu()
                })
        })
    })
}


function viewDepartment() {
    db.query('SELECT * FROM department', (err, data) => {
           if (err) throw err;
           console.log('Showing all departments:');
           console.table(data);
           tableMenu();
       });
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