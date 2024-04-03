const db = require("../db/connection");
const cTable = require("console.table");
const inquirer = require("inquirer");

// inquirer prompts
const startInquirer = () => {
    inquirer.createPromptModule([
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
                "Quit"
            ],
        },
    ])
    .then(answewrs => {
        const nextPrompt = answers.toDo;
        if (nextPrompt === "View all departments") {
            viewDepartments();
        };
    }
}
