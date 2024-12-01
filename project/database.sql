CREATE DATABASE IF NOT EXISTS booking_system;
USE booking_system;

CREATE TABLE vendors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  move_date DATE NOT NULL,
  pickup_location TEXT NOT NULL,
  drop_location TEXT NOT NULL,
  pickup_lift ENUM('Yes', 'No') NOT NULL,
  pickup_floors INT,
  drop_lift ENUM('Yes', 'No') NOT NULL,
  drop_floors INT,
  packaging_type ENUM('Single-Layered', 'Double-Layered', 'Wooden') NOT NULL,
  status ENUM('pending', 'confirmed', 'assigned', 'completed', 'cancelled') DEFAULT 'pending',
  vendor_id INT,
  cost DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vendor_id) REFERENCES vendors(id)
);

CREATE TABLE booking_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id INT NOT NULL,
  item_name VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);