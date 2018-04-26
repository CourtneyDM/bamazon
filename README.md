# Bamazon - Shopping in DOS-Style

A NodeJS Command-Line Shopping Experience

## Overview

Bamazon is a command-line NodeJS application that allows interaction for a customer, manager or supervisor. Each user experience is different based on which application is chosen - bamazonCustomer.js, bamazonManager.js or bamazonSupervisor.js.

## Getting Started

### Bamazon Database

In order to interact with the Bamazon database, one must first execute the __bamazon.sql__ file located in the repository. This file will:

* Drop any existing bamazon database
* Create _bamazon.db_ database
* Create two tables: __Departments__ and __Product__
* Create pre-defined departments
* Populate inventory with pre-defined products

### Dependencies

Initialize your folder using _npm init_ and install the dependencies using _npm install_. Once completed, you will be ready to run any of the Bamazon javascript files using _node bamazonFileOfChoice.js_.

* __For a list of Node applications used in the application see the _Resources_ section below__

## Functionality

### Customer Experience

Upon launch, the _customer_ is greeted with a welcome message, as well as a table containing the items currently in the Bamazon inventory. The _customer_ is asked to input the Item ID of the product they would like to purchase. Once the product has been selected, the _customer_ is then asked to provide a number for the quantity they would like to purchase. Once the _customer_ has finished their inputs, a table appears containing the details of their order - Product Name, Quantity, Price. Once their selection has been made, the _customer_ has the option to select another item or end their shopping experience.

* __NOTE__: if the _customer's_ quantity cannot be fulfilled or an invalid ID was provided, a message will appear prompting the _customer_ to try their selection again.

### Manager Portal

The _Manager Portal_ provides an opportunity for the _manager_ to perform the following tasks:

* View Products for Sale
* View Low Inventory (products whose quantity is less than 5)
* Update Inventory
* Add New Product

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

Here, the _manager_ is able to update the quantity for any item currently in inventory. The inventory table is generated, allowing the _manager_ to identify which product they want to modify by selecting that product's ID. Once they have inputed the number of items to add, they table displays the inventory with the new changes. __NOTE__: the _manager_ has the ability to input negative numbers in the event that quantity is to be removed from the inventory.

#### Add New Products

The _manager_ has the ability to add new product to the inventory by selecting this option. The _manager_ will be asked to input the name of the product, select the department the product belongs to (a pre-defined list), how many to add to inventory and the price in U.S. dollars (no currency symbols). Once completed, the table is regenerated with the newly added product and its details.

#### Copyright

<p>Courtney Montgomery &copy 2018</p>