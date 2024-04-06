const db = require("../db/connection");
const cTable = require("console.table");
const inquirer = require("inquirer");

// inquirer prompts
const startInquirer = () => {
  inquirer
    .createPromptModule([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a role",
          "Add an employee",
          "Add a department",
          "Update an employee's role",
          "Update an employee's manager",
          "Review employees by manager",
          "Review employees by department",
          "Delete a department",
          "Delete an employee",
          "Quit",
        ],
      },
    ])
    .then((answewrs) => {
      const nextPrompt = answers.toDo;
      if (nextPrompt === "View all departments") {
        viewDepartments();
      }

      if (nextPrompt === "View all roles") {
        viewRoles();
      }

      if (nextPrompt === "View all employees") {
        viewEmployees();
      }

      if (nextPrompt === "Add a role") {
        addRole();
      }

      if (nextPrompt === "Add an employee") {
        addEmployee();
      }

      if (nextPrompt === "Add a department") {
        addDepartment();
      }

      if (nextPrompt === "Update an employee's role") {
        updateEmployeeRole();
      }

      if (nextPrompt === "Update an employee's manager") {
        updateEmployeeManager();
      }

      if (nextPrompt === "Review employees by manager") {
        reviewEmployeesByManager();
      }

      if (nextPrompt === "Review employees by department") {
        reviewEmployeesByDepartment();
      }

      if (nextPrompt === "Delete a department") {
        deleteDepartment();
      }

      if (nextPrompt === "Delete an employee") {
        deleteEmployee();
      }

      if (nextPrompt === "Quit") {
        process.quit();
      }
    });
};

const viewDepartments = () => {
  {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      console.log("\n");
      console.table(rows);
      startInquirer();
    });
  }
};

const viewRoles = () => {
  {
    const sql = `SELECT positions.id,
        positions.title, positions.salary, department.name AS department
        FROM positions
        LEFT JOIN department ON positions.department_id = department.id`;
    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      console.log("\n");
      console.table(rows);
      return startInquirer();
    });
  }

  const viewEmployees = () => {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, positions.title, department.name AS department, positions.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN positions ON employees.position_id = positions.id LEFT JOIN department ON positions.department_id = department.id LEFT JOIN employees manager ON employees.manager_id = manager.id`;
    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      console.log("\n");
      console.table(rows);
      return startInquirer();
    });
  };

  const addDepartment = () => {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "department",
          message: "What's the name of the department?",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Hey, enter the department name!");
              return false;
            }
          },
        },
      ])
      .then((answer) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        db.query(sql, answer.department, (err, result) => {
          if (err) {
            throw err;
          }
          console.log("A department has been added!");
          return viewDepartments();
        });
      });
  };
};

const addRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What's the title of this role?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Hey, enter the role title!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What's the salary amount for this the role?",
        validate: (salaryInput) => {
          if (isNaN(salaryInput)) {
            console.log(
              "Hey, transparency is important. Enter the role salary!"
            );
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.title, answer.salary];
      const sql = `SELECT * FROM department`;
      db.query(sql, (err, rows) => {
        if (err) {
          throw err;
        }
        const departmentChoices = rows.map(({ name, id }) => ({
          name: name,
          value: id,
        }));
        return inquirer
          .prompt([
            {
              type: "list",
              name: "department_id",
              message: "Which department does this role belong to?",
              choices: departmentChoices,
            },
          ])
          .then((departmentAnswer) => {
            const department = departmentAnswer.department;
            params.push(department);
            const swl = `INSERT INTO positions (title, salary, department_id) VALUES (?, ?, ?)`;
            db.query(sql, params, (err, result) => {
              if (err) {
                throw err;
              }
              console.log("A role has been added!");
              return viewRoles();
            });
          });
      });
    });
};

const addEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Hey, you need a name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "last_name",
        message: "What's the employee's last name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Hey, you need a last name!");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.first_name, answer.last_name];
      const sql = `SELECT * FROM positions`;
      db,
        query(sql, (err, rows) => {
          if (err) {
            throw err;
          }
          const roles = rows.map(({ title, id }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the role of this employee?",
                choices: roles,
              },
            ])
            .then((roleAnswer) => {
              const role = roleAnswer.role;
              params.push(role);
              const managerSql = `SELECT * FROM employees`;
              db.query(sql, (err, rows) => {
                if (err) {
                  throw err;
                }
                const managers = rows.map(({ first_name, last_name, id }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id,
                }));
                managers.push({ name: "No manager", value: null });
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "manager",
                      message: "Who is the employee's manager?",
                      choices: managers,
                    },
                  ])
                  .then((managerAnswer) => {
                    const manager = managerAnswer.manager;
                    params.push(manager);
                    const sql = `INSERT INTO employees (first_name, last_name, position_id, manager_id) VALUES (?, ?, ?, ?)`;
                    db.query(sql, params, (err, result) => {
                      if (err) {
                        throw err;
                      }
                      console.log("An employee has been added!");
                      return viewEmployees();
                    });
                  });
              });
            });
        });
    });
};

const updateEmployeeRole = () => {
  const sql = `SELECT first_name, last_name, id FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    const employees = rows.map(({ first_name, last_name, id }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee's role do you want to update?",
          choices: employees,
        },
      ])
      .then((employeeAnswer) => {
        const employee = employeeAnswer.employee;
        const params = [employee];
        const sql = `SELECT title, id FROM positions`;
        db.query(sql, (err, rows) => {
          if (err) {
            throw err;
          }
          const roles = rows.map(({ title, id }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roles,
              },
            ])
            .then((roleAnswer) => {
              const role = roleAnswer.role;
              params.push(role);
              const sql = `UPDATE employees SET position_id = ? WHERE id = ?`;
              db.query(sql, params, (err, result) => {
                if (err) {
                  throw err;
                }
                console.log("Employee role updated!");
                return viewEmployees();
              });
            });
        });
      });
  });
};

