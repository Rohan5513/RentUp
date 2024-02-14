-- Sample Data for Users Table
INSERT INTO users (email, password, name, contact_number, profile_picture, properties_left) VALUES
('john.doe@example.com', 'password123', 'John Doe', '+91 1234567890', NULL, 8),
('sara.smith@example.com', 'password456', 'Sara Smith', '+91 9876543210', NULL, 3),
('mike.jones@example.com', 'password789', 'Mike Jones', '+91 7777777777', NULL, NULL),
('emma.johnson@example.com', 'password012', 'Emma Johnson', '+91 9999999999', NULL, NULL),
('alex.wilson@example.com', 'password345', 'Alex Wilson', '+91 6666666666', NULL, NULL),
('grace.miller@example.com', 'password678', 'Grace Miller', '+91 5555555555', NULL, NULL),
('neha.verma@example.com', 'password789', 'Neha Verma', '+91 8888888888', NULL, 7),
('vikram.singh@example.com', 'password012', 'Vikram Singh', '+91 7777777777', NULL, 2),
('sonali.rai@example.com', 'password345', 'Sonali Rai', '+91 9999999999', NULL, NULL),
('amit.kumar@example.com', 'password678', 'Amit Kumar', '+91 6666666666', NULL, NULL),
('tanvi.sharma@example.com', 'password901', 'Tanvi Sharma', '+91 5555555555', NULL, NULL),
('rahul.verma@example.com', 'password234', 'Rahul Verma', '+91 4444444444', NULL, NULL);

-- Sample Data for Cities Table
INSERT INTO cities (city_name) VALUES
('Pune'),
('Mumbai'),
('Delhi'),
('Bangalore'),
('Hyderabad'),
('Chennai'),
('Kolkata'),
('Ahmedabad');

-- Sample Data for Areas Table
INSERT INTO areas (area_name, city_id) VALUES
('Kothrud', 1),
('Bandra', 2),
('Connaught Place', 3),
('Whitefield', 4),
('Viman Nagar', 1),
('Juhu', 2),
('Dwarka', 3),
('Koramangala', 4),
('Aundh', 1),
('Malleshwaram', 4),
('Saket', 3),
('Colaba', 2),
('Chanakyapuri', 3),
('Andheri', 2),
('Indiranagar', 4),
('Koregaon Park', 1),
('Banjara Hills', 5),
('T. Nagar', 6),
('Salt Lake City', 7),
('Gandhinagar', 8),
('Madhapur', 5),
('Adyar', 6),
('New Town', 7),
('S.G. Highway', 8),
('Kondapur', 5),
('Velachery', 6),
('Howrah', 7),
('Maninagar', 8),
('Secunderabad', 5),
('Mylapore', 6),
('Rajarhat', 7),
('Ambawadi', 8);

-- Sample Data for Properties Table
INSERT INTO properties (property_images, address, area_id, user_id, status) VALUES
(NULL, 'Sample Address 1', 1, 1, 'AVAILABLE'),
(NULL, 'Sample Address 2', 2, 2, 'AVAILABLE'),
(NULL, 'Sample Address 3', 3, 3, 'AVAILABLE'),
(NULL, 'Sample Address 4', 4, 4, 'RENTED'),
(NULL, 'Sample Address 5', 5, 5, 'RENTED'),
(NULL, 'Sample Address 6', 6, 6, 'AVAILABLE'),
(NULL, 'Sample Address 7', 7, 7, 'AVAILABLE'),
(NULL, 'Sample Address 8', 8, 8, 'AVAILABLE'),
(NULL, 'Sample Address 9', 9, 9, 'RENTED'),
(NULL, 'Sample Address 10', 10, 10, 'RENTED'),
(NULL, 'Sample Address 11', 11, 11, 'AVAILABLE'),
(NULL, 'Sample Address 12', 12, 12, 'AVAILABLE');

-- Sample Data for Visits Table
INSERT INTO visits (user_id, property_id, visit_date) VALUES
(1, 1, '2024-02-14'),
(2, 2, '2024-02-14'),
(3, 3, '2024-02-14'),
(4, 4, '2024-02-14'),
(5, 5, '2024-02-14'),
(6, 6, '2024-02-14'),
(1, 2, '2024-02-15'),
(2, 3, '2024-02-15'),
(3, 4, '2024-02-15'),
(4, 5, '2024-02-15'),
(5, 6, '2024-02-15'),
(6, 1, '2024-02-15'),
(1, 3, '2024-02-16'),
(2, 4, '2024-02-16'),
(3, 5, '2024-02-16'),
(4, 6, '2024-02-16'),
(5, 1, '2024-02-16'),
(6, 2, '2024-02-16'),
(1, 4, '2024-02-17'),
(2, 5, '2024-02-17');

...........................................................
-- Sample Data for Properties Table with Additional Columns
INSERT INTO properties (property_images, address, area_id, user_id, status, tenant_type, flat_type) VALUES
(NULL, 'Sample Address 1', 1, 1, 'AVAILABLE', 'BOTH', '_2BHK'),
(NULL, 'Sample Address 2', 2, 2, 'AVAILABLE', 'FAMILY', '_1BHK'),
(NULL, 'Sample Address 3', 3, 3, 'AVAILABLE', 'BACHELOR', '_3BHK'),
(NULL, 'Sample Address 4', 4, 4, 'RENTED', 'FAMILY', '_2BHK'),
(NULL, 'Sample Address 5', 5, 5, 'RENTED', 'BOTH', '_RK'),
(NULL, 'Sample Address 6', 6, 6, 'AVAILABLE', 'BACHELOR', '_1BHK'),
(NULL, 'Sample Address 7', 7, 7, 'AVAILABLE', 'BOTH', '_3BHK'),
(NULL, 'Sample Address 8', 8, 8, 'AVAILABLE', 'FAMILY', '_2BHK'),
(NULL, 'Sample Address 9', 9, 9, 'RENTED', 'BACHELOR', '_1BHK'),
(NULL, 'Sample Address 10', 10, 10, 'RENTED', 'FAMILY', '_2BHK'),
(NULL, 'Sample Address 11', 11, 11, 'AVAILABLE', 'BOTH', '_3BHK'),
(NULL, 'Sample Address 12', 12, 12, 'AVAILABLE', 'FAMILY', '_2BHK');

