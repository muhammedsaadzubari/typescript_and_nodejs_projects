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
    "TypeScript And NodeJs Projects\n\nProject #01: Number Guessing Game\n\nDeveloped by MUHAMMED SAAD \n\n"
  );
  await sleep();
  rainbowTitleAnimation.stop();
}

const prompts = {
  promptNumber: async (message: string) => {
    let { prompt } = await inquirer.prompt({
      type: "number",
      name: "prompt",
      message,
    });
    return prompt;
  },
  promptList: async (message: string, choices: string[]) => {
    let { prompt } = await inquirer.prompt({
      type: "list",
      name: "prompt",
      message,
      choices,
    });
    return prompt;
  },
  promptConfirm: async () => {
    let { prompt } = await inquirer.prompt({
      type: "confirm",
      name: "prompt",
      message: "Do you want to continue?",
    });
    return prompt;
  },
};

let score = 0;

async function startGame() {
  while (true) {
    let levels = ["Simple", "Moderate", "Hard"];
    let selectedLevel = await prompts.promptList("Please select a level:", levels);
    let max = levels.indexOf(selectedLevel) * 5 + 5;
    while (true) {
      for (let attempts = 5; attempts > 0; attempts--) {
        let random = chalk.yellowBright(Math.round(Math.random() * max));
        let guessedNumber;
        while (true) {
          guessedNumber = await prompts.promptNumber(
            `Guess the number! (Between 0 and ${max}). You have only ${attempts} more chances:`
          );
          if (isNaN(guessedNumber)) {
            console.log(chalk.redBright("Please enter a valid number!"));
          } else if (guessedNumber < 0 || guessedNumber > max) {
            console.log(chalk.redBright(`Please enter a number between 0 and ${max}!`));
          } else {
            break;
          }
        }
        console.log(chalk.cyanBright(`The generated number by the game is ${random}`));
        if (guessedNumber === random) {
          console.log(chalk.greenBright("Congratulations! You have guessed the right number!"));
          score += 5;
          console.log(
            chalk.blueBright(
              `Your score has increased by 5, and now your score is ${score}!`
            )
          );
        } else {
          console.log(
            chalk.redBright(
              `Sorry, the number you guessed '${chalk.yellowBright(guessedNumber)}' is incorrect! Try Again!`
            )
          );
        }
      }
      console.log(
        chalk.greenBright(`Your final score is ${chalk.magentaBright(score)}!`)
      );
      if (score >= 20) {
        console.log(
          chalk.bgCyanBright(
            chalk.bold(`Congratulations! You have won the game with a score of ${score}/25!`)
          )
        );
      } else {
        console.log(
          chalk.bgCyanBright(
            chalk.bold(`You have lost the game with a score of ${score}/25!`)
          )
        );
      }
      let choice = await prompts.promptList("What would you like to do next?", [
        "Continue Game",
        "Main Menu",
        "Exit",
      ]);
      if (choice === "Exit") {
        console.log(chalk.bold(chalk.bgRedBright("Thank you for playing! Exiting...")));
        process.exit();
      } else if (choice === "Main Menu") {
        break;
      }
    }
  }
}

await showRainbowTitle();
await startGame();