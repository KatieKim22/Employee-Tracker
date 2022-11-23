const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db');

require('console.table');

const PORT = process.env.PORT || 5001;

function init() {
    myCompany()
};

function myCompany() {
    inquirer.prompt([{
        type: "list",
        name: "questions",
        message: "What would you like to do?",
        choices: [
            {
                name: "view all departments",
                value: "VIEW_DEPARTMENTS"
            }, {
                name: "view all roles",
                value: "VIEW_ROLES"
            }, {
                name: "view all employees",
                value: "VIEW_EMPLOYEES"
            }, {
                name: "add a department",
                value: "ADD_DEPARTMENT"
            }, {
                name: "add a role",
                value: "ADD_ROLE"
            }, {
                name: "add an employee",
                value: "ADD_EMPLOYEE"
            }, {
                name: "update an employee role",
                value: "UPDATE_EMPLOYEE_ROLE"
            }, {
                name: "Quit",
                value: "QUIT"
            }
        ]
    }]).then(res => {

        let choice = res.questions;
        console.log(choice)

        switch (choice) {
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            default:
                quit();
        }
    })
    console.log("test test")
}

// view all
function viewDepartments() {
    db.viewAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments)
        }).then(() => myCompany())
}

function viewRoles() {
    db.viewAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles)
        }).then(() => myCompany())
}

function viewEmployees() {
    db.viewAllEmployees()

        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees)
        }).then(() => myCompany())
}

// add
function addDepartment() {
    // prompted to enter the name of the department and that department is added to the database
    inquirer.prompt([
        {
            name: "dep_name",
            message: "What is the name of the department?",
            type: 'input'
        }
    ]).then(res => {
        let depname = res;
        db.addDepartment(depname)
            .then(() => console.log(depname.dep_name + "is added to db"))
            .then(() => myCompany())
    })
}

function addRole() {

    inquirer.prompt([
        {
            name: "title",
            message: "What is the name of the role?"
        }, {
            name: "salary",
            message: "How much is the basic salary for this role?"
        }, {
            type: "list",
            name: "department_id",
            message: "Which department is this role belong to?",
            choices: [
                {
                    name: "Engineering",
                    value: 1
                }, {
                    name: "Accounting",
                    value: 2
                }, {
                    name: "Tax",
                    value: 3
                }, {
                    name: "Sales",
                    value: 4
                }, {
                    name: "HR",
                    value: 5
                },
            ]
        }
    ])



        // prompted to enter the name, salary, and department for the role and that role is added to the database
        .then(role => {
            db.addRole(role)
                .then(() => console.log(`You've added ${role.title} to the db`))
                .then(() => myCompany())
        })
}

function addEmployee() {
    // prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    inquirer.prompt([
        {
            name: "first_name",
            message: "What is the new employee's first name?"
        }, {
            name: "last_name",
            message: "What is the new employee's last name?"
        }, {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: [
                {
                    name: "Software Engineer",
                    value: 11
                }, {
                    name: "Accountant",
                    id: 12
                }, {
                    name: "Tax Manager",
                    value: 13
                }, {
                    name: "Tax Senior",
                    value: 14
                }, {
                    name: "Sales Lead",
                    value: 15
                }, {
                    name: "Salesperson",
                    value: 16
                },
            ]
        }, {
            type: "list",
            name: "manager_id",
            message: "Who is the manager?",
            choices: [
                {
                    name: "John Fisher",
                    value: 24
                }, {
                    name: "Sandy Lacane",
                    value: 26
                }
            ]
        }
    ])
        .then(res => {
            let employee = {
                firstName: res.first_name,
                lastName: res.last_name,
                roleId: res.role_id,
                managerId: res.manager_id
            }

            db.addEmployee(employee);
        }).then(() => console.log(`You've added new employee to db`))
        .then(() => myCompany())
}

// employee update
// prompted to select an employee to update and their new role and this information is updated in the database

function updateEmployeeRole() {
    db.viewAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))

            inquirer.prompt([
                {
                    type: "list",
                    name: "employeeId",
                    massage: "which employee's role do you wnat to update?",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.viewAllRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }))
                            inquirer.prompt([
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "Which role do you want to assign the selected employee?",
                                    choices: roleChoices
                                }
                            ])
                                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                                .then(() => console.log("You've updated employee's role."))
                                .then(() => myCompany())
                        })
                })
        })
}

// exit
function quit() {
    console.log("Good bye!");
    process.exit();
}




init();


