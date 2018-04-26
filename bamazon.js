// Dependencies
const chalk = require("chalk");
const inquirer = require("inquirer");
const prompts = require("./prompts");
const server = require("./sqlserver");
const Table = require("cli-table");

// Global Variables
let count = 0;
let departmentName = "";
let inventoryCount = 0;
let overhead = 0;
let price = 0;
let productName = "";
let productID = 0;
let purchaseTotal = 0;
let quantity = 0;

// Global Flags to Determine User Prompts
let customerFlag = false;
let managerFlag = false;
let supervisorFlag = false;

// MySQL Statements
const departmentsQuery = `SELECT * FROM departments`;
const inventoryQuery = `SELECT * FROM products`;
const lowProductQuery = `SELECT * FROM products WHERE stock_quantity < 5`;
const purchaseQuery = `SELECT product_name, price, stock_quantity FROM products WHERE item_id = ${productID}`;
const viewSalesQuery = `SELECT departments.department_id, departments.department_name, sum(departments.over_head_cost) AS total_overhead, SUM(products.product_sales) AS total_sales FROM departments INNER JOIN products ON products.department_name = departments.department_name GROUP BY department_id`;


// Checks Current Flag for Prompts to Display
function displayUserPortal(userView) {
    switch (userView) {
        case ("customer"):
            customerFlag = true;
            console.log("\n");
            console.log("------------------------------------------------------------------------------------");
            console.log(`|   ${chalk.yellow("Welcome to Bamazon! Check out our featured items")}                               |`);
            console.log("------------------------------------------------------------------------------------");
            createTable();
            break;
        case ("manager"):
            managerFlag = true;
            console.log("\n");
            console.log(`   ${chalk.magenta("Welcome to the Bamazon Manager Portal")}`);
            console.log("------------------------------------------------------------------------------------");
            displayUserPrompts(prompts.prompt);
            break;
        case ("supervisor"):
            supervisorFlag = true;
            console.log("\n");
            console.log(`   ${chalk.green("Welcome to the Bamazon Supervisor Portal")}`);
            console.log("------------------------------------------------------------------------------------");
            displayUserPrompts(prompts.supervisor);
            break;
        default:
            console.log("Bamazon appreciates your loyalty!");
            return server.terminateConnection();
            break;
    }
}

// Execute Prompts Based on Current Flag
function displayUserPrompts(prompt) {

    // If Customer, Display Customer Portal
    if (customerFlag) {
        let table = new Table({
            head: [
                // chalk.yellow("Item ID"),
                chalk.yellow("Product Name"),
                chalk.yellow("Quantity"),
                chalk.yellow("Price")
            ],
            colWidths: [60, 10, 10]
        });
        if (count === 0) {
            inquirer.prompt(prompt).then(answer => {
                if (answer.question < 1 && answer.question > inventoryCount) {
                    console.log("You have made an invalid selection. Please try again");
                    return displayUserPrompts(prompts.shopping);
                }
                productID = answer.question;
                count++;
                return displayUserPrompts(prompts.quantity);
            });
        }
        if (count === 1) {
            count = 0;
            inquirer.prompt(prompt).then(answer => {
                quantity = answer.question;
                const purchaseQuery = `SELECT product_name, price, stock_quantity FROM products WHERE item_id = ${productID}`;
                return executeQuery(purchaseQuery, table);
            });
        }
    }

    // If Manager, Display Manager Portal
    if (managerFlag) {
        inquirer.prompt(prompt).then(answer => {
            switch (answer.option) {
                case ("View Products for Sale"):
                    count = 1;
                    createTable();;
                    break;
                case ("View Low Inventory"):
                    count = 2;
                    createTable();
                    break;
                case ("Update Inventory"):
                    count = 3;
                    createTable();
                    break;
                case ("Add New Product"):
                    inquirer.prompt(prompts.add).then(answers => {
                        productName = answers.product;
                        departmentName = answers.department;
                        quantity = answers.quantity;
                        price = answers.price;

                        const addProductQuery = `INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES (\'${productName}\', \'${departmentName}\', ${price}, ${quantity}, 0)`;
                        updateInventory(addProductQuery);
                    });
                    break;
                case ("Exit"):
                default:
                    count = 0;
                    console.log(chalk.green("Logging off from Bamazon Manager Portal...done!"));
                    server.terminateConnection();
                    break;
            }
        });
    }

    // If Supervisor, Display Supervisor Portal
    if (supervisorFlag) {
        inquirer.prompt(prompt).then(answers => {
            if (count === 0) {
                switch (answers.question) {
                    case ("View Product Sales by Department"):
                        return createTable();
                        break;
                    case ("View Departments"):
                        count++;
                        return createTable();
                        break;
                    case ("Create New Department"):
                        count++;
                        return displayUserPrompts(prompts.department);
                        break;
                    case ("Exit"):
                    default:
                        console.log(chalk.green("Thank you for your loyalty!"));
                        return server.terminateConnection();
                        break;
                }
            }
            if (count === 1) {
                count = 0;
                departmentName = answers.name;
                overhead = answers.overhead;
                const newDepartmentQuery = `INSERT INTO departments (department_name, over_head_cost) VALUES(\'${departmentName}\', ${overhead})`;
                updateInventory(newDepartmentQuery);
            }
        });
    }
}

