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
    listManagerOptions();
});

function listManagerOptions() {
    inquirer.prompt([
        {
            name: "option",
            type: "list",
            message: "Please select an option:",
            choices: [
              "View Products for Sale",
              "View Low Inventory",
              "Add to Inventory",
              "Add New Product"
            ]
        }
    ]).then(function(response) {
        switch (response.option) {
            case "View Products for Sale":
              viewProductsForSale();
              break;
      
            case "View Low Inventory":
              viewLowInventory();
              break;
      
            case "Add to Inventory":
              addToInventory();
              break;
      
            case "Add New Product":
              addNewProduct();
              break;
            }
    });
}

function viewProductsForSale() {
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
    connection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            listManagerOptions();
        }
    );
}

function viewLowInventory() {
    var query = `SELECT item_id, product_name, price, stock_quantity FROM products 
                WHERE stock_quantity<5`;
    connection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            listManagerOptions();
        }
    );
}

function addToInventory() {
    inquirer.prompt([
        {
            name: "idToAdd",
            type: "input",
            message: "Enter the ID of the product for which you need to add more to the inventory: ",
            validate: function(value) {
            if (parseFloat(value) % 1 === 0 && parseInt(value) > 0) {
                return true;
            }
            return false;
            }
        },
        {
            name: "quantityToAdd",
            type: "input",
            message: "Enter the number of units of the product you are going to add to the inventory: ",
            validate: function(value) {
              if (parseFloat(value) % 1 === 0 && parseInt(value) > 0) {
                return true;
            }
              return false;
            }
        }
    ]).then(function(response) {
        updateInventory(parseInt(response.idToAdd), parseInt(response.quantityToAdd));
    });
}

function updateInventory(id, quantity) {
    var query = "UPDATE products SET stock_quantity=stock_quantity+? WHERE item_id=?";
    connection.query(query, [quantity, id], function(err, res) {
        if (err) throw err;
        listManagerOptions();
        }
    );
}

function addNewProduct() {
    inquirer.prompt([
        {
            name: "newName",
            type: "input",
            message: "Enter the name of the new product to be added to the store: "
        },
        {
            name: "newDept",
            type: "input",
            message: "Enter the department where the new product belongs: "
        },
        {
            name: "newPrice",
            type: "input",
            message: "Enter the price of the new product: ",
            validate: function(value) {
              if (!isNaN(value) && parseFloat(value) > 0) {
                return true;
            }
              return false;
            }
        },
        {
            name: "newQuantity",
            type: "input",
            message: "Enter the initial stock quantity of the new product: ",
            validate: function(value) {
              if (parseFloat(value) % 1 === 0 && parseInt(value) >= 0) {
                return true;
            }
              return false;
            }
        }
    ]).then(function(response) {
        addNewProductToStoreInventory(response.newName, response.newDept, parseFloat(response.newPrice), parseInt(response.newQuantity));
    });
}

function addNewProductToStoreInventory(name, dept, price, quantity) {
    var query = `INSERT INTO products (product_name, department_name, price, stock_quantity)
                VALUES (?, ?, ?, ?)`;
    connection.query(query, [name, dept, price, quantity], function(err, res) {
        if (err) throw err;
        listManagerOptions();
        }
    );
}