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
    displayAllItems();
});

function displayAllItems() {
    var query = "SELECT item_id, product_name, department_name, price FROM products";
    connection.query(query, function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + 
                " || Department: " + res[i].department_name + " || Price: " + res[i].price);
            }
            console.table(res);
        }
        
    );
}