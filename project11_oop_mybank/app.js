#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import animation from "chalk-animation";
var title;
(function (title) {
    class AnimateBanner {
        static banner = `
  Welcome to my countdown timer!
  \n
  $$\\      $$\\ $$\\     $$\\             $$$$$$$\\   $$$$$$\\  $$\\   $$\\ $$\\   $$\\ 
  $$$\\    $$$ |\\$$\\   $$  |            $$  __$$\\ $$  __$$\\ $$$\\  $$ |$$ | $$  |
  $$$$\\  $$$$ | \\$$\\ $$  /             $$ |  $$ |$$ /  $$ |$$$$\\ $$ |$$ |$$  / 
  $$\\$$\\$$ $$ |  \\$$$$  /              $$$$$$$\\ |$$$$$$$$ |$$ $$\\$$ |$$$$$  /  
  $$ \\$$$  $$ |   \\$$  /               $$  __$$\\ $$  __$$ |$$ \\$$$$ |$$  $$<   
  $$ |\\$  /$$ |    $$ |                $$ |  $$ |$$ |  $$ |$$ |\\$$$ |$$ |\\$$\\  
  $$ | \\_/ $$ |    $$ |                $$$$$$$  |$$ |  $$ |$$ | \\$$ |$$ | \\$$\\ 
  \\\__|     \\__|    \\__|                \\_______/ \\__|  \\__|\\__|  \\__|\\__|  \\__|
  \n
  Developed by MUHAMMED SAAD \n\n`;
        static sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }
        static async rainbowTitle() {
            const addRainbowTitle = animation.rainbow(AnimateBanner.banner);
            await AnimateBanner.sleep(2000);
            addRainbowTitle.stop();
        }
    }
    title.AnimateBanner = AnimateBanner;
})(title || (title = {}));
var Prompt;
(function (Prompt_1) {
    class Prompt {
        static async prompt_type_confirm(message) {
            let { prompt } = await inquirer.prompt({
                name: "prompt",
                type: "confirm",
                message,
            });
            return prompt;
        }
        static async prompt_type_input(message) {
            let { prompt } = await inquirer.prompt({
                name: "prompt",
                type: "input",
                message,
            });
            return prompt;
        }
        static async prompt_type_number(message) {
            let { prompt } = await inquirer.prompt({
                name: "prompt",
                type: "number",
                message,
            });
            return prompt;
        }
        static async prompt_type_list(message, choices) {
            let { prompt } = await inquirer.prompt({
                name: "prompt",
                type: "list",
                message,
                choices,
            });
            return prompt;
        }
    }
    Prompt_1.Prompt = Prompt;
})(Prompt || (Prompt = {}));
var MyBank;
(function (MyBank) {
    class Bank_Account {
        account_balance;
        constructor(balance) {
            this.account_balance = balance;
        }
        debit(amount) {
            let statement = "Sorry, you have insufficient balance!";
            if (amount > 0) {
                statement = "The amount you entered is wrong!";
                if (this.account_balance > amount) {
                    this.account_balance -= amount;
                    statement = `Transaction successful! New account balance is ${this.account_balance}.`;
                }
                else {
                    statement = "You don't have enough money to do this transaction!";
                }
            }
            return statement;
        }
        credit(amount) {
            let statement = "Transation Failed!";
            if (amount > 0) {
                this.account_balance += amount;
                if (amount > 100) {
                    this.account_balance -= 1;
                }
                statement = "Your account has been credited successfully!";
            }
            return statement;
        }
    }
    class Customer {
        first_name;
        last_name;
        gender;
        age;
        mobile_number;
        account_balance;
        static bank_account;
        constructor(first_name, last_name, gender, age, mobile_number, account_balance) {
            this.first_name = first_name;
            this.last_name = last_name;
            this.gender = gender;
            this.age = age;
            this.mobile_number = mobile_number;
            this.account_balance = account_balance;
        }
    }
    class Main {
        static account;
        static bank_account;
        static async create_account() {
            let first_name = await Prompt.Prompt.prompt_type_input("Enter your First name.");
            let last_name = await Prompt.Prompt.prompt_type_input("Enter your Last name.");
            let gender = await Prompt.Prompt.prompt_type_list("Select your gender.", [
                "Male",
                "Female",
            ]);
            let running1 = true;
            let age;
            while (running1) {
                age = await Prompt.Prompt.prompt_type_number("Enter your age.");
                if (isNaN(age)) {
                    console.log(chalk.redBright("Enter a valid age!"));
                }
                else {
                    running1 = false;
                }
            }
            let running = true;
            let mobile_number;
            while (running) {
                mobile_number = await Prompt.Prompt.prompt_type_input("Enter your Mobile number.");
                if (mobile_number.match(/^0\d{10}$/)) {
                    running = false;
                }
                else {
                    console.log(chalk.redBright("Enter a valid mobile no.!"));
                }
            }
            let running2 = true;
            let account_balance;
            while (running2) {
                account_balance = await Prompt.Prompt.prompt_type_number("Enter your first deposit amount.");
                if (isNaN(account_balance)) {
                    console.log(chalk.redBright("Enter a valid amount!"));
                }
                else {
                    running2 = false;
                }
            }
            this.account = new Customer(first_name, last_name, gender, age, mobile_number, account_balance);
        }
        static async create_account_main() {
            let operation = await Prompt.Prompt.prompt_type_list("Which operation do you want to perform!", ["Create Account", "Exit"]);
            switch (operation) {
                case "Create Account":
                    await this.create_account();
                    console.table(this.account);
                    break;
                default:
                    console.log(chalk.bgRedBright(chalk.bold("Exiting...")));
                    process.exit();
            }
            this.bank_account = new Bank_Account(this.account.account_balance);
        }
        static async main() {
            let operation2 = await Prompt.Prompt.prompt_type_list("Which operation do you want to perform!", ["Debit", "Credit", "Balance", "Exit"]);
            switch (operation2) {
                case "Debit":
                    let running1 = true;
                    let amount_Debit;
                    while (running1) {
                        amount_Debit = await Prompt.Prompt.prompt_type_number("How many amount do you want to debit?");
                        if (isNaN(amount_Debit)) {
                            console.log(chalk.redBright("Enter a valid amount!"));
                        }
                        else {
                            running1 = false;
                        }
                    }
                    let debit = this.bank_account.debit(amount_Debit);
                    console.log(debit);
                    console.log(chalk.yellowBright(`You current balance is ${chalk.bgGreenBright(chalk.bold(this.bank_account.account_balance))}.`));
                    break;
                case "Credit":
                    let running2 = true;
                    let amount_Credit;
                    while (running2) {
                        amount_Credit = await Prompt.Prompt.prompt_type_number("How many amount do you want to credit?");
                        if (isNaN(amount_Credit)) {
                            console.log(chalk.redBright("Enter a valid amount!"));
                        }
                        else {
                            running2 = false;
                        }
                    }
                    let credit = this.bank_account.credit(amount_Credit);
                    console.log(credit);
                    console.log(chalk.yellowBright(`You current balance is ${chalk.bgGreenBright(chalk.bold(this.bank_account.account_balance))}.`));
                    break;
                case "Balance":
                    console.log(chalk.yellowBright(`You current balance is ${chalk.bgGreenBright(chalk.bold(this.bank_account.account_balance))}.`));
                    break;
                default:
                    console.log(chalk.bgRedBright(chalk.bold("Exiting...")));
                    process.exit();
            }
        }
    }
    MyBank.Main = Main;
})(MyBank || (MyBank = {}));
(async () => {
    await title.AnimateBanner.rainbowTitle();
    await MyBank.Main.create_account_main();
    let running = true;
    while (running) {
        await MyBank.Main.main();
        running = await Prompt.Prompt.prompt_type_confirm("Do you want to continue?");
    }
    console.log(chalk.bgRedBright(chalk.bold("Exiting...")));
})();