// Update Inventory Based On Customer, Manager and Supervisor Changes
function updateInventory(sqlQuery) {
    // Query Database
    server.connection.query(sqlQuery, (error, results) => {
        if (error) { throw error; }
        if (customerFlag) {
            // Prompt Customer to Keep Shopping or Exit
            inquirer.prompt(prompts.customer).then(answer => {
                if (answer.question === "Select an item") {
                    quantity = 0;
                    return createTable();
                }
                else {
                    console.log(chalk.green("Thank you for shopping at Bamazon!"));
                    return server.terminateConnection();
                }
            });
        }
        if (managerFlag) {
            count = 1;
            createTable();
        }
        if (supervisorFlag) {
            displayUserPrompts(prompts.supervisor);
        }
    });
    return true;
}

// Display Requested Results in Table for Customer, Manager or Supervisor
function executeQuery(sqlQuery, table) {
    // Query Database
    server.connection.query(sqlQuery, (error, results) => {
        inventoryCount = results.length;
        if (error) { throw error };

        // Validate Customer Selection, Update Database, Add Contents to Table
        if (customerFlag) {
            purchaseTotal = results[0].price * quantity;
            if (quantity > 0) {
                if (quantity > results[0].stock_quantity) {
                    console.log(chalk.red("\nSorry, but we could not fulfill your request due to insufficient stock. Please try your selection again."));
                    quantity = 0;
                    createTable();
                }
                else {
                    results.forEach(result => {
                        table.push([
                            result.product_name,
                            quantity,
                            (result.price * quantity).toFixed(2)
                        ]);
                    });
                    console.log(chalk.green("\nCongratulations! You have purchased the following:\n"));
                    console.log(`${table.toString()}\n`);
                    const purchaseUpdateQuery = `UPDATE products SET stock_quantity = stock_quantity - ${quantity}, product_sales = product_sales + ${purchaseTotal} WHERE item_id = ${productID}`;
                    updateInventory(purchaseUpdateQuery);
                }
            }
            else {
                results.forEach(result => {
                    table.push([
                        result.item_id,
                        result.product_name,
                        result.price
                    ]);
                });
                console.log(table.toString());
                return displayUserPrompts(prompts.shopping);
            }
        }

        // Update Table Based On Manager Selection
        if (managerFlag) {
            results.forEach(result => {
                table.push([
                    result.item_id,
                    result.product_name,
                    result.department_name,
                    result.price,
                    result.stock_quantity
                ]);
            });
            console.log(table.toString());
            if (count === 1 || count === 2) { displayUserPortal("manager"); }

            if (count === 3) {
                inquirer.prompt(prompts.update).then(answer => {
                    productID = answer.productID;
                    quantity = answer.quantity;
                    const managerUpdateQuery = `UPDATE products SET stock_quantity = stock_quantity + ${quantity} WHERE item_id = ${productID}`;
                    updateInventory(managerUpdateQuery);
                });
            }
        }

        // Update Table Based on Supervisor Selection
        if (supervisorFlag) {
            if (count === 1) {
                results.forEach(result => {
                    table.push([
                        result.department_id,
                        result.department_name,
                        result.over_head_cost
                    ]);
                });
                count = 0;
            }
            else {
                results.forEach(result => {
                    table.push([
                        result.department_id,
                        result.department_name,
                        result.total_overhead,
                        result.total_sales,
                        result.total_sales - result.total_overhead
                    ]);
                });
            }
            console.log(table.toString());
            return displayUserPrompts(prompts.supervisor);
        }
    });
}

// Create Table for Customer, Manager or Supervisor Based On Request
function createTable() {
    // Create Tables for Customer to View Available Items or Product Purchased
    if (customerFlag) {
        if (quantity > 0) {
            let table = new Table({
                head: [
                    chalk.yellow("Product Name"),
                    chalk.yellow("Price"),
                    chalk.yellow("Quantity")
                ],
                colWidths: [60, 10, 10]
            });
            executeQuery(purchaseQuery, table);
        }
        else {
            let table = new Table({
                head: [
                    chalk.yellow("Item ID"),
                    chalk.yellow("Product Name"),
                    chalk.yellow("Price"),
                ],
                colWidths: [10, 60, 10]
            });
            executeQuery(inventoryQuery, table);
        }
    }
    // Create Tables for Manager to View Inventory/Changes to Inventory
    if (managerFlag) {
        let table = new Table({
            head: [
                chalk.yellow("Item ID"),
                chalk.yellow("Product Name"),
                chalk.yellow("Department"),
                chalk.yellow("Price"),
                chalk.yellow("In-Stock"),
            ],
            colWidths: [10, 40, 35, 10, 10]
        });
        // View Complete Inventory
        if (count === 1 || count === 3) {
            executeQuery(inventoryQuery, table);
        }
        // View Low Inventory
        if (count === 2) {
            executeQuery(lowProductQuery, table);
        }
    }
    // Create Tables for Supervisor to View Total Sales or All Departments
    if (supervisorFlag) {
        // Table for All Departments
        if (count === 1) {
            let table = new Table({
                head: [
                    chalk.yellow("Department ID"),
                    chalk.yellow("Department Name"),
                    chalk.yellow("Overhead Cost"),
                ],
                colWidths: [20, 40, 20]
            });
            executeQuery(departmentsQuery, table);
        }
        // Table for All Sales
        else {
            let table = new Table({
                head: [
                    chalk.yellow("Department ID"),
                    chalk.yellow("Department Name"),
                    chalk.yellow("Overhead Cost"),
                    chalk.yellow("Product Sales"),
                    chalk.yellow("Total Profit"),
                ],
                colWidths: [20, 50, 20, 20, 20]
            });
            executeQuery(viewSalesQuery, table);
        }
    }
}

module.exports = { displayUserPortal };