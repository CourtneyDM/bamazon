const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

function establishConnection() {
    connection.connect(error => {
        if (error) { throw error; }
        showInventory();
    });
}

function terminateConnection() {
    return connection.end();
}

module.exports = {
    connection,
    establishConnection,
    terminateConnection
};