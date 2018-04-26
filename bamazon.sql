DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    item_id INT(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) DEFAULT 0,
    stock_quantity INT DEFAULT 0,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('MacBook Pro 13', 'Electronics, Computers & Office', 1799.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Full Stack Development for Dummies', 'Books and Digital Media', 39.99, 21);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Star Trek III', 'Movies, Music & Games', 19.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Trainspotting', 'Movies, Music & Games', 7.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Simon', 'Movies, Music & Games', 14.99, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Connect 4', 'Movies, Music & Games', 14.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Minecraft', 'App Store', 6.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('iPhone X', 'Electronics, Computers & Office', 999.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Samsung Galaxy Note', 'Electronics, Computers & Office', 899.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('STP Fuel Tank Cleaner', 'Automotive & Industrial', 4.99, 30);

CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_cost INT DEFAULT 0,
    PRIMARY KEY(department_id)
);

ALTER TABLE products
ADD product_sales DECIMAL (10,2) NOT NULL DEFAULT 0;

INSERT INTO departments (department_name, over_head_cost)
VALUES 
('Automotive & Industrial', 100),
('Books and Digital Media', 5000),
('Clothing, Shoes & Jewelry', 8000),
('App Store', 6500),
('Electronics, Computers & Office', 150000),
('Food & Groceries', 7500),
('Health & Beauty', 3500),
('Home, Garden & Tools', 10000),
('Movies, Music & Games', 6500),
('Toys, Kids and Baby', 300);