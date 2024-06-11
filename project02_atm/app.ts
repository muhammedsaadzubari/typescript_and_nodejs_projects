#!/usr/bin/env node

import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import chalk from "chalk";
import validator from "validator";

type int = number;
type str = string;

interface Account {
  ID: str;
  Name: str;
  Email: str;
  PIN: str;
  Balance: int;
}

const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

const title = async () => {
  let rainbowTitleAnimation = chalkAnimation.rainbow(
    "TypeScript And NodeJs Projects\n\nProject #02: Automatic Teller Machine\n\nDeveloped by MUHAMMED SAAD \n\n"
  );
  await sleep();
  rainbowTitleAnimation.stop();
};
const exeedsAmountMessage = async () => {
  console.log(chalk.red("Amount exeeds your balance!"));
};
const fastCash = async (userAccount: Account) => {
  let { amountToFastCash } = await inquirer.prompt({
    name: "amountToFastCash",
    type: "list",
    message: "Select amount to withdraw:",
    choices: ["500", "1000", "5000", "10000"],
  });
  amountToFastCash = Number(amountToFastCash);
  if (amountToFastCash <= userAccount.Balance) {
    userAccount.Balance -= amountToFastCash;
    await balanceInquiry(userAccount, "Remaining");
  } else {
    await exeedsAmountMessage();
  }
};
const balanceInquiry = async (userAccount: Account, words: str) => {
  console.log(chalk.yellow(`Your ${words} balance is: ${userAccount.Balance}`));
};
const withdrawl = async (userAccount: Account) => {
  let amountToWithdraw;
  while (true) {
    let prompt = await inquirer.prompt({
      name: "amountToWithdraw",
      type: "number",
      message: "Enter amount to withdraw:",
    });
    amountToWithdraw = prompt.amountToWithdraw;
    if (!isNaN(amountToWithdraw)) {
      break;
    } else {
      console.log(chalk.red("Enter a valid amount!"));
    }
  }
  if (amountToWithdraw <= userAccount.Balance) {
    userAccount.Balance -= amountToWithdraw;
    await balanceInquiry(userAccount, "Remaining");
  } else {
    await exeedsAmountMessage();
  }
};
const exit = async () => {
  console.log(chalk.blue("Thank you for using our service!"));
  console.log(chalk.bold(chalk.bgRedBright("Exiting...")));
  process.exit();
};
const promptTypeList = async (choices: str[], message: str) => {
  let { prompt } = await inquirer.prompt({
    name: "prompt",
    type: "list",
    message,
    choices,
  });
  return prompt;
};
const promptTypeConfirm = async () => {
  let { prompt } = await inquirer.prompt({
    name: "prompt",
    type: "confirm",
    message: "Do you want to continue?",
  });
  return prompt;
};
const emailPrompt = async () => {
  let { email } = await inquirer.prompt({
    name: "email",
    message: "Enter your email?",
    type: "input",
    validate: (Email) => {
      if (validator.isEmail(Email)) {
        return true;
      } else {
        console.log(chalk.red("Enter a valid name!"));
        return false;
      }
    },
  });
  return email;
};
const PINPrompt = async () => {
  let { PIN } = await inquirer.prompt({
    name: "PIN",
    message: "Enter your PIN? (Atleast 4 numbers)",
    type: "password",
    validate: (PIN) => {
      if (PIN.match(/^\d{4,}/)) {
        return true;
      } else {
        console.log(chalk.red("Enter a valid PIN (Atleast 4 numbers)!"));
        return false;
      }
    },
    mask: "•",
  });
  return PIN;
};
const SignUp = async () => {
  let operation = await promptTypeList(
    ["Sign UP", "Exit"],
    "Which operation do you want to perform?"
  );
  switch (operation) {
    case "Sign UP":
      let userAccount: Account = await inquirer.prompt([
        {
          name: "Name",
          message: "Enter your name?",
          type: "input",
          validate: (Name) => {
            if (Name.trim() === "") {
              console.log(chalk.red("Enter a valid name!"));
              return false;
            } else {
              return true;
            }
          },
        },
      ]);
      userAccount["ID"] = "00001";
      userAccount["Balance"] = Math.round(Math.random() * 10) * 100000;
      userAccount["Email"] = await emailPrompt();
      userAccount["PIN"] = await PINPrompt();
      return userAccount;
    default:
      await exit();
  }
};

let LogIn = async () => {
  let operation = await promptTypeList(
    ["Log IN", "Exit"],
    "Which operation do you want to perform?"
  );
  switch (operation) {
    case "Log IN":
      let userAccount = await inquirer.prompt([
        {
          name: "ID",
          message: "Enter your ID? (Consists of 5 numbers)",
          type: "input",
          validate: (ID) => {
            if (ID.match(/^\d{5}$/)) {
              return true;
            } else {
              console.log(
                chalk.red("Enter a valid ID! (Consists of 5 numbers)")
              );
              return false;
            }
          },
        },
      ]);
      userAccount["Email"] = await emailPrompt();
      userAccount["PIN"] = await PINPrompt();
      return userAccount;
    default:
      await exit();
  }
};

let atm = async (userAccount: Account) => {
  let operation = await promptTypeList(
    ["Balance Inquiry", "Fast Cash", "Cash Withdrawl", "Exit"],
    "Select operation to perform:"
  );
  switch (operation) {
    case "Balance Inquiry":
      await balanceInquiry(userAccount, "Current");
      break;
    case "Fast Cash":
      await fastCash(userAccount);
      break;
    case "Cash Withdrawl":
      await withdrawl(userAccount);
      break;
    default:
      await exit();
  }
};

let main = async () => {
  await title();
  let signUp = await SignUp();
  console.table(signUp);
  let bool: boolean = true;
  while (bool) {
    let login = await LogIn();
    if (signUp !== undefined && login !== undefined) {
      if (
        login.Email === signUp.Email &&
        login.ID === signUp.ID &&
        login.PIN === signUp.PIN
      ) {
        let running = true;
        console.log(
          chalk.greenBright(`Hi ${signUp.Name}! You have logged in!`)
        );
        while (running) {
          await atm(signUp);
          running = await promptTypeConfirm();
        }
      } else {
        console.log(chalk.red("Invalid credentials! Failed to LogIN!"));
        bool = await promptTypeConfirm();
      }
    }
  }
};
await main();