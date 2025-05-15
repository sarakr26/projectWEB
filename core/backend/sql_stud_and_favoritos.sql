-- Active: 1744145304842@@127.0.0.1@3306@mvc_web2
-- Add 'status' column to users table
ALTER TABLE users
ADD COLUMN status ENUM('active', 'archived') NOT NULL DEFAULT 'active' AFTER role;


ALTER TABLE users ENGINE=InnoDB;
ALTER TABLE listings ENGINE=InnoDB;

-- Create liked_listings table
CREATE TABLE liked_listings (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    listing_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_listing (user_id, listing_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (listing_id) REFERENCES listings(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

