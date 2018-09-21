// Require NPM packages necessary for data input and storage
var inquirer = require("inquirer");
var mysql = require("mysql");

var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    listSupervisorOptions();
});

function listSupervisorOptions() {
    inquirer.prompt([
        {
            name: "option",
            type: "list",
            message: "Please select an option:",
            choices: [
              "View Product Sales by Department",
              "Create New Department"
            ]
        }
    ]).then(function(response) {
        switch (response.option) {
            case "View Product Sales by Department":
              viewProductsSalesByDept();
              break;
      
            case "Create New Department":
              createNewDept();
              break;
            }
    });
}

function viewProductsSalesByDept() {
    var query = `SELECT d.department_id, p.department_name, 
                d.over_head_costs, SUM(p.product_sales) AS product_sales, 
                product_sales-d.over_head_costs AS total_profit
                FROM products AS p 
                JOIN departments AS d 
                ON p.department_name = d.department_name 
                GROUP BY department_name`;
    connection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            listSupervisorOptions();
        }
    );
}

function createNewDept() {
    inquirer.prompt([
        {
            name: "newDeptName",
            type: "input",
            message: "Enter the name of the new department to be created: "
        },
        {
            name: "newOverHead",
            type: "input",
            message: "Enter the over head costs of the new department: ",
            validate: function(value) {
              if (!isNaN(value) && parseFloat(value) >= 0) {
                return true;
            }
              return false;
            }
        }
    ]).then(function(response) {
        updateDBWithNewDept(response.newDeptName, parseFloat(response.newOverHead));
    });
}

function updateDBWithNewDept(name, costs) {
    var query = `INSERT INTO departments (department_name, over_head_costs)
                VALUES (?, ?)`;
    connection.query(query, [name, costs], function(err, res) {
        if (err) throw err;
        listSupervisorOptions();
        }
    );
}