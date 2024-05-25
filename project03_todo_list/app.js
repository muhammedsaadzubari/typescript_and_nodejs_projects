#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
let todoList = [];
async function sleep() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}
// Function to animate title
async function rainbowTitle() {
    const addRainbowTitle = chalkAnimation.rainbow(`
  Let's MANAGE our TODOS! \n
  
░▒▓████████▓▒░▒▓██████▓▒░       ░▒▓███████▓▒░ ░▒▓██████▓▒░       ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓███████▓▒░▒▓████████▓▒░ 
   ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░     
   ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░     
   ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓██████▓▒░   ░▒▓█▓▒░     
   ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░  ░▒▓█▓▒░     
   ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░  ░▒▓█▓▒░     
   ░▒▓█▓▒░   ░▒▓██████▓▒░       ░▒▓███████▓▒░ ░▒▓██████▓▒░       ░▒▓████████▓▒░▒▓█▓▒░▒▓███████▓▒░   ░▒▓█▓▒░         
  
  Developed by MUHAMMED SAAD \n\n
  `);
    await sleep();
    addRainbowTitle.stop();
}
async function operationFn() {
    const operationPrompt = await inquirer.prompt({
        name: "operation",
        message: (chalk.blue.bold)("Select operation to perform:"),
        type: "list",
        choices: ["Add Tasks", "Edit Tasks", "Delete Tasks", "Mark As Done", "View List", "Exit"],
    });
    return operationPrompt.operation;
}
async function addTasksFn() {
    const addTasksPrompt = await inquirer.prompt({
        name: "addTasks",
        message: (chalk.blue)("Enter your todo task:"),
        type: "input",
    });
    const { addTasks } = addTasksPrompt;
    if (addTasks.trim() !== "") {
        if (!todoList.includes(addTasks.trim())) {
            todoList.push(addTasks.trim());
            console.log(chalk.gray(`The task ${chalk.whiteBright(addTasks)} was added succesfully!`));
        }
        else {
            console.log(chalk.yellow("This task already exists in the list."));
        }
    }
    else {
        console.log(chalk.yellow("Task description cannot be empty."));
    }
}
async function viewTasksFn() {
    if (todoList.length !== 0) {
        console.log(chalk.bold("Your Todo List:"));
        todoList.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });
    }
    else {
        console.log(chalk.yellow("You have no tasks to view."));
    }
}
async function markedAsDone() {
    if (todoList.length !== 0) {
        const selectTaskPrompt = await inquirer.prompt({
            name: "selectTasks",
            type: "checkbox",
            choices: todoList.map(task => (task)),
            message: (chalk.blue)("Select tasks to mark as done:"),
        });
        const { selectTasks } = selectTaskPrompt;
        if (selectTasks.length !== 0) {
            selectTasks.forEach(task => {
                const index = todoList.indexOf(task);
                if (!task.endsWith(" \u2714 DONE!")) {
                    todoList[index] += " \u2714 DONE!";
                    console.log(chalk.gray(`The task ${chalk.whiteBright(task)} was marked done succesfully!`));
                }
                else {
                    console.log(chalk.yellow(`Task "${task}" is already marked as done.`));
                }
            });
        }
        else {
            console.log(chalk.yellow("No tasks selected."));
        }
    }
    else {
        console.log(chalk.yellow("You currently do not have any tasks to mark."));
    }
}
async function deleteTasksFn() {
    if (todoList.length !== 0) {
        const deleteTasksPrompt = await inquirer.prompt({
            name: "deleteTasks",
            type: "checkbox",
            message: (chalk.blue)("Select tasks to delete:"),
            choices: todoList.map(task => (task)),
        });
        const { deleteTasks } = deleteTasksPrompt;
        if (deleteTasks.length !== 0) {
            deleteTasks.forEach(task => {
                const index = todoList.indexOf(task);
                todoList.splice(index, 1);
                console.log(chalk.gray(`The tasks ${chalk.whiteBright(deleteTasks)} was deleted succesfully!`));
            });
        }
        else {
            console.log(chalk.yellow("No tasks selected for deletion."));
        }
    }
    else {
        console.log(chalk.yellow("You currently do not have any tasks to delete."));
    }
}
async function editTasksFn() {
    if (todoList.length !== 0) {
        const editTasksPrompt = await inquirer.prompt([{
                name: "editTasks",
                type: "list",
                message: (chalk.blue)("Select task to edit:"),
                choices: todoList.map(task => (task)),
            }, {
                name: "editWithTasks",
                type: "input",
                message: (chalk.blue)("Enter updated task:"),
            }]);
        const { editTasks, editWithTasks } = editTasksPrompt;
        const index = todoList.indexOf(editTasks);
        if (editWithTasks.trim() !== "") {
            todoList[index] = editWithTasks.trim();
            console.log(chalk.gray(`The task ${chalk.whiteBright(editTasks)} was edited with ${chalk.bgBlack.whiteBright(editWithTasks)} succesfully!`));
        }
        else {
            console.log(chalk.yellow("Task description cannot be empty."));
        }
    }
    else {
        console.log(chalk.yellow("You currently do not have any tasks to edit."));
    }
}
async function exit() {
    console.log(chalk.bold.redBright("Exiting..."));
    process.exit();
}
async function main() {
    await rainbowTitle();
    while (true) {
        let operation = await operationFn();
        switch (operation) {
            case "Add Tasks":
                await addTasksFn();
                break;
            case "Edit Tasks":
                await editTasksFn();
                break;
            case "Delete Tasks":
                await deleteTasksFn();
                break;
            case "View List":
                await viewTasksFn();
                break;
            case "Mark As Done":
                await markedAsDone();
                break;
            case "Exit":
                await exit();
                break;
        }
    }
}
main();
