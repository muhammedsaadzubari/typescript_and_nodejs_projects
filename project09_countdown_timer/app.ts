#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import animation from "chalk-animation";

type str = string;
type int = number;

const print = (messages: any) => {
  process.stdout.write(messages);
};
const round = (arg: int) => {
  return Math.floor(arg);
}

class AnimateBanner {
  private static banner: str = "TypeScript And NodeJs Projects\n\nProject #09: CountDown Timer\n\nDeveloped by MUHAMMED SAAD \n\n";
  public static sleep(ms: int): Promise<void> {
    return new Promise((res) => setTimeout(res, ms));
  }

  public static async rainbowTitle(): Promise<void> {
    let add_rainbow_title = animation.rainbow(this.banner);
    await AnimateBanner.sleep(2000);
    add_rainbow_title.stop();
  }
}

class Main {
  private static async timer() {
    const { input } = await inquirer.prompt({
      name: "input",
      type: "input",
      message: "Please enter the date and time in the following format: 'YYYY-MM-DD_HH:MM:SS' (24-hour format).",
      validate: function (input: string) {
        if (input.trim().match(/^((\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01])_(?:[01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])$/)) {
          return true;
        } else {
          print("\nEnter a valid date and time!");
          return false;
        }
      },
    });
    const inputDate: int = Date.parse(input.replace('_', 'T'))
    const intervalId = setInterval(() => {
      console.clear();
      const currentDate: int = Date.now();
      const difference: int = inputDate - currentDate;
      if (difference > 0) {
        const millisecondsPerSecond: int = 1000;
        const millisecondsPerMinute: int = millisecondsPerSecond * 60;
        const millisecondsPerHour: int = millisecondsPerMinute * 60;
        const millisecondsPerDay: int = millisecondsPerHour * 24;
        const millisecondsPerMonth: int = millisecondsPerDay * 30;
        const millisecondsPerYear: int = millisecondsPerDay * 365;

        const leftYear   : int = round(difference  / millisecondsPerYear);
        const leftMonth  : int = round((difference % millisecondsPerYear) / millisecondsPerMonth);
        const leftDay    : int = round((difference % millisecondsPerMonth) / millisecondsPerDay);
        const leftHour   : int = round((difference % millisecondsPerDay) / millisecondsPerHour);
        const leftMinute : int = round((difference % millisecondsPerHour) / millisecondsPerMinute);
        const leftSecond : int = round((difference % millisecondsPerMinute) / millisecondsPerSecond);

        print((chalk.rgb(255,215,0).bold)("Time Left:\n"));
        if (!(leftYear < 1))    print((chalk.bgBlueBright.bold)(`\tYears: ${leftYear}`));
        if (!(leftMonth < 1))   print((chalk.bgGreenBright.bold)(`\tMonths: ${leftMonth}`));
        if (!(leftDay < 1))     print((chalk.bgYellowBright.bold)(`\tDays: ${leftDay}`));
        if (!(leftHour < 1))    print((chalk.bgRedBright.bold)(`\tHours: ${leftHour}`));
        if (!(leftMinute < 1))  print((chalk.bgBlackBright.bold)(`\tMinutes: ${leftMinute}`));
        if (!(leftSecond < 1))  print((chalk.bgCyanBright.bold)(`\tSeconds: ${leftSecond}\r`));
      } else {
        print((chalk.redBright.bold)(`The timer has Expired!`));
        clearInterval(intervalId);
      }
    }, 1000);
  }
  public static async main(){
    await AnimateBanner.rainbowTitle();
      await Main.timer();
      await AnimateBanner.sleep(2000)
  }
}

Main.main()