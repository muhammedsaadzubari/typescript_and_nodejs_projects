#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

let todoList: string[] = [];
enum Operation {
  Add_Tasks = "Add Tasks",
  Edit_Tasks = "Edit Tasks",
  Delete_Tasks = "Delete Tasks",
  Mark_As_Done = "Mark As Done",
  View_List = "View List",
  Exit = "Exit",
}
const print = (...message: any[]) => {
  console.log(...message);
};
const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};
const title = async () => {
  let rainbowTitleAnimation = chalkAnimation.rainbow(
    "TypeScript And NodeJs Projects\n\nProject #03: TODO List\n\nDeveloped by MUHAMMED SAAD \n\n"
  );
  await sleep();
  rainbowTitleAnimation.stop();
};
async function operationFn() {
  const { operation } = await inquirer.prompt({
    name: "operation",
    message: "Select operation to perform:",
    type: "list",
    choices: [
      "Add Tasks",
      "Edit Tasks",
      "Delete Tasks",
      "Mark As Done",
      "View List",
      "Exit",
    ],
  });
  return operation;
}

async function addTasksFn() {
  const { addTasks } = await inquirer.prompt({
    name: "addTasks",
    message: "Enter your todo task:",
    type: "input",
  });
  if (addTasks.trim() !== "") {
    if (!todoList.includes(addTasks.trim())) {
      todoList.push(addTasks.trim());
      print(
        chalk.bgGreenBright.bold(
          `The task ${chalk.whiteBright(addTasks)} was added succesfully!`
        )
      );
    } else {
      print(chalk.yellow("This task already exists in the list."));
    }
  } else {
    print(chalk.yellow("Task description cannot be empty."));
  }
}
async function viewTasksFn() {
  if (todoList.length !== 0) {
    print(chalk.bold("Your Todo List:"));
    todoList.forEach((task, index) => {
      print(`${index + 1}. ${task}`);
    });
  } else {
    print(chalk.yellow("You have no tasks to view."));
  }
}
async function markedAsDone() {
  if (
    todoList.length !== 0 &&
    todoList.filter((val) => !val.endsWith(" \u2714 DONE!")).length !== 0
  ) {
    const { selectTasks } = await inquirer.prompt<{ selectTasks: string[] }>({
      name: "selectTasks",
      type: "checkbox",
      choices: todoList.filter((val) => !val.endsWith(" \u2714 DONE!")),
      message: "Select tasks to mark as done:",
    });
    if (selectTasks.length !== 0) {
      selectTasks.forEach((task) => {
        const index = todoList.indexOf(task);
        todoList[index] += " \u2714 DONE!";
        print(
          chalk.bgGreenBright.bold(
            `The task ${chalk.whiteBright(task)} was marked done succesfully!`
          )
        );
      });
    } else {
      print(chalk.yellow("No tasks selected."));
    }
  } else {
    print(chalk.yellow("You currently do not have any tasks to mark."));
  }
}
async function deleteTasksFn() {
  if (todoList.length !== 0) {
    const { deleteTasks } = await inquirer.prompt({
      name: "deleteTasks",
      type: "checkbox",
      message: "Select tasks to delete:",
      choices: [...todoList],
    });
    if (deleteTasks.length !== 0) {
      deleteTasks.forEach((task: string) => {
        const index = todoList.indexOf(task);
        todoList.splice(index, 1);
        print(
          chalk.bgGreenBright.bold(
            `The tasks ${chalk.whiteBright(
              deleteTasks
            )} was deleted succesfully!`
          )
        );
      });
    } else {
      print(chalk.yellow("No tasks selected for deletion."));
    }
  } else {
    print(chalk.yellow("You currently do not have any tasks to delete."));
  }
}

async function editTasksFn() {
  if (todoList.length !== 0) {
    const { editTasks, editWithTasks } = await inquirer.prompt<{
      editTasks: string;
      editWithTasks: string;
    }>([
      {
        name: "editTasks",
        type: "list",
        message: "Select task to edit:",
        choices: [...todoList],
      },
      {
        name: "editWithTasks",
        type: "input",
        message: "Enter updated task:",
      },
    ]);
    const index = todoList.indexOf(editTasks);
    if (editWithTasks.trim() !== "") {
      todoList[index] = editWithTasks.trim();
      print(
        chalk.bgGreenBright.bold(
          `The task ${chalk.whiteBright(
            editTasks
          )} was edited with ${chalk.bgBlack.whiteBright(
            editWithTasks
          )} succesfully!`
        )
      );
    } else {
      print(chalk.yellow("Task description cannot be empty."));
    }
  } else {
    print(chalk.yellow("You currently do not have any tasks to edit."));
  }
}
async function exit() {
  print(chalk.bold.redBright("Exiting..."));
  process.exit();
}

async function main() {
  await title();
  while (true) {
    let operation: string = await operationFn();
    switch (operation) {
      case Operation.Add_Tasks:
        await addTasksFn();
        break;
      case Operation.Edit_Tasks:
        await editTasksFn();
        break;
      case Operation.Delete_Tasks:
        await deleteTasksFn();
        break;
      case Operation.View_List:
        await viewTasksFn();
        break;
      case Operation.Mark_As_Done:
        await markedAsDone();
        break;
      case Operation.Exit:
        await exit();
        break;
    }
  }
}

main();
