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

Upon launch, the _customer_ is greeted with a welcome message, as well as a table containing the items currently in the Bamazon inventory. The _customer_ is asked to input the Item ID of the product they would like to purchase. Once the product has been selected, the _customer_ is then asked to provide a number for the quantity they would like to purchase. Once the _customer_ has finished their inputs, a table appears containing the details of their order - Product Name, Quantity, Price.

* __NOTE__: if the _customer's_ quantity cannot be fulfilled or an invalid ID was provided, a message will appear prompting the _customer_ to try their selection again.

#### Copyright

<p>Courtney Montgomery &copy 2018</p>