#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import animation from "chalk-animation";

namespace title {
  export class AnimateBanner {
    private static banner: string = `
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

    private static sleep(ms: number): Promise<void> {
      return new Promise<void>((resolve) => setTimeout(resolve, ms));
    }

    static async rainbowTitle() {
      const addRainbowTitle = animation.rainbow(AnimateBanner.banner);
      await AnimateBanner.sleep(2000);
      addRainbowTitle.stop();
    }
  }
}
namespace Prompt {
  export class Prompt {
    static async prompt_type_confirm(message: string): Promise<boolean> {
      let { prompt } = await inquirer.prompt({
        name: "prompt",
        type: "confirm",
        message,
      });
      return prompt;
    }
    static async prompt_type_input(message: string): Promise<string> {
      let { prompt } = await inquirer.prompt({
        name: "prompt",
        type: "input",
        message,
      });
      return prompt;
    }
    static async prompt_type_number(message: string): Promise<number> {
      let { prompt } = await inquirer.prompt({
        name: "prompt",
        type: "number",
        message,
      });
      return prompt;
    }
    static async prompt_type_list(
      message: string,
      choices: string[]
    ): Promise<string> {
      let { prompt } = await inquirer.prompt({
        name: "prompt",
        type: "list",
        message,
        choices,
      });
      return prompt;
    }
  }
}

namespace MyBank {
  interface I_Bank_Account {
    debit(amount: number): string;
    credit(amount: number): string;
  }
  class Bank_Account implements I_Bank_Account {
    public account_balance: number;
    constructor(balance: number) {
      this.account_balance = balance;
    }
    public debit(amount: number): string {
      let statement: string = "Sorry, you have insufficient balance!";
      if (amount > 0) {
        statement = "The amount you entered is wrong!";
        if (this.account_balance > amount) {
          this.account_balance -= amount;
          statement = `Transaction successful! New account balance is ${this.account_balance}.`;
        } else {
          statement = "You don't have enough money to do this transaction!";
        }
      }
      return statement;
    }
    public credit(amount: number): string {
      let statement: string = "Transation Failed!";
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
    public static bank_account: Bank_Account;
    constructor(
      public first_name: string,
      public last_name: string,
      public gender: string,
      public age: number,
      public mobile_number: string,
      public account_balance: number
    ) {}
  }
  export class Main {
    static account: Customer;
    static bank_account: Bank_Account;

    public static async create_account(): Promise<void> {
      let first_name = await Prompt.Prompt.prompt_type_input(
        "Enter your First name."
      );
      let last_name = await Prompt.Prompt.prompt_type_input(
        "Enter your Last name."
      );
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
        } else {
          running1 = false;
        }
      }
      let running = true;
      let mobile_number;
      while (running) {
        mobile_number = await Prompt.Prompt.prompt_type_input(
          "Enter your Mobile number."
        );
        if (mobile_number.match(/^0\d{10}$/)) {
          running = false;
        } else {
          console.log(chalk.redBright("Enter a valid mobile no.!"));
        }
      }
      let running2 = true;
      let account_balance;
      while (running2) {
        account_balance = await Prompt.Prompt.prompt_type_number(
          "Enter your first deposit amount."
        );
        if (isNaN(account_balance)) {
          console.log(chalk.redBright("Enter a valid amount!"));
        } else {
          running2 = false;
        }
      }
      this.account = new Customer(
        first_name,
        last_name,
        gender,
        age as number,
        mobile_number as string,
        account_balance as number
      );
    }
    public static async create_account_main() {
      let operation = await Prompt.Prompt.prompt_type_list(
        "Which operation do you want to perform!",
        ["Create Account", "Exit"]
      );
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
    public static async main() {
      let operation2 = await Prompt.Prompt.prompt_type_list(
        "Which operation do you want to perform!",
        ["Debit", "Credit", "Balance", "Exit"]
      );
      switch (operation2) {
        case "Debit":
          let running1 = true;
          let amount_Debit;
          while (running1) {
            amount_Debit = await Prompt.Prompt.prompt_type_number(
              "How many amount do you want to debit?"
            );
            if (isNaN(amount_Debit)) {
              console.log(chalk.redBright("Enter a valid amount!"));
            } else {
              running1 = false;
            }
          }
          let debit = this.bank_account.debit(amount_Debit as number);
          console.log(debit);
          console.log(
            chalk.yellowBright(
              `You current balance is ${chalk.bgGreenBright(
                chalk.bold(this.bank_account.account_balance)
              )}.`
            )
          );
          break;
        case "Credit":
          let running2 = true;
          let amount_Credit;
          while (running2) {
            amount_Credit = await Prompt.Prompt.prompt_type_number(
              "How many amount do you want to credit?"
            );
            if (isNaN(amount_Credit)) {
              console.log(chalk.redBright("Enter a valid amount!"));
            } else {
              running2 = false;
            }
          }
          let credit = this.bank_account.credit(amount_Credit as number);
          console.log(credit);
          console.log(
            chalk.yellowBright(
              `You current balance is ${chalk.bgGreenBright(
                chalk.bold(this.bank_account.account_balance)
              )}.`
            )
          );
          break;
        case "Balance":
          console.log(
            chalk.yellowBright(
              `You current balance is ${chalk.bgGreenBright(
                chalk.bold(this.bank_account.account_balance)
              )}.`
            )
          );
          break;
        default:
          console.log(chalk.bgRedBright(chalk.bold("Exiting...")));
          process.exit();
      }
    }
  }
}

(async () => {
  await title.AnimateBanner.rainbowTitle();
  await MyBank.Main.create_account_main();
  let running = true;
  while (running) {
    await MyBank.Main.main();
    running = await Prompt.Prompt.prompt_type_confirm(
      "Do you want to continue?"
    );
  }
  console.log(chalk.bgRedBright(chalk.bold("Exiting...")));
})();
