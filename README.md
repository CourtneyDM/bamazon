# Bamazon - Shopping in DOS-Style

A NodeJS Command-Line Shopping Experience

## Overview

Bamazon is a command-line NodeJS application that accepts interaction from a _customer_, _manager_ or _supervisor_. Each user experience is different based on which application is chosen - _bamazonCustomer.js_, _bamazonManager.js_ or _bamazonSupervisor.js._ The back-end uses MySQL; if you are unfamiliar with setting up or using MySQL, please visit their [_Getting Started with MySQL Documention._](https://dev.mysql.com/doc/mysql-getting-started/en/)

## Getting Started

### Create Bamazon Database

In order to interact with the Bamazon database, one must first execute the __bamazon.sql__ file located in the repository. This file will perform the following tasks (using MySQL commands):

* Drop any existing bamazon database (should one exist)
* Create _bamazon.db_ database
* Create two tables: __Departments__ and __Products__
* Populate _Departments_ table with pre-defined department data
* Populate _Products_ table with pre-defined product data

Connection to the database is establish upon launch of any of these applications. Having said that, the database connection is terminate upon exit of any application. The database server used in the application is MySQL.

### Dependencies

Initialize your folder using _npm init_ and install the dependencies using _npm install_. Once completed, you will be ready to run any of the Bamazon javascript files using _node bamazonFileOfChoice.js_.

* __For a list of Node applications used in the application see the [_Resources_](https://github.com/CourtneyDM/bamazon/blob/master/README.md#resources) section below__

## Functionality

Below you will find descriptions and screenshots of how this application works, based on each user experience.

### Customer Experience

![alt text](https://github.com/CourtneyDM/bamazon/blob/master/screenshots/customer-02.jpeg?raw=true "Customer - Purchase Screen")

Upon launch, the _customer_ is greeted with a welcome message, as well as a table containing the items currently in the Bamazon inventory. The _customer_ is asked to input the Item ID of the product they would like to purchase. Once the product has been selected, the _customer_ is then asked to provide a number for the quantity they would like to purchase. Once the _customer_ has finished their inputs, a table appears containing the details of their order - Product Name, Quantity, Price. Once their selection has been made, the _customer_ has the option to select another item or end their shopping experience.

* __NOTE__: if the _customer's_ quantity cannot be fulfilled or an invalid ID was provided, a message will appear prompting the _customer_ to try their selection again.

### Manager Portal

![alt text](https://github.com/CourtneyDM/bamazon/blob/master/screenshots/manager-03.jpeg?raw=true "Manager - Inventory Views")

The _Manager Portal_ provides an opportunity for the _manager_ to perform the following tasks:

* View Products for Sale
* View Low Inventory (products whose quantity is less than 5)
* Update Inventory
* Add New Product
* Exit

#### View Products for Sale

Choosing this option provides the _manager_ a table view containing the following details of the current inventory:

* Item ID
* Product Name
* Department
* Price
* In-Stock

#### View Low Inventory

Selecting this option provides the _manager_ with a table containing details of the inventory where the quantity available is less than 5.

#### Update Inventory

![alt text](https://github.com/CourtneyDM/bamazon/blob/master/screenshots/manager-04.jpeg?raw=true "Manager - Inventory Update")


Here, the _manager_ is able to update the quantity for any item currently in inventory. The inventory table is generated, allowing the _manager_ to identify which product they want to modify by selecting that product's ID. Once they have inputed the number of items to add, they table displays the inventory with the new changes. __NOTE__: the _manager_ has the ability to input negative numbers in the event that quantity is to be removed from the inventory.

#### Add New Products

![alt text](https://github.com/CourtneyDM/bamazon/blob/master/screenshots/manager-05.jpeg?raw=true "Manager - Add New Product")


The _manager_ has the ability to add new product to the inventory by selecting this option. The _manager_ will be asked to input the name of the product, select the department the product belongs to (a pre-defined list), how many to add to inventory and the price in U.S. dollars (no currency symbols). Once completed, the table is regenerated with the newly added product and its details.

![alt text](https://github.com/CourtneyDM/bamazon/blob/master/screenshots/manager-07.jpeg?raw=true "Manager - Add Product")


### Supervisor Portal

![alt text](https://github.com/CourtneyDM/bamazon/blob/master/screenshots/supervisor-01.jpeg?raw=true "Supervisor - Portal Home")


The _Supervisor Portal_ launches with the following options:

* View Product Sales by Department
* View Departments
* Create New Department
* Exit

#### View Product Sales by Department

![alt text](https://github.com/CourtneyDM/bamazon/blob/master/screenshots/supervisor-02.jpeg?raw=true "Supervisor - View Sales")


This options allows the _supervisor_ to see a breakdown of sales by departemnt. The data displayed is based on items that are in the __current inventory__. Some details the  _supervisor_ can see are: Department Name and ID, Overhead Cost, sum of Product Sales and Total Profit.

#### View Departments

![alt text](https://github.com/CourtneyDM/bamazon/blob/master/screenshots/supervisor-03.jpeg?raw=true "Supervisor - View Departments")

The _supervisor_ can see each department and their overhead cost from this screen.

#### Create New Department

![alt text](https://github.com/CourtneyDM/bamazon/blob/master/screenshots/supervisor-04.jpeg?raw=true "Supervisor - Create New Department")

The _supervisor_ has the ability to create a new department using this option. The required information are:

* Department Name - the name for the new department
* Overhead Cost - the general cost or expenses to maintain new department

![alt text](https://github.com/CourtneyDM/bamazon/blob/master/screenshots/supervisor-05.jpeg?raw=true "Supervisor - List New Department")

#### Exit

Exits the application

### Resources

* [NodeJS](https://nodejs.org/en/): a JavaScript runtime built on Chrome's V8 JavaScript engine

__NodeJS Packages/Dependencies__  
* [Chalk](https://www.npmjs.com/package/chalk): _"Terminal string styling done right"_  
* [CLI-Table](https://www.npmjs.com/package/cli-table): _"This utility allows you to render unicode-aided tables on the command line from your node.js scripts"_  
* [Inquirer](https://www.npmjs.com/package/inquirer): _"A collection of common interactive command line user interfaces"_  
* [MySQL](https://www.npmjs.com/package/mysql): _"This is a node.js driver for mysql. It is written in JavaScript, does not require compiling, and is 100% MIT licensed."_  

## Closing Remarks

This was my first attempt at using any of the NodeJS packages extensively, and by doing so it allowed me to better understand how Inquirer works, massage data using MySQL statements and Javascript, as well as creating tables to display nicely to the console. Having said that, I am by no means an expert at any of the packages used, but I am always willing to answer questions as well as accept positive feedback (constructive criticism). Until next time - enjoy!

---

#### Copyright

<p>Courtney Montgomery &copy 2018</p>
