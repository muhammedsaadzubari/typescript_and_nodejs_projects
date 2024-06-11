#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

async function showRainbowTitle() {
  let rainbowTitleAnimation = chalkAnimation.rainbow(
    "TypeScript And NodeJs Projects\n\nProject #00: Calculator\n\nDeveloped by MUHAMMED SAAD \n\n"
  );
  await sleep();
  rainbowTitleAnimation.stop();
}

let prompt = {
  promptTypeNumber: async (message: string) => {
    while (true) {
      var { prompt } = await inquirer.prompt({
        name: "prompt",
        type: "number",
        message,
      });
      if (!isNaN(prompt)) {
        break;
      }else{
        console.log((chalk.redBright)("Enter an integer value!"));
      }
    }
    return prompt;
  },
  promptTypeList: async (message: string, choices: string[]) => {
    let { prompt } = await inquirer.prompt({
      name: "prompt",
      type: "list",
      message,
      choices,
    });
    return prompt;
  },
  promptTypeConfirm: async () => {
    let { prompt } = await inquirer.prompt({
      name: "prompt",
      type: "confirm",
      message: "Do you want to continue?",
    });
    return prompt;
  },
};
let choices: string[] = [
  "+ Addition",
  "- Subtraction",
  "* Multiplication",
  "/ Division",
  "^ Power",
  "√ Square Root",
  "% Modules",
];
async function askQuestion() {
  let operator = await prompt.promptTypeList(
    "Select operation you want to perform!",
    choices
  );
  switch (operator) {
    case "+ Addition":
      let num1Add = await prompt.promptTypeNumber("Enter the First Number!");
      let num2Add = await prompt.promptTypeNumber("Enter the Second Number!");
      console.log(
        chalk.blueBright(`${num1Add} + ${num2Add} = ${num1Add + num2Add}`)
      );
      break;
    case "- Subtraction":
      let num1Sub = await prompt.promptTypeNumber("Enter the First Number!");
      let num2Sub = await prompt.promptTypeNumber("Enter the Second Number!");
      console.log(
        chalk.blueBright(`${num1Sub} - ${num2Sub} = ${num1Sub - num2Sub}`)
      );
      break;
    case "* Multiplication":
      let num1Mul = await prompt.promptTypeNumber("Enter the First Number!");
      let num2Mul = await prompt.promptTypeNumber("Enter the Second Number!");
      console.log(
        chalk.blueBright(`${num1Mul} * ${num2Mul} = ${num1Mul * num2Mul}`)
      );
      break;
    case "/ Division":
      let num1Div = await prompt.promptTypeNumber("Enter the First Number!");
      let num2Div = await prompt.promptTypeNumber("Enter the Second Number!");
      console.log(
        chalk.blueBright(`${num1Div} / ${num2Div} = ${num1Div / num2Div}`)
      );
      break;
    case "^ Power":
      let num1Pow = await prompt.promptTypeNumber("Enter the Base!");
      let num2Pow = await prompt.promptTypeNumber("Enter the Exponent!");
      console.log(
        chalk.blueBright(
          `${num1Pow} ^ ${num2Pow} = ${Math.pow(num1Pow, num2Pow)}`
        )
      );
      break;
    case "√ Square Root":
      let num1Sqrt = await prompt.promptTypeNumber("Enter the First number!");
      console.log(chalk.blueBright(`√${num1Sqrt} = ${Math.sqrt(num1Sqrt)}`));
      break;
    case "% Modules":
      let num1Mod = await prompt.promptTypeNumber("Enter the First Number!");
      let num2Mod = await prompt.promptTypeNumber("Enter the Second Number!");
      console.log(
        chalk.blueBright(`${num1Mod} % ${num2Mod} = ${num1Mod % num2Mod}`)
      );
  }
}

(async () => {
  let bool = true;
  await showRainbowTitle();
  while (bool) {
    await askQuestion();
    bool = await prompt.promptTypeConfirm();
  }
})();
