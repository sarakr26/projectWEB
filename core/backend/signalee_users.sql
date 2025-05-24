-- Active: 1744145304842@@127.0.0.1@3306@mvc_web2
ALTER TABLE users ADD COLUMN signalee_count INT NOT NULL DEFAULT 0;

CREATE TABLE partner_signalees (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  reporter_id BIGINT UNSIGNED NOT NULL,
  partner_id BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_report (reporter_id, partner_id),
  FOREIGN KEY (reporter_id) REFERENCES users(id),
  FOREIGN KEY (partner_id) REFERENCES users(id)
);