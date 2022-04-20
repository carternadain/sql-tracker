// const listed here
const mysql = require('mysql2')
const inquirer = require('inquirer');
// const { listenerCount } = require('mysql2/db/Connection');
// const cTable = require('console.table');


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

table();

// Main menu function 
function table() {
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
                employeeQuestions();
                break;
            case ('Update Employee Role'):
                employeeQuestions();
                break;
            case ('View All Roles'):
                viewRoles();
                break;
            case ('Add Role'):
                roleQuestions();
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
    

function viewEmployees () {
    inquirer.prompt ([ 
    {
        type: "list",
        name: "viewEmployees",
        choices: ['Carter Nadain', 'Joe Fresh', 'Honey Doodle', 
        'Duke Thedog', 'Fanny Keefer','Klay Thompson','Steph Curry']
    },
    ]
    )
}



function employeeQuestions () {
    inquirer.prompt ([{
        type: "input",
        name: "firstName",
        message: "What is the employees first name?" 

    }, 
    {
        type: "input",
        name: "lastName",
        message: "What is the employees last name?" 
    
    },
    {
        type: "input",
        name: "employeeRole",
        message: "What is the employees role?" 

    },
    {
        type: "input",
        name: "employeeManger",
        message: "who is the employees manger?" 
    }
    ]
    )
}


function viewRoles () {
    inquirer.prompt ([ 
    {
        type: "list",
        name: "viewRoles",
        choices: ['General Manager', 'Salesmen', 'Accountant', 
        'Receptionist', 'Human Resources','Receptionist','CEO']
    },
    ]
    )
}


function roleQuestions () {
    inquirer.prompt ([{
        type: "input",
        name: "roleName",
        message: "What is the name of the role?" 

    }, 
    {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?" 
    },
    {
        type: "input",
        name: "departmentRole",
        message: "What department does the role belong to?" 
    }
    ]
    )
}

function viewDepartment () {
    inquirer.prompt ([ 
    {
        type: "list",
        name: "viewDepartment",
        choices: ['Management', 'Sales', 'Accounting', 
        'Reception', 'Human Resource']
    },
    ]
    )
}



function departmentQuestions () {
    inquirer.prompt ([{
        type: "input",
        name: "roleName",
        message: "What is the name of the department ?" 

    }, 
    {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?" 
    },
    {
        type: "input",
        name: "departmentRole",
        message: "What department does the role belong to?" 
    }
    ]
    )
}








// query functions for mysql (employees,roles,deperatments)

// function Employee() {
//     const query =''
// }