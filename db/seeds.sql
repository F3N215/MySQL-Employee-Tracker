USE organization;
INSERT INTO departments (name) 
VALUES 
    ('Engineering'),
    ('Sales'),
    ('Marketing'),
    ('Finance'),
    ('Human Resources'),
    ('Legal');

INSERT INTO positions (title, salary, department_id)
VALUES
    ("Software Engineer", 100000, 1),
    ("Senior Software Engineer", 120000, 1),
    ("Sales Representative", 80000, 2),
    ("Sales Manager", 120000, 2),
    ("Marketing Specialist", 70000, 3),
    ("Marketing Manager", 100000, 3),
    ("Accountant", 75000, 4),
    ("Finance Manager", 110000, 4),
    ("HR Specialist", 70000, 5),
    ("HR Manager", 100000, 5),
    ("Legal Assistant", 60000, 6),
    ("Legal Counsel", 90000, 6);

INSERT INTO employees (first_name, last_name, position_id, manager_id)
VALUES
    ('Alice', 'Smith', 1, NULL),
    ('Bob', 'Johnson', 2, 1),
    ('Charlie', 'Brown', 3, NULL),
    ('David', 'White', 4, 3),
    ('Eve', 'Black', 5, NULL),
    ('Frank', 'Green', 6, 5),
    ('Grace', 'Blue', 7, NULL),
    ('Hank', 'Orange', 8, 7),
    ('Ivy', 'Purple', 9, NULL),
    ('Jack', 'Red', 10, 9),
    ('Kelly', 'Yellow', 11, NULL),
    ('Larry', 'Pink', 12, 11);