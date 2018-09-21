# Bamazon-Node-MySQL
Command-line app that creates an Amazon-like storefront using Node.js and MySQL

This app supports 3 levels of viewing and updating data in the "bamazon" database:
1. Customer View
1. Manager View
1. Supervisor View

Once it has been created and populated, the bamazon database will store data as follows:
![Screenshot 1](/images/Screenshot1.png)

## Customer View: (Level 1)
When the program bamazonCustomer.js is run, a bamazon "customer" will be shown a list of products available in the store:
![Screenshot 2](/images/Screenshot2.png)

The user or "customer" can then enter the item number of a product and enter a quantity for that product.  If there is a sufficient quantity of the product in stock, then the customer's order will be placed and the database will be updated accordingly.
![Screenshot 3](/images/Screenshot3.png)

Here we can see that the quantity of the book "Cracking the Coding Interview" decreased from 15 to 11 after an order was placed for 4 copies of the book:
![Screenshot 4](/images/Screenshot4.png)

However, if there is an insufficient quantity of a product in stock to fulfill a customer's order, then the customer will be notified that an order has not been placed and no changes will be made to the database.
![Screenshot 5](/images/Screenshot5.png)

Here we can see that the quantity of Blue Buffalo Cat Food remained the same--it was 2 and now it is still 2--after a customer attempted (unsuccessfully) to place an order for 3 bags of the cat food:
![Screenshot 6](/images/Screenshot6.png)

## Manager View: (Level 2)
When the program bamazonManager.js is run, a bamazon "manager" will be shown a list of options available for viewing or updating products or store inventory:
![Screenshot 7](/images/Screenshot7.png)

Here is a snapshot of the data in the bamazon database:
![Screenshot 8](/images/Screenshot8.png)

And here we can see that the list of products for sale shown to the manager matches up with the data currently stored in the database:
![Screenshot 9](/images/Screenshot9.png)

When the manager chooses to view the products with low inventory, only the products with an inventory of less than 5 are displayed in the new list.
![Screenshot 10](/images/Screenshot10.png)

When the manager chooses to add more of a certain product to the inventory, i.e. adding 6 more copies of the book "Harry Potter and the Sorcerer's Stone), then the change to the inventory will be reflected in the list of products for sale, where we can see that the quantity of this book has increased from 4 copies to 10 copies.  This product is also no longer on the low inventory list once its stock quantity has been updated in the database.
![Screenshot 11](/images/Screenshot11.png)

Finally, the manager can choose to add a new product to the database.  Here we add a new product with the name "Cat Treats" in the department "Pet Supplies" with the price of $12.99 and an initial stock quantity of 5.  This new product can be viewed in the list of products for sale.  It has been automatically assigned the item ID of 11.
![Screenshot 12](/images/Screenshot12.png)

## Supervisor View: (Level 3)
When the program bamazonSupervisor.js is run, a bamazon "supervisor" will be shown a list of options for viewing or updating department data:
![Screenshot 13](/images/Screenshot13.png)

If the supervisor chooses to view product sales by department, then a list will be displayed as follows (product_sales is equal to the sum of the product sales for all products in a given department and total_profit is equal to the product_sales for a given department, less the over_head_costs for that department):
![Screenshot 14](/images/Screenshot14.png)

If the supervisor chooses to create a new department, then he or she can specify the name and over head costs for the new department.  The department will automatically be assigned a department ID.
![Screenshot 15](/images/Screenshot15.png)

Once the new department has been created, then it will show up when the supervisor views product sales by department.  However, the product sales and total profit will be null...
![Screenshot 16](/images/Screenshot16.png)

...until at least one product has been added to the new department.  Once that has happened, then the product sales and total profit can be viewed for that department.
![Screenshot 17](/images/Screenshot17.png)