INSERT INTO city (city_name) VALUES
('Pune'),
('Mumbai'),
('Delhi'),
('Bangalore'),
('Hyderabad'),
('Chennai'),
('Kolkata'),
('Ahmedabad');



INSERT INTO area (area_name, city_id) VALUES
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
('Madhapur', 5),
('Adyar', 6),
('New Town', 7),

('Kondapur', 5),
('Velachery', 6),
('Howrah', 7),

('Secunderabad', 5),
('Mylapore', 6),
('Rajarhat', 7);


INSERT INTO users (email, password, name, contact_number, properties_left, subscription_end_date, subscription_start_date, subscription_type) VALUES
('john.doe@example.com', 'f91e15dbec69fc40f81f0876e7009648', 'John Doe', '1234567890', 5, '2023-12-31', '2023-01-01', NULL),
('sara.smith@example.com', 'f91e15dbec69fc40f81f0876e7009648', 'Sara Smith', '9876543210', 5, '2023-12-31', '2023-01-01', NULL),
('mike.jones@example.com', 'f91e15dbec69fc40f81f0876e7009648', 'Mike Jones', '7777777777', 5, '2023-12-31', '2023-01-01', NULL),
('emma.johnson@example.com', 'f91e15dbec69fc40f81f0876e7009648', 'Emma Johnson', '9999999999', 5, '2023-12-31', '2023-01-01', NULL),
('alex.wilson@example.com', 'f91e15dbec69fc40f81f0876e7009648', 'Alex Wilson', '6666666666', 5, '2023-12-31', '2023-01-01', NULL),
('grace.miller@example.com', 'f91e15dbec69fc40f81f0876e7009648', 'Grace Miller', '5555555555', 5, '2023-12-31', '2023-01-01', NULL),
('neha.verma@example.com', 'f91e15dbec69fc40f81f0876e7009648', 'Neha Verma', '8888888888', 5, '2023-12-31', '2023-01-01', NULL),
('vikram.singh@example.com', 'f91e15dbec69fc40f81f0876e7009648', 'Vikram Singh', '7777777777', 5, '2023-12-31', '2023-01-01', NULL),
('sonali.rai@example.com', 'f91e15dbec69fc40f81f0876e7009648', 'Sonali Rai', '9999999999', 5, '2023-12-31', '2023-01-01', NULL),
('amit.kumar@example.com', 'f91e15dbec69fc40f81f0876e7009648', 'Amit Kumar', '6666666666', 5, '2023-12-31', '2023-01-01', NULL),
('tanvi.sharma@example.com', 'f91e15dbec69fc40f81f0876e7009648', 'Tanvi Sharma', '5555555555', 5, '2023-12-31', '2023-01-01', NULL),
('rahul.verma@example.com', 'f91e15dbec69fc40f81f0876e7009648', 'Rahul Verma', '4444444444', 5, '2023-12-31', '2023-01-01', NULL);



INSERT INTO properties (address, carpet_area, flat_type, price, status, tenant_type, area_id, user_id) VALUES
('123 Main St, Kothrud', 800, '_2BHK', 20000, 'AVAILABLE', 'FAMILY', 1, 1),
('456 Elm St, Bandra', 1000, '_3BHK', 35000, 'AVAILABLE', 'FAMILY', 2, 2),
('789 Oak St, Connaught Place', 600, '_1BHK', 15000, 'AVAILABLE', 'BACHELOR', 3, 3),
('321 Pine St, Whitefield', 1200, '_3BHK', 30000, 'RENTED', 'FAMILY', 4, 4),
('987 Maple St, Viman Nagar', 700, '_2BHK', 18000, 'AVAILABLE', 'BACHELOR', 5, 5),
('654 Cedar St, Juhu', 900, '_3BHK', 40000, 'AVAILABLE', 'FAMILY', 6, 6),
('123 Cherry St, Dwarka', 800, '_2BHK', 22000, 'AVAILABLE', 'FAMILY', 7, 7),
('456 Walnut St, Koramangala', 1100, '_3BHK', 35000, 'AVAILABLE', 'FAMILY', 8, 8),
('789 Pineapple St, Aundh', 750, '_2BHK', 20000, 'AVAILABLE', 'BACHELOR', 9, 9),
('321 Banana St, Malleshwaram', 950, '_3BHK', 32000, 'RENTED', 'FAMILY', 10, 10);