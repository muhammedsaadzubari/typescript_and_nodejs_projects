#!/usr/bin/env node

import chalk from "chalk";
import animation from "chalk-animation";
import inquirer from "inquirer";
import validator from "validator";
import ora from "ora";

type str = string;
type int = number;

namespace Title {
  export class AnimateBanner {
    private static banner: str =
      "TypeScript And NodeJs Projects\n\nProject #11: My Bank with Object-Oriented Promgramming\n\nDeveloped by MUHAMMED SAAD \n\n";
    public static sleep(ms: int): Promise<void> {
      return new Promise((res) => setTimeout(res, ms));
    }
    public static async rainbowTitle(): Promise<void> {
      let add_rainbow_title = animation.rainbow(this.banner);
      await AnimateBanner.sleep(2000);
      add_rainbow_title.stop();
    }
  }
}

namespace BankAccount {
  interface IBankAccount {
    debit(amount: int): str;
    credit(amount: int): str;
  }
  export class BankAccount implements IBankAccount {
    public accountBalance: int;
    constructor(balance: int) {
      this.accountBalance = balance;
    }
    public debit(amount: int): str {
      let statement: str = "Sorry, you have insufficient balance!";
      if (amount > 0) {
        statement = "The amount you entered is wrong!";
        if (this.accountBalance > amount) {
          this.accountBalance -= amount;
          statement = `Transaction successful! New account balance is ${this.accountBalance}.`;
        } else {
          statement = "You don't have enough money to do this transaction!";
        }
      }
      return statement;
    }
    public credit(amount: int) {
      let statement: str = "Transaction Failed!";
      if (amount > 0) {
        this.accountBalance += amount;
        if (amount > 100) {
          this.accountBalance -= 1;
        }
        statement = "Your account has been credited successfully!";
      }
      return statement;
    }
  }
}

namespace Customer {
  export class Customer {
    constructor(
      public firstName: str,
      public lastName: str,
      public gender: str,
      public email: str,
      public age: str,
      public PIN: str,
      public mobileNumber: str,
      public accountBalance: str,
      public bankAccount: BankAccount.BankAccount
    ) {}
  }
}

namespace CreateAccount {
  export class CreateAccount {
    private static account: Customer.Customer;
    private static status: boolean;
    private static bankAccount: BankAccount.BankAccount;
    private static async signUP(): Promise<void> {
      let { fName, lName, email, gender, mobileNumber } = await inquirer.prompt(
        [
          {
            name: "fName",
            type: "input",
            message: "Enter your first name!",
            validate: (fName) => {
              if (fName.trim() !== "") {
                return true;
              } else {
                return "Enter a valid name!";
              }
            },
          },
          {
            name: "lName",
            type: "input",
            message: "Enter your last name!",
            validate: (lName) => {
              if (lName.trim() !== "") {
                return true;
              } else {
                return "Enter a valid name!";
              }
            },
          },
          {
            name: "email",
            type: "input",
            message: "Enter your email!",
            validate: (email) => {
              if (validator.isEmail(email)) {
                return true;
              } else {
                return "Enter a valid email!";
              }
            },
          },
          {
            name: "gender",
            type: "list",
            message: "Select your gender!",
            choices: ["Male", "Female"],
          },
          {
            name: "PIN",
            message: "Enter your PIN? (Atleast 4 numbers)",
            type: "password",
            validate: (PIN) => {
              if (PIN.match(/^\d{4,}/)) {
                return true;
              } else {
                console.log(
                  chalk.red("Enter a valid PIN (Atleast 4 numbers)!")
                );
                return false;
              }
            },
            mask: "•",
          },
          {
            name: "mobileNumber",
            type: "input",
            message: "Enter your mobile no.",
            validate: (mobileNumber) => {
              if (validator.isMobilePhone(mobileNumber)) {
                return true;
              } else {
                return "Enter a valid mobile no.!";
              }
            },
          },
        ]
      );
      let runningAge = true;
      while (runningAge) {
        var { age } = await inquirer.prompt({
          name: "age",
          type: "number",
          message: "Enter your age!",
        });
        if (isNaN(age)) {
          console.log(chalk.redBright("Enter valid age!"));
        } else {
          runningAge = false;
        }
      }
      let runningAccountBalance = true;
      while (runningAccountBalance) {
        var { accountBalance } = await inquirer.prompt({
          name: "accountBalance",
          type: "number",
          message: "Enter your first deposit amount!",
        });
        if (isNaN(accountBalance)) {
          console.log(chalk.redBright("Enter valid amount!"));
        } else {
          runningAccountBalance = false;
        }
      }
      let { paymentMethod } = await inquirer.prompt([
        {
          name: "paymentMethod",
          type: "list",
          message: "Select payment type!",
          choices: ["Jazz Cash", "Easy Paisa"],
        },
      ]);
      let runningPIN = true;
      while (runningPIN) {
        var { PIN } = await inquirer.prompt({
          name: "PIN",
          type: "number",
          message: `Enter your PIN of ${paymentMethod}!`,
        });
        if (isNaN(PIN)) {
          console.log(chalk.redBright("Enter valid PIN!"));
        } else {
          runningPIN = false;
        }
      }
      const loader = ora("Checking Information...\n").start();
      await Title.AnimateBanner.sleep(2000);
      loader.succeed(
        chalk.greenBright.bold(
          `'${chalk.bgGray(
            accountBalance
          )}' has withdrawl from your ${paymentMethod} account.`
        )
      );
      this.bankAccount = new BankAccount.BankAccount(accountBalance);
      this.account = new Customer.Customer(
        fName,
        lName,
        gender,
        email,
        age,
        PIN,
        mobileNumber,
        accountBalance,
        this.bankAccount
      );
    }
    private static async LogIN() {
      let prompt = await inquirer.prompt([
        {
          name: "email",
          type: "input",
          message: "Enter your email!",
          validate: (email) => {
            if (validator.isEmail(email)) {
              return true;
            } else {
              return "Enter a valid email!";
            }
          },
        },
        {
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
        },
      ]);
      return prompt;
    }
    public static async createAccount() {
      await this.signUP();
      let login = await this.LogIN();
      while (true) {
        if (
          this.account.email === login.email &&
          this.account.PIN === login.PIN
        ) {
          break;
        } else {
          this.status = true;
        }
      }
    }
  }
}
