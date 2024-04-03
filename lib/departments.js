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
  };
};
