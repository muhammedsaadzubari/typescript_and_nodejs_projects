#!/usr/bin/env node
import ora from "ora";
import chalk from "chalk";
import inquirer from "inquirer";
import validator from "validator";
import animation from "chalk-animation";
const print = (...message) => {
    console.log(...message);
};
const exit = () => {
    print((chalk.bgRedBright.bold)("Exiting..."));
    process.exit();
};
var MyBank;
(function (MyBank) {
    class AnimateBanner {
        static banner = "TypeScript And NodeJs Projects\n\nProject #11: My Bank with Object-Oriented Promgramming\n\nDeveloped by MUHAMMED SAAD \n\n";
        static sleep(ms) {
            return new Promise((res) => setTimeout(res, ms));
        }
        static async rainbowTitle() {
            let addRainbowTitle = animation.rainbow(AnimateBanner.banner);
            await AnimateBanner.sleep(1000);
            addRainbowTitle.stop();
        }
    }
    MyBank.AnimateBanner = AnimateBanner;
    class Customer {
        firstName;
        lastName;
        gender;
        email;
        age;
        PIN;
        mobileNumber;
        accountBalance;
        constructor(firstName, lastName, gender, email, age, PIN, mobileNumber, accountBalance) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.gender = gender;
            this.email = email;
            this.age = age;
            this.PIN = PIN;
            this.mobileNumber = mobileNumber;
            this.accountBalance = accountBalance;
        }
        ;
    }
    MyBank.Customer = Customer;
    class BankAccount {
        accountBalance = CreateAccount.account.accountBalance;
        debit(amount) {
            let statement = "Sorry, you have insufficient balance!";
            if (amount > 0) {
                statement = "The amount you entered is wrong!";
                if (this.accountBalance >= amount) {
                    this.accountBalance -= amount;
                    statement = `Transaction successful! New account balance is ${this.accountBalance}.`;
                }
                else {
                    statement = "You don't have enough money to do this transaction!";
                }
            }
            print((chalk.bgGreenBright.bold)(`\n${statement}`));
            print(`Your current balance is ${(chalk.bgGrey.bold)(this.accountBalance)}\n`);
            CreateAccount.account.accountBalance = this.accountBalance;
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
            print((chalk.bgGreenBright.bold)(`\n${statement}`));
            print(`Your current balance is ${(chalk.bgGrey.bold)(this.accountBalance)}\n`);
            CreateAccount.account.accountBalance = this.accountBalance;
        }
    }
    MyBank.BankAccount = BankAccount;
    class CreateAccount {
        static account;
        static isLogIn = false;
        static bankAccount;
        static async signUP() {
            let { firstName, lastName, birthDate, gender, email, mobileNO, PIN, accountBalance, paymentMethod, paymentMethodPIN } = await inquirer.prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: (chalk.bold.blueBright)("Please input your first name:"),
                    validate: (firstName) => {
                        if (firstName.trim().length === 0) {
                            return (chalk.bold.redBright)("Enter a valid first name!");
                        }
                        else {
                            return true;
                        }
                    }
                },
                {
                    name: "lastName",
                    type: "input",
                    message: (chalk.bold.blueBright)("Please input your last name:"),
                    validate: (lastName) => {
                        if (lastName.trim().length === 0) {
                            return (chalk.bold.redBright)("Enter a valid last name!");
                        }
                        else {
                            return true;
                        }
                    }
                },
                {
                    name: "birthDate",
                    type: "input",
                    message: (chalk.bold.blueBright)("Please input your birth date (mm/dd/yyyy):"),
                    validate: (birthDate) => {
                        let date = new Date(birthDate).getTime();
                        if (date < Date.now()) {
                            return true;
                        }
                        else {
                            return (chalk.bold.redBright)("Enter a valid date!");
                        }
                    }
                },
                {
                    name: "gender",
                    type: "list",
                    message: (chalk.bold.blueBright)("Please select your gender:"),
                    choices: ["Male", "Female"]
                },
                {
                    name: "email",
                    type: "input",
                    message: (chalk.bold.blueBright)("Please input your email:"),
                    validate: (email) => {
                        if (validator.isEmail(email)) {
                            return true;
                        }
                        else {
                            return (chalk.bold.redBright)("Enter a valid email!");
                        }
                    }
                },
                {
                    name: "mobileNO",
                    type: "input",
                    message: (chalk.bold.blueBright)("Please input your mobile number:"),
                    validate: (mobileNO) => {
                        if (validator.isMobilePhone(mobileNO)) {
                            return true;
                        }
                        else {
                            return (chalk.bold.redBright)("Enter a valid mobile number!");
                        }
                    }
                },
                {
                    name: "PIN",
                    type: "password",
                    message: (chalk.bold.blueBright)("Please input your PIN:"),
                    mask: "•",
                    validate: (PIN) => {
                        if (PIN.match(/^\d{4,}$/)) {
                            return true;
                        }
                        else {
                            return (chalk.bold.redBright)("Enter a valid PIN!");
                        }
                    }
                },
                {
                    name: "accountBalance",
                    type: "input",
                    message: (chalk.bold.blueBright)("Please input your initial account balance:"),
                    validate: (accountBalance) => {
                        if (Number(accountBalance) >= 100) {
                            return true;
                        }
                        else {
                            return (chalk.bold.redBright)("Enter a valid account balance (Atleast 100/-)!");
                        }
                    }
                },
                {
                    name: "paymentMethod",
                    type: "list",
                    message: (chalk.bold.blueBright)("Please select your payment method:"),
                    choices: ["Jazz Cash", "Easy Paisa"]
                },
                {
                    name: "paymentMethodPIN",
                    type: "password",
                    message: (chalk.bold.blueBright)(`Please input your PIN of your selected method:`),
                    mask: "•",
                    validate: (paymentMethodPIN) => {
                        if (paymentMethodPIN.match(/^\d{4,}$/)) {
                            return true;
                        }
                        else {
                            return (chalk.bold.redBright)("Enter a valid PIN!");
                        }
                    }
                }
            ]);
            let balance = Number(accountBalance);
            let age = new Date().getFullYear() - new Date(birthDate).getFullYear();
            await AnimateBanner.sleep(1000);
            console.log('\n');
            const loader = ora("Checking Information...\n").start();
            await AnimateBanner.sleep(2000);
            loader.succeed((chalk.bold.greenBright)(` Your account has created and amount '${(chalk.green)(balance)}/-' was deposited successfully!`));
            this.account = new Customer(firstName, lastName, gender, email, age, PIN, mobileNO, balance);
            this.bankAccount = new BankAccount();
        }
        static async logIN(account) {
            let input = await inquirer.prompt([
                {
                    name: "email",
                    type: "input",
                    message: (chalk.bold.blueBright)("Please input your email:"),
                    validate: (email) => {
                        if (validator.isEmail(email)) {
                            return true;
                        }
                        else {
                            return (chalk.bold.redBright)("Enter a valid email!");
                        }
                    }
                },
                {
                    name: "PIN",
                    type: "password",
                    message: (chalk.bold.blueBright)("Please input your PIN:"),
                    mask: "•",
                    validate: (PIN) => {
                        if (PIN.match(/^\d{4,}$/)) {
                            return true;
                        }
                        else {
                            return (chalk.bold.redBright)("Enter a valid PIN!");
                        }
                    }
                }
            ]);
            await AnimateBanner.sleep(1000);
            console.log('\n');
            const loader = ora("Checking Information...\n").start();
            await AnimateBanner.sleep(2000);
            if (input.email === account.email && input.PIN === account.PIN) {
                loader.succeed((chalk.bold.greenBright)('You have logged In!\n'));
                CreateAccount.isLogIn = true;
            }
            else {
                loader.fail((chalk.redBright.bold)('You fail to log In!'));
                CreateAccount.isLogIn = false;
            }
        }
        static async createAccount() {
            let SignUP;
            (function (SignUP) {
                SignUP["I"] = "Sign UP";
                SignUP["II"] = "Exit";
            })(SignUP || (SignUP = {}));
            ;
            let LogIN;
            (function (LogIN) {
                LogIN["I"] = "Log IN";
                LogIN["II"] = "Exit";
            })(LogIN || (LogIN = {}));
            ;
            let { inputForSignUP } = await inquirer.prompt([
                {
                    name: "inputForSignUP",
                    type: "list",
                    message: "Select operation to perform!",
                    choices: Object.values(SignUP)
                }
            ]);
            switch (inputForSignUP) {
                case SignUP.I:
                    await CreateAccount.signUP();
                    console.table(this.account);
                    console.log('\n');
                    break;
                default:
                    exit();
            }
            let { inputForLogIN } = await inquirer.prompt([
                {
                    name: "inputForLogIN",
                    type: "list",
                    message: "Select operation to perform!",
                    choices: Object.values(LogIN)
                }
            ]);
            let running = true;
            while (running) {
                switch (inputForLogIN) {
                    case LogIN.I:
                        await CreateAccount.logIN(CreateAccount.account);
                        break;
                    default:
                        exit();
                }
                if (CreateAccount.isLogIn === true) {
                    break;
                }
                else {
                    const { confirm } = await inquirer.prompt({
                        name: "confirm",
                        type: "confirm",
                        message: "Do you want to continue?",
                    });
                    running = confirm;
                }
            }
        }
    }
    MyBank.CreateAccount = CreateAccount;
    class Bank {
        static async bank() {
            let Operation;
            (function (Operation) {
                Operation["I"] = "Debit";
                Operation["II"] = "Credit";
                Operation["III"] = "Balance Inquiry";
                Operation["IV"] = "Exit";
            })(Operation || (Operation = {}));
            const { operation } = await inquirer.prompt({
                name: "operation",
                type: "list",
                message: "Select operation to perform!",
                choices: Object.values(Operation),
            });
            switch (operation) {
                case Operation["I"]:
                    let { amountForDebit } = await inquirer.prompt({
                        name: "amountForDebit",
                        type: "input",
                        message: (chalk.bold.blueBright)("How many amount do you want to debit?"),
                        validate: (amountForDebit) => {
                            if (isNaN(Number(amountForDebit))) {
                                return (chalk.bold.redBright)("Enter a valid amount!");
                            }
                            else {
                                return true;
                            }
                        }
                    });
                    let debitAmount = Number(amountForDebit);
                    CreateAccount.bankAccount.debit(debitAmount);
                    break;
                case Operation["II"]:
                    let { amountForCredit } = await inquirer.prompt({
                        name: "amountForCredit",
                        type: "input",
                        message: (chalk.bold.blueBright)("How many amount do you want to credit?"),
                        validate: (amountForCredit) => {
                            if (isNaN(Number(amountForCredit))) {
                                return (chalk.bold.redBright)("Enter a valid amount!");
                            }
                            else {
                                return true;
                            }
                        }
                    });
                    let creditAmount = Number(amountForCredit);
                    CreateAccount.bankAccount.credit(creditAmount);
                    break;
                case Operation["III"]:
                    print(`\nYour current balance is ${(chalk.bgGrey.bold)(CreateAccount.account.accountBalance)}\n`);
                    break;
                default:
                    exit();
            }
        }
    }
    MyBank.Bank = Bank;
    class Main {
        static async main() {
            await MyBank.AnimateBanner.rainbowTitle();
            await MyBank.CreateAccount.createAccount();
            let bool = true;
            while (bool) {
                await MyBank.Bank.bank();
            }
        }
    }
    MyBank.Main = Main;
})(MyBank || (MyBank = {}));
MyBank.Main.main();
