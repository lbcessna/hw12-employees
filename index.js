var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "135$#@qetREW",
    database: "employees_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "add",
            type: "list",
            message: "Would you like to add a new department, role, or employee?",
            choices: ["Add Department", "Add Role", "Add New Employee"]
        })
        .then(function (ans) {
            if (ans.add === "Add Department") {
                addDepartment();
            } else if (ans.add === "Add Role") {
                addRole();
            } else if (ans.add === "Add New Employee") {
                addEmployee();
            } else {
                connection.end();
            }
        })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "newDept",
                type: "input",
                message: "What department do you want to add?"
            }
        ])
        .then(function(ans){
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: ans.newDept
            },
            function (err) {
                if (err) throw err;
                console.log(ans.newDept + " was successfully created!");
                start();
            }
        );
    });
};