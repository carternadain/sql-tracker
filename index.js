// const listed here
const mysql = require('mysql2')
const inquirer = require('inquirer');
// const { listenerCount } = require('mysql2/typings/mysql/lib/Connection');
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
                ['Add Employee Role','View All Roles','Add Role', 'Add Department', 'Exit Program'],
            description: 'What would you like to do?'
        },
    ]).then(res => {
        switch (res.table) {
            case ('Add Employee Role'):
                employeeQuestions();
                break;
            case ('View All Roles'):
                employeeQuestions();
                break;
            case ('Add Role'):
                roleQuestions();
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