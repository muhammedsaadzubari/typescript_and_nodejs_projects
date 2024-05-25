#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleepAndStart = () => {
  return new Promise((res) => {
    setTimeout(res, 2000);
  });
};

async function rainbowTitle() {
  let addRainbowTitle = chalkAnimation.rainbow(`
    Let's start calculation \n
     _____________________
    |  _________________  |
    | | @Saad        0. | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    | | x^| √ |Off| | C | |
    | |___|___|___| |___| |
    |_____________________| \n

    Develop By MUHAMMED SAAD \n\n
    `);
  await sleepAndStart();
  addRainbowTitle.stop();
}

await rainbowTitle();
let result: number;
  
async function askQuestion() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "Operator",
      message: "Which operation do you want to perform?",
      choices: [
        "+ Addition",
        "- Subtraction",
        "* Multiplication",
        "/ Division",
        "^ Power",
        "√ Square Root",
        "% Modules",
      ],
    },
    {
      type: "number",
      name: "num1",
      message: "Enter the number:",
    },
    {
      type: "number",
      name: "exponent",
      message: "Enter the exponent:",
      when: (answers) => answers.Operator === "^ Power",
    },
    {
      type: "number",
      name: "num2",
      message: "Enter the number:",
      when: (answers) => answers.Operator === "- Subtraction",
    },
    {
      type: "number",
      name: "num2",
      message: "Enter the number:",
      when: (answers) => answers.Operator === "+ Addition",
    },
    {
      type: "number",
      name: "num2",
      message: "Enter the number:",
      when: (answers) => answers.Operator === "* Multiplication",
    },
    {
      type: "number",
      name: "num2",
      message: "Enter the number",
      when: (answers) => answers.Operator === "/ Division",
    },
    {
      type: "number",
      name: "num2",
      message: "Enter the number",
      when: (answers) => answers.Operator === "% Modules",
    },
  ]);

  switch (answers.Operator) {
    case "+ Addition":
      result = answers.num1 + answers.num2;
      console.log(
        chalk.blueBright(`${answers.num1} + ${answers.num2} = ${result}`)
      );
      break;
    case "- Subtraction":
      result = answers.num1 - answers.num2;
      console.log(
        chalk.blueBright(`${answers.num1} - ${answers.num2} = ${result}`)
      );
      break;
    case "* Multiplication":
      result = answers.num1 * answers.num2;
      console.log(
        chalk.blueBright(`${answers.num1} * ${answers.num2} = ${result}`)
      );
      break;
    case "/ Division":
      result = answers.num1 / answers.num2;
      console.log(
        chalk.blueBright(`${answers.num1} / ${answers.num2} = ${result}`)
      );
      break;
    case "^ Power":
      result = Math.pow(answers.num1, answers.exponent);
      console.log(
        chalk.blueBright(`${answers.num1} ^ ${answers.exponent} = ${result}`)
      );
      break;
    case "√ Square Root":
      result = Math.sqrt(answers.num1);
      console.log(chalk.blueBright(`√${answers.num1} = ${result}`));
      break;
    case "% Modules":
      result = answers.num1 % answers.num2;
      console.log(
        chalk.blueBright(`${answers.num1} % ${answers.num2} = ${result}`)
      );
      break;
    default:
      console.log("Please select a correct operator!");
  }
  console.log(result);
}

async function startAgain() {
  do {
    await askQuestion();
    var restart = await inquirer.prompt({
      type: "list",
      name: "recoco",
      message:
        "Do you want to continue? Select 'Yes' to restart , 'No' to close:",
      choices: ["Yes", "No"],
    });
  } while (restart.recoco === "Yes");
}
startAgain();
