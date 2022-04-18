// const listed here
const mysql = require('mysql2')
const inquirer = require('inquirer');
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
                ['View Data', 'Add Data', 'Update Employee Role', 'Exit Program'],
            description: 'What would you like to do?'
        },
    ]).then(res => {
        switch (res.table) {
            case ('View Data'):
                viewData();
                break;
            case ('Add Data'):
                addInfo();
                break;
            case ('Update Employee Role'):
                updateData();
                break;
            default:
                console.log('Goodbye!');
                process.exit();
        }
    })
}

//secondary menu function to view data
function viewData() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            choices: ['View All Departments', 'View All Roles', 'View All Employees'],
            description: 'Which data would you like to view?'
        },
    ]).then(res => {
        switch (res.selection) {
            case ('View All Departments'):
                db.query('SELECT * FROM department', (err, data) => {
                    if (err) { throw err }
                    else { console.table(data) }
                    continueProgram();
                });
                break;
            case ('View All Roles'):
                db.query('SELECT * FROM roles', (err, data) => {
                    if (err) { throw err }
                    else { console.table(data) }
                    continueProgram();
                });
                break;
            case ('View All Employees'):
                db.query('SELECT * FROM employee', (err, data) => {
                    if (err) { throw err }
                    else { console.table(data) }
                    continueProgram();
                });
                break;
            default:
                console.log('Goodbye!');
                process.exit();
        }
    })
}


// secondary menu to add department / role / employee
function addInfo() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            choices: ['Add a Department', 'Add a Role', 'Add an Employee'],
            description: 'What data would you like to add?'
        },
    ]).then(res => {
        switch (res.selection) {
            case ('Add a Department'):
                addDept();
                break;
            case ('Add a Role'):
                addRole();
                break;
            case ('Add an Employee'):
                addEmployee();
                break;
            default:
                console.log('Goodbye!');
                process.exit();
        }
    })

}

//action to continue /exit 
function continueProgram() {

    inquirer.prompt(
        {
            type: 'list',
            message: 'Would you like to continue?',
            choices: ['Continue', 'Exit'],
            name: 'continue'
        }
    ).then(res => {
        var confirm = res.continue;
        if (confirm === 'Continue') {
            menu();
        } else {
            console.log('Goodbye!');
            process.exit();
        }
    });
};
