#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import animation from "chalk-animation";

class AnimateBanner {
  private static banner: string = `
  "Welcome to my countdown timer!"
   __  ___        ____   ___
  /_ |/ _  \\  _  |___  \\/ _ \\
   | | | | | (_)   __) | | | |
   | | | | |      |__ <| | | |
   | | |_| |  _   ___) | |_| |
   |_|\\___/  (_) |____/ \\___/
  \n

  Developed by MUHAMMED SAAD \n\n`;

  private static sleep(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  static async rainbowTitle() {
    const addRainbowTitle = animation.rainbow(AnimateBanner.banner); // Corrected method name to 'rainbowString'
    await AnimateBanner.sleep(2000);
    addRainbowTitle.stop();
  }
}

class Main {
  static async main() {
    await AnimateBanner.rainbowTitle();
    const { input } = await inquirer.prompt({
      name: "input",
      type: "input",
      message:
        "Enter date & time in the format 'dd-mm-yyyy_hh:mm:ss'. Time should be in 24-hour format. The hour between 01 to 24!",
      validate: function (input: string) {
        if (
          input
            .trim()
            .match(
              /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}\_(?:0[1-9]|1[0-9]|2[0-4]):[0-5][0-9]:[0-5][0-9]$/
            )
        ) {
          return true;
        } else {
          console.log("\nEnter a valid date and time!");
          return false;
        }
      },
    });
    const [date, time] = input.split("_");
    const [day, month, year] = date.split("-");
    const [hour, minute, second] = time.split(":");

    const inputDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second)
    );
    const intervalId = setInterval(() => {
      console.clear();
      const currentDate = Date.now();
      const difference = inputDate.getTime() - currentDate;
      if (difference > 0) {
        const millisecondsPerSecond = 1000;
        const millisecondsPerMinute = millisecondsPerSecond * 60;
        const millisecondsPerHour = millisecondsPerMinute * 60;
        const millisecondsPerDay = millisecondsPerHour * 24;
        const millisecondsPerMonth = millisecondsPerDay * 30;
        const millisecondsPerYear = millisecondsPerDay * 365;
        
        const leftYear = Math.floor(difference / millisecondsPerYear);
        const leftMonth = Math.floor((difference % millisecondsPerYear) / millisecondsPerMonth);
        const leftDay = Math.floor((difference % millisecondsPerMonth) / millisecondsPerDay);
        const leftHour = Math.floor((difference % millisecondsPerDay) / millisecondsPerHour);
        const leftMinute = Math.floor((difference % millisecondsPerHour) / millisecondsPerMinute);
        const leftSecond = Math.floor((difference % millisecondsPerMinute) / millisecondsPerSecond);
                
        process.stdout.write("Time Left:");
        if (!(leftYear < 1)) {
          process.stdout.write(`\tYears: ${leftYear}`);
        }
        if (!(leftMonth < 1)) {
          process.stdout.write(`\tMonths: ${leftMonth}`);
        }
        if (!(leftDay < 1)) {
          process.stdout.write(`\tDays: ${leftDay}`);
        }
        if (!(leftHour < 1)) {
          process.stdout.write(`\tHours: ${leftHour}`);
        }
        if (!(leftMinute < 1)) {
          process.stdout.write(`\tMinutes: ${leftMinute}`);
        }
        if (!(leftSecond < 1)) {
          process.stdout.write(`\tSeconds: ${leftSecond}`);
        }

        if (difference <= 0) {
          clearInterval(intervalId);
        }
      } else {
        console.log(chalk.redBright(`The time is Expired!`));
        process.exit();
      }
    }, 1000);
  }
}
Main.main();
