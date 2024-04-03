USE organization;
INSERT INTO departments (name) 
VALUES 
    ('Engineering');
    ('Sales');
    ('Marketing');
    ('Finance');
    ('Human Resources');
    ('Legal');

INSERT INTO positions (title, salary, department_id);
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