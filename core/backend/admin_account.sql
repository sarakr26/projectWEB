INSERT INTO admins (username, email, password, created_at, updated_at)
VALUES (
    'admin',
    'admin@admin.com',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- This is the hashed version of 'password'
    NOW(),
    NOW()
);