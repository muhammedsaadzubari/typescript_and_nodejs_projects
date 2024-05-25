#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

async function animateTitle(): Promise<void> {
  const titleAnimation = chalkAnimation.rainbow(`
    Let's COUNT the WORDS and LETTERS in our provided PARAGRAPH or SENTENCE! \n
    
    LIKE:    My name is Muhammed Saad
             1   2   3     4      5         There are 5 words in your sentence.
             2   6   8    16     20        There are 20 letters in your sentence.

    Developed by MUHAMMED SAAD \n\n
    `);
  await sleep(2000);
  titleAnimation.stop();
}

function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function promptForSentence(): Promise<string> {
  const { sentence } = await inquirer.prompt([
    {
      name: "sentence",
      type: "input",
      message: (chalk.greenBright)("Enter your paragraph or sentence to calculate words or letter:"),
    },
  ]);
  if (sentence.trim() === "") {
    throw new Error("You haven't entered enough words!");
  }
  return sentence;
}

async function promptForOperation(): Promise<string[]> {
  const { operations } = await inquirer.prompt([
    {
      name: "operations",
      type: "checkbox",
      message: (chalk.yellowBright)("Which operation do you want to perform?"),
      choices: ["Word Count", "Letter Count"],
    },
  ]);
  if (operations.length === 0) {
    throw new Error("You have not selected any operation yet!");
  }
  return operations;
}

function countWords(sentence: string): number {
  return sentence.split(/\s+/g).length;
}

function countLetters(sentence: string): number {
  return sentence.trim().length;
}

async function promptRestartOrExit(): Promise<boolean> {
  const { restart } = await inquirer.prompt({
    name: "restart",
    type: "confirm",
    message: (chalk.blueBright)("Do you want to continue?"),
  });
  return restart;
}

async function main() {
  await animateTitle();

  let continuePrompting = true;
  while (continuePrompting) {
    try {
      const sentence = await promptForSentence();
      const operations = await promptForOperation();

      if (operations.includes("Word Count")) {
        console.log(chalk.rgb(255, 165, 0)(`You have entered ${countWords(sentence)} words.`));
      }

      if (operations.includes("Letter Count")) {
        console.log((chalk.rgb(255, 165, 0))(`You have entered ${countLetters(sentence)} letters.`));
      }

      continuePrompting = await promptRestartOrExit();
    } catch (error: any) {
      console.error((chalk.redBright)(error.message));
      continuePrompting = await promptRestartOrExit();
    }
  }

  console.log((chalk.redBright)("Exiting..."));
}

main();