-- Cities Table
CREATE TABLE City (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- Categories Table
CREATE TABLE Category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- Users Table
CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    role ENUM('client', 'partner') NOT NULL,
    avatar_url VARCHAR(512),
    join_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    avg_rating_as_client DECIMAL(3,2) DEFAULT 0.00,
    avg_rating_as_partner DECIMAL(3,2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    longitude DOUBLE,
    latitude DOUBLE,
    city_id INT,
    FOREIGN KEY (city_id) REFERENCES City(id)
);

-- Admins Table
CREATE TABLE Admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Listings Table
CREATE TABLE Listing (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price_per_day DECIMAL(10,2) NOT NULL,
    status ENUM('active', 'archived', 'inactive') DEFAULT 'active',
    is_premium BOOLEAN DEFAULT FALSE,
    premium_start_date DATETIME,
    premium_end_date DATETIME,
    longitude DOUBLE,
    latitude DOUBLE,
    avg_rating DECIMAL(3,2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    delivery_option BOOLEAN DEFAULT FALSE,
    category_id INT,
    city_id INT,
    partner_id INT,
    FOREIGN KEY (category_id) REFERENCES Category(id),
    FOREIGN KEY (city_id) REFERENCES City(id),
    FOREIGN KEY (partner_id) REFERENCES User(id)
);

-- Reservations Table
CREATE TABLE Reservation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    status ENUM('pending', 'confirmed', 'ongoing', 'canceled', 'completed') DEFAULT 'pending',
    contract_url VARCHAR(512),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    delivery_option BOOLEAN DEFAULT FALSE,
    client_id INT,
    partner_id INT,
    listing_id INT,
    FOREIGN KEY (client_id) REFERENCES User(id),
    FOREIGN KEY (partner_id) REFERENCES User(id),
    FOREIGN KEY (listing_id) REFERENCES Listing(id)
);

-- Availability Table
CREATE TABLE Availability (
    listing_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    PRIMARY KEY (listing_id, start_date, end_date),
    FOREIGN KEY (listing_id) REFERENCES Listing(id) ON DELETE CASCADE
);

-- Images Table
CREATE TABLE Image (
    id INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(512) NOT NULL,
    listing_id INT,
    FOREIGN KEY (listing_id) REFERENCES Listing(id) ON DELETE CASCADE
);

-- Reviews Table
CREATE TABLE Review (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    type ENUM('forObject', 'forClient', 'forPartner') NOT NULL,
    reviewer_id INT,
    reviewee_id INT,
    reservation_id INT,
    listing_id INT,
    FOREIGN KEY (reviewer_id) REFERENCES User(id),
    FOREIGN KEY (reviewee_id) REFERENCES User(id),
    FOREIGN KEY (reservation_id) REFERENCES Reservation(id),
    FOREIGN KEY (listing_id) REFERENCES Listing(id)
);

-- Notifications Table
CREATE TABLE Notification (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    type ENUM('reservation', 'review', 'reminder', 'system') NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Payments Table
CREATE TABLE Payment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    partner_id INT,
    listing_id INT,
    FOREIGN KEY (partner_id) REFERENCES User(id),
    FOREIGN KEY (listing_id) REFERENCES Listing(id)
);