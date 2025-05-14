-- Cities Table
CREATE TABLE cities (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(191) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);


-- Categories Table
CREATE TABLE categories (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(191) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);

-- Users Table
CREATE TABLE users (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(191) NOT NULL,
    username VARCHAR(191) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(191) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NULL,
    address TEXT NULL,
    role ENUM('client', 'partner') NOT NULL,
    avatar_url VARCHAR(512) NULL,
    join_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    avg_rating_as_client DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    avg_rating_as_partner DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    review_count_as_client INT NOT NULL DEFAULT 0,
    review_count_as_partner INT NOT NULL DEFAULT 0,
    report_count INT NOT NULL DEFAULT 0,
    longitude DOUBLE NULL,
    latitude DOUBLE NULL,
    city_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (city_id) REFERENCES cities(id)
);

-- Admins Table
CREATE TABLE admins (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(191) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(191) UNIQUE NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);

-- Listings Table
CREATE TABLE listings (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    price_per_day DECIMAL(10,2) NOT NULL,
    status ENUM('active', 'archived', 'inactive') NOT NULL DEFAULT 'active',
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    premium_start_date TIMESTAMP NULL,
    premium_end_date TIMESTAMP NULL,
    longitude DOUBLE NULL,
    latitude DOUBLE NULL,
    avg_rating DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    review_count INT NOT NULL DEFAULT 0,
    delivery_option BOOLEAN NOT NULL DEFAULT FALSE, 
    priority INT NOT NULL DEFAULT 4,
    category_id BIGINT UNSIGNED NULL,
    city_id BIGINT UNSIGNED NULL,
    partner_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (city_id) REFERENCES cities(id),
    FOREIGN KEY (partner_id) REFERENCES users(id)
);

-- Reservations Table
CREATE TABLE reservations (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NULL DEFAULT NULL,
    status ENUM('pending', 'confirmed', 'ongoing', 'canceled', 'completed') NOT NULL DEFAULT 'pending',
    contract_url VARCHAR(512) NULL,
    delivery_option BOOLEAN NOT NULL DEFAULT FALSE,
    client_id BIGINT UNSIGNED NOT NULL,
    partner_id BIGINT UNSIGNED NOT NULL,
    listing_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (client_id) REFERENCES users(id),
    FOREIGN KEY (partner_id) REFERENCES users(id),
    FOREIGN KEY (listing_id) REFERENCES listings(id)
);

-- Availabilities Table
CREATE TABLE availabilities (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    listing_id BIGINT UNSIGNED NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    UNIQUE KEY (listing_id, start_date, end_date),
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

-- Images Table
CREATE TABLE images (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(512) NOT NULL,
    listing_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

-- Reviews Table
CREATE TABLE reviews (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NULL,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    type ENUM('forObject', 'forClient', 'forPartner') NOT NULL,
    reviewer_id BIGINT UNSIGNED NOT NULL,
    reviewee_id BIGINT UNSIGNED NULL,
    reservation_id BIGINT UNSIGNED NULL,
    listing_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (reviewer_id) REFERENCES users(id),
    FOREIGN KEY (reviewee_id) REFERENCES users(id),
    FOREIGN KEY (reservation_id) REFERENCES reservations(id),
    FOREIGN KEY (listing_id) REFERENCES listings(id)
);

-- Notifications Table
CREATE TABLE notifications (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    type ENUM('reservation', 'review', 'reminder', 'system') NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Payments Table
CREATE TABLE payments (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
    partner_id BIGINT UNSIGNED NOT NULL,
    listing_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (partner_id) REFERENCES users(id),
    FOREIGN KEY (listing_id) REFERENCES listings(id)
);