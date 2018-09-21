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
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            promptCustomerToPlaceOrder();
        }
    );
}

function promptCustomerToPlaceOrder() {
    inquirer.prompt([
        {
            name: "idToBuy",
            type: "input",
            message: "Enter the ID of the product you would like to buy: ",
            validate: function(value) {
            if (parseFloat(value) % 1 === 0 && parseInt(value) > 0) {
                return true;
            }
            return false;
            }
        },
        {
            name: "quantityToBuy",
            type: "input",
            message: "Enter the number of units of the product you would like to buy: ",
            validate: function(value) {
              if (parseFloat(value) % 1 === 0 && parseInt(value) > 0) {
                return true;
            }
              return false;
            }
        }
    ]).then(function(response) {
        checkProductQuantity(parseInt(response.idToBuy), parseInt(response.quantityToBuy));
    });
}

function checkProductQuantity(id, quantity) {
    var query = "SELECT stock_quantity FROM products WHERE item_id=?";
    connection.query(query, id, function(err, res) {
            if (err) throw err;
            var quantityInStock = res[0].stock_quantity;
            if (quantity > quantityInStock) {
                console.log("Insufficient quantity!  Please change the product or quantity before placing your order.");
                promptCustomerToPlaceOrder();
            }
            else {
                var quantityRemaining = quantityInStock - quantity;
                updateDBWithRemainingQuantity(id, quantity, quantityRemaining); 
            }
        }
    );
}

function updateDBWithRemainingQuantity(id, quantity, quantityRemaining) {
    var query = "UPDATE products SET stock_quantity=? WHERE item_id=?";
    connection.query(query, [quantityRemaining, id], function(err, res) {
            if (err) throw err;
            showCustomerCostOfPurchase(id, quantity);
        }
    );
}

function showCustomerCostOfPurchase(id, quantity) {
    var query = "SELECT price FROM products WHERE item_id=?";
    connection.query(query, id, function(err, res) {
        if (err) throw err;
        var cost = res[0].price * quantity;
        console.log("Order successfully placed!  Here is the total cost of your purchase: $" + 
            parseFloat(cost).toFixed(2));
        promptCustomerToPlaceOrder();
        }
    );
}