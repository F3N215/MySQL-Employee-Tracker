SELECT employees.id, first_name, last_name, positions.title, positions.salary, departments.name FROM employees LEFT JOIN positions ON employees.position_id = positions.id LEFT JOIN departments ON positions.department_id = departments.id  WHERE departments.name = 'Sales';