const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    // view all
    viewAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.dep_name FROM department;"
        )
    }

    viewAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dep_name AS DEPARTMENT, role.salary, CONCAT(manager.first_name, manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on employee.manager_id = employee.manager_id; "
        );
    }

    viewAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.dep_name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        )
    }

    // add
    addDepartment(department) {
        return this.connection.promise().query(
            "INSERT INTO department SET ?", department
        );
    }

    addRole(role) {
        return this.connection.promise().query(
            "INSERT INTO role SET ?", role
        );
    }

    addEmployee(employee) {
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", employee
        );
    }
    // update employee

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id =? WHERE id= ?",
            [roleId, employeeId]
        );
    }


}

module.exports = new DB(connection);
