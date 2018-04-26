// Prompts for Customer
const customer = [
    {
        name: "question",
        message: "What would you like to do?",
        type: "list",
        choices: ["Select an item", "Exit"]
    }    
];

const shopping = [
    {
        name: "question",
        message: "Which item would you like to purchase? (Input Item ID)",
        type: "input"
    }
];

const quantity = [
    {
        name: "question",
        message: "How many would you like to purchase? (Input quantity amount)",
        type: "input"
    }
];
/** End of Customer Prompts */

// Prompts for Manager
const prompt = [{
    name: "option",
    message: "What would you like to do?",
    type: "list",
    choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Update Inventory",
        "Add New Product",
        "Exit"
    ]
}];

const update = [{
    name: "productID",
    message: "Select Product ID",
    type: "input"
},
{
    name: "quantity",
    message: "How many would you like to add?",
    type: "input"
}];

const add = [{
    name: "product",
    message: "What product would you like to add?",
    type: "input"
},
{
    name: "department",
    message: "What department does this belong to?",
    choices: [
        "Automotive",
        "Books and Digital Media",
        "Clothing",        
        "Digital Games and Apps",
        "Electronics",
        "Food and Groceries",
        "Health and Beauty",
        "Home Furnishing",
        "Home Goods",
        "Lawn and Garden",
        "Movies and Music",
        "Toys and Games"
    ],
    type: "list"
},
{
    name: "quantity",
    message: "How many would you like to add?",
    type: "input"
},
{
    name: "price",
    message: "How much does this product cost (in U.S. Dollars)?",
    type: "input"
}];
/** End of Manager Prompts */


// Supervisor Prompts
const supervisor = [{
    name: "question",
    message: "Select An Option...",
    choices: ["View Product Sales by Department", "View Departments", "Create New Department", "Exit"],
    type: "list"
}];

const department = [{
    name: "name",
    message: "Name of Department",
    type: "input"
},
{
    name: "overhead",
    message: "Department Ovehead Costs",
    type: "input"
}];
/** End of Supervisor Prompts */

// Exports
module.exports = { customer, shopping, quantity, prompt, update, add, supervisor, department };