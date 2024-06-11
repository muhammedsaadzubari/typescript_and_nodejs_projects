#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import animation from "chalk-animation";
const print = (messages) => {
    process.stdout.write(messages);
};
const round = (arg) => {
    return Math.floor(arg);
};
class AnimateBanner {
    static banner = "TypeScript And NodeJs Projects\n\nProject #09: CountDown Timer\n\nDeveloped by MUHAMMED SAAD \n\n";
    static sleep(ms) {
        return new Promise((res) => setTimeout(res, ms));
    }
    static async rainbowTitle() {
        let add_rainbow_title = animation.rainbow(this.banner);
        await AnimateBanner.sleep(2000);
        add_rainbow_title.stop();
    }
}
class Main {
    static async timer() {
        const { input } = await inquirer.prompt({
            name: "input",
            type: "input",
            message: "Please enter the date and time in the following format: 'YYYY-MM-DD_HH:MM:SS' (24-hour format).",
            validate: function (input) {
                if (input.trim().match(/^((\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01])_(?:[01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])$/)) {
                    return true;
                }
                else {
                    print("\nEnter a valid date and time!");
                    return false;
                }
            },
        });
        const inputDate = Date.parse(input.replace('_', 'T'));
        const intervalId = setInterval(() => {
            console.clear();
            const currentDate = Date.now();
            const difference = inputDate - currentDate;
            if (difference > 0) {
                const millisecondsPerSecond = 1000;
                const millisecondsPerMinute = millisecondsPerSecond * 60;
                const millisecondsPerHour = millisecondsPerMinute * 60;
                const millisecondsPerDay = millisecondsPerHour * 24;
                const millisecondsPerMonth = millisecondsPerDay * 30;
                const millisecondsPerYear = millisecondsPerDay * 365;
                const leftYear = round(difference / millisecondsPerYear);
                const leftMonth = round((difference % millisecondsPerYear) / millisecondsPerMonth);
                const leftDay = round((difference % millisecondsPerMonth) / millisecondsPerDay);
                const leftHour = round((difference % millisecondsPerDay) / millisecondsPerHour);
                const leftMinute = round((difference % millisecondsPerHour) / millisecondsPerMinute);
                const leftSecond = round((difference % millisecondsPerMinute) / millisecondsPerSecond);
                print((chalk.rgb(255, 215, 0).bold)("Time Left:\n"));
                if (!(leftYear < 1))
                    print((chalk.bgBlueBright.bold)(`\tYears: ${leftYear}`));
                if (!(leftMonth < 1))
                    print((chalk.bgGreenBright.bold)(`\tMonths: ${leftMonth}`));
                if (!(leftDay < 1))
                    print((chalk.bgYellowBright.bold)(`\tDays: ${leftDay}`));
                if (!(leftHour < 1))
                    print((chalk.bgRedBright.bold)(`\tHours: ${leftHour}`));
                if (!(leftMinute < 1))
                    print((chalk.bgBlackBright.bold)(`\tMinutes: ${leftMinute}`));
                if (!(leftSecond < 1))
                    print((chalk.bgCyanBright.bold)(`\tSeconds: ${leftSecond}\r`));
            }
            else {
                print((chalk.redBright.bold)(`The timer has Expired!`));
                clearInterval(intervalId);
            }
        }, 1000);
    }
    static async main() {
        await AnimateBanner.rainbowTitle();
        await Main.timer();
        await AnimateBanner.sleep(2000);
    }
}
Main.main();