const updateEmployeeManager = () => {
  const sql = `SELECT first_name, last_name, id FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    const employees = rows.map(({ first_name, last_name, id }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee's manager do you want to update?",
          choices: employees,
        },
      ])
      .then((employeeAnswer) => {
        const employee = employeeAnswer.employee;
        const params = [employee];
        const sql = `SELECT first_name, last_name, id FROM employees`;
        db.query(sql, (err, rows) => {
          if (err) {
            throw err;
          }
          const managers = rows.map(({ first_name, last_name, id }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          }));
          managers.push({ name: "No manager", value: null });
          inquirer
            .prompt([
              {
                type: "list",
                name: "manager",
                message: "Who is the employee's new manager?",
                choices: managers,
              },
            ])
            .then((managerAnswer) => {
              const manager = managerAnswer.manager;
              params.push(manager);
              const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
              db.query(sql, params, (err, result) => {
                if (err) {
                  throw err;
                }
                console.log("Employee's manager updated!");
                return viewEmployees();
              });
            });
        });
      });
  });
};

const viewbyManager = () => {
  const sql = `SELECT first_name, last_name, id FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    const employees = rows.map(({ first_name, last_name, id }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which manager's team do you want to view?",
          choices: employees,
        },
      ])
      .then((employeeAnswer) => {
        const manager = employeeAnswer.employee;
        const params = [manager];
        const sql = `SELECT first_name, last_name, id FROM employees WHERE manager_id = ?`;
        db.query(sql, params, (err, rows) => {
          if (err) {
            throw err;
          }
          if (rows.length === 0) {
            console.log("This employee isn't managing anybody.");
            return startInquirer();
          }
          console.log("\n");
          console.table(rows);
          return startInquirer();
        });
      });
  });
};

const viewByDepartment = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    const departments = rows.map(({ name, id }) => ({ name: name, value: id }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "department",
          message: "Which department's team do you want to view?",
          choices: departments,
        },
      ])
      .then((employeeAnswer) => {
        const department = employeeAnswer.department;
        const params = [department];
        const sql = `SELECT employees.id, first_name, last_name, departments.name AS department 
                  FROM employees 
                  LEFT JOIN positions ON employees.positions_id = positions.id 
                  WHERE departments_id = ?`;
        db.query(sql, params, (err, rows) => {
          if (err) {
            throw err;
          }
          console.log("\n");
          console.table(rows);
          return startInquirer();
        });
      });
  });
};
