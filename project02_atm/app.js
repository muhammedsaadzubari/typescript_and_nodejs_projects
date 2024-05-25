#!/usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import chalk from "chalk";
const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));
let balance = Math.round(Math.random() * 1000000);
const accounts = [
    {
        name: "Muhammed Saad",
        email: "muhammedsaad@gmail.com",
        pin: 1234567890,
        id: 1000,
        balance: balance
    },
    {
        name: "Hamzah Syed",
        email: "hamzahsyed@gmail.com",
        pin: 1234099890,
        id: 2000,
        balance: balance
    },
    {
        name: "Daniyal Qasmi",
        email: "daniyalqasmi@gmail.com",
        pin: 9764567890,
        id: 3000,
        balance: balance
    },
    {
        name: "Muhammed Maaz",
        email: "muhammedmaaz@gmail.com",
        pin: 1657567890,
        id: 4000,
        balance: balance
    },
];
// Function to animate title
async function rainbowTitle() {
    const addRainbowTitle = chalkAnimation.rainbow(`
  Let's WITHDRAW the CASH! \n
          
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒    ▒▒▒▒▒▒            ▒▒▒▒    ░░▒▒▒▒▒▒▒▒▒▒    ░░▒▒▒▒                          
  ▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒        ▒▒▒▒            ▒▒▒▒    ▒▒▒▒▒▒▒▒▒▒▒▒    ░░▒▒▒▒                          
  ▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒    ▒▒▒▒    ▒▒▒▒▒▒  ░░▒▒▒▒▒▒▒▒      ░░▒▒▒▒▒▒      ░░▒▒▒▒                          
  ▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒    ▒▒▒▒    ▒▒▒▒▒▒  ░░▒▒▒▒▒▒▒▒          ▒▒        ░░▒▒▒▒                          
  ▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒            ▒▒▒▒▒▒  ░░▒▒▒▒▒▒▒▒    ░░▒▒      ▒▒    ░░▒▒▒▒                          
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒    ▒▒▒▒    ▒▒▒▒▒▒  ░░▒▒▒▒▒▒▒▒    ▒▒▒▒▒▒▒▒▒▒▒▒    ░░▒▒▒▒                          
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒    ▒▒▒▒    ▒▒▒▒▒▒  ░░▒▒▒▒▒▒▒▒    ▒▒▒▒▒▒▒▒▒▒▒▒    ░░▒▒▒▒                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░                                  ░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░                                  ░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░    ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒    ░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░    ▒▒░░░░░░░░░░░░░░░░░░░░░░░░    ░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░    ░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░    ░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒    ▒▒▒▒░░░░    ░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒    ▒▒▒▒░░░░    ░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░    ░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░    ░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░    ░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░    ▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒░░░░    ░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░                                  ░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░          ▒▒  ▒▒  ▒▒  ░░  ▒▒      ░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░▒▒  ▒▒  ▒▒░░▒▒░░▒▒░░░░░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░▒▒  ▒▒  ▒▒  ▒▒  ▒▒░░░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▒▒▒▒░░░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░  ░░░░░░░░░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▓▓▓▓▓▓▓▓▓▓▒▒▒▒░░░░░░▒▒▒▒▒▒▒▒░░░░░░░░                                            
  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▓▓▓▓▓▓▓▓▓▓▒▒▒▒░░░░░░  ░░░░░░░░░░░░░░   
          
  Developed by MUHAMMED SAAD \n\n
  `);
    await sleep();
    addRainbowTitle.stop();
}
async function getEmailIdPin() {
    const { email, id, pin } = await inquirer.prompt([
        {
            name: "email",
            message: "Enter your email:",
            type: "input",
        },
        {
            name: "id",
            message: "Enter your ID:",
            type: "number",
        },
        {
            name: "pin",
            message: "Enter your PIN:",
            type: "password",
            mask: "•",
        },
    ]);
    return { email, id, pin: Number(pin) };
}
async function performOperation(userAccount) {
    if (!userAccount) {
        console.error(chalk.red("Invalid credentials!"));
        const { tryAgain } = await inquirer.prompt({
            name: "tryAgain",
            message: "Do you want to try again?",
            type: "list",
            choices: ["Yes", "No"]
        });
        if (tryAgain === "No") {
            console.log(chalk.blue("Thank you for using our service!"));
            process.exit();
        }
        return;
    }
    console.log(chalk.green(`Hi ${userAccount.name}! You have logged in!`));
    const { operation } = await inquirer.prompt([
        {
            name: "operation",
            message: "Choose operation to perform:",
            type: "list",
            choices: ["Balance Inquiry", "Fast Cash", "Cash Withdrawal", "Exit"],
        },
    ]);
    switch (operation) {
        case "Fast Cash": {
            const { amount } = await inquirer.prompt([
                {
                    name: "amount",
                    message: "Select amount to withdraw:",
                    type: "list",
                    choices: ["500", "1000", "5000", "10000"],
                },
            ]);
            const amountToWithdraw = Number(amount);
            if (amountToWithdraw <= userAccount.balance) {
                userAccount.balance -= amountToWithdraw;
                console.log(chalk.yellow(`Remaining balance: ${userAccount.balance}`));
            }
            else {
                console.error(chalk.red("Amount exceeds your balance!"));
            }
            break;
        }
        case "Balance Inquiry":
            console.log(chalk.yellow(`Your balance: ${userAccount.balance}`));
            break;
        case "Cash Withdrawal":
            const { withdrawalAmount } = await inquirer.prompt([
                {
                    name: "withdrawalAmount",
                    message: "Enter amount to withdraw:",
                    type: "number",
                },
            ]);
            const amountToWithdraw = withdrawalAmount;
            if (amountToWithdraw <= userAccount.balance) {
                userAccount.balance -= amountToWithdraw;
                console.log(chalk.yellow(`Remaining balance: ${userAccount.balance}`));
            }
            else {
                console.error(chalk.red("Amount exceeds your balance!"));
            }
            break;
        case "Exit":
            console.log(chalk.blue("Thank you for using our service!"));
            process.exit();
            break;
        default:
            console.error(chalk.red("Invalid operation!"));
    }
}
async function main() {
    await rainbowTitle();
    let userAccount;
    const information = await getEmailIdPin();
    userAccount = accounts.find((account) => account.email === information.email &&
        account.id === information.id &&
        account.pin === information.pin);
    do {
        await performOperation(userAccount);
        var restart = await inquirer.prompt({
            name: "restart",
            type: "list",
            message: "Do you want to continue!",
            choices: ["Yes", "No"]
        });
    } while (restart.restart === "Yes");
}
main();
