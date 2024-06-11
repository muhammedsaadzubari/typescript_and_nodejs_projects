#!/usr/bin/env node
import chalk from "chalk";
import animation from "chalk-animation";
import inquirer from "inquirer";
import validator from "validator";
import ora from "ora";
var Title;
(function (Title) {
    class AnimateBanner {
        static banner = "TypeScript And NodeJs Projects\n\nProject #11: My Bank with Object-Oriented Promgramming\n\nDeveloped by MUHAMMED SAAD \n\n";
        static sleep(ms) {
            return new Promise((res) => setTimeout(res, ms));
        }
        static async rainbowTitle() {
            let add_rainbow_title = animation.rainbow(this.banner);
            await AnimateBanner.sleep(2000);
            add_rainbow_title.stop();
        }
    }
    Title.AnimateBanner = AnimateBanner;
})(Title || (Title = {}));
var BankAccount;
(function (BankAccount_1) {
    class BankAccount {
        accountBalance;
        constructor(balance) {
            this.accountBalance = balance;
        }
        debit(amount) {
            let statement = "Sorry, you have insufficient balance!";
            if (amount > 0) {
                statement = "The amount you entered is wrong!";
                if (this.accountBalance > amount) {
                    this.accountBalance -= amount;
                    statement = `Transaction successful! New account balance is ${this.accountBalance}.`;
                }
                else {
                    statement = "You don't have enough money to do this transaction!";
                }
            }
            return statement;
        }
        credit(amount) {
            let statement = "Transaction Failed!";
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
    BankAccount_1.BankAccount = BankAccount;
})(BankAccount || (BankAccount = {}));
var Customer;
(function (Customer_1) {
    class Customer {
        firstName;
        lastName;
        gender;
        age;
        mobileNumber;
        accountBalance;
        bankAccount;
        constructor(firstName, lastName, gender, age, mobileNumber, accountBalance, bankAccount) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.gender = gender;
            this.age = age;
            this.mobileNumber = mobileNumber;
            this.accountBalance = accountBalance;
            this.bankAccount = bankAccount;
        }
    }
    Customer_1.Customer = Customer;
})(Customer || (Customer = {}));
var CreateAccount;
(function (CreateAccount) {
    class SignUP {
        static account;
        static bankAccount;
        static async signUP() {
            let { fName, lName, email, gender, mobileNumber } = await inquirer.prompt([
                {
                    name: "fName",
                    type: "input",
                    message: "Enter your first name!",
                    validate: (fName) => {
                        if (fName.trim() !== "") {
                            return true;
                        }
                        else {
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
                        }
                        else {
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
                        }
                        else {
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
                    name: "mobileNumber",
                    type: "input",
                    message: "Enter your mobile no.",
                    validate: (mobileNumber) => {
                        if (validator.isMobilePhone(mobileNumber)) {
                            return true;
                        }
                        else {
                            return "Enter a valid mobile no.!";
                        }
                    },
                },
            ]);
            let runningAge = true;
            while (runningAge) {
                var { age } = await inquirer.prompt({
                    name: "age",
                    type: "number",
                    message: "Enter your age!",
                });
                if (isNaN(age)) {
                    console.log(chalk.redBright("Enter valid age!"));
                }
                else {
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
                }
                else {
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
                }
                else {
                    runningPIN = false;
                }
            }
            const loader = ora("Checking Information...\n").start();
            await Title.AnimateBanner.sleep(2000);
            loader.succeed((chalk.greenBright.bold)(`'${chalk.bgGray(accountBalance)}' has withdrawl from your ${paymentMethod} account.`));
            this.bankAccount = new BankAccount.BankAccount(accountBalance);
            this.account = new Customer.Customer(fName, lName, gender, age, mobileNumber, accountBalance, this.bankAccount);
        }
    }
    CreateAccount.SignUP = SignUP;
})(CreateAccount || (CreateAccount = {}));
CreateAccount.SignUP.signUP();
