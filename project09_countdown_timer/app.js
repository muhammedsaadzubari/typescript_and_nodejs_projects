#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_animation_1 = __importDefault(require("chalk-animation"));
class AnimateBanner {
    static sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    static rainbowTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            const addRainbowTitle = chalk_animation_1.default.rainbow(AnimateBanner.banner); // Corrected method name to 'rainbowString'
            yield AnimateBanner.sleep(2000);
            addRainbowTitle.stop();
        });
    }
}
AnimateBanner.banner = `
  "Welcome to my countdown timer!"
   __  ___        ____   ___
  /_ |/ _  \\  _  |___  \\/ _ \\
   | | | | | (_)   __) | | | |
   | | | | |      |__ <| | | |
   | | |_| |  _   ___) | |_| |
   |_|\\___/  (_) |____/ \\___/
  \n

  Developed by MUHAMMED SAAD \n\n`;
class Main {
    static main() {
        return __awaiter(this, void 0, void 0, function* () {
            yield AnimateBanner.rainbowTitle();
            const { input } = yield inquirer_1.default.prompt({
                name: "input",
                type: "input",
                message: "Enter date & time in the format 'dd-mm-yyyy_hh:mm:ss'. Time should be in 24-hour format. The hour between 01 to 24!",
                validate: function (input) {
                    if (input
                        .trim()
                        .match(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}\_(?:0[1-9]|1[0-9]|2[0-4]):[0-5][0-9]:[0-5][0-9]$/)) {
                        return true;
                    }
                    else {
                        console.log("\nEnter a valid date and time!");
                        return false;
                    }
                },
            });
            const [date, time] = input.split("_");
            const [day, month, year] = date.split("-");
            const [hour, minute, second] = time.split(":");
            const inputDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));
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
                }
                else {
                    console.log(chalk_1.default.redBright(`The time is Expired!`));
                    process.exit();
                }
            }, 1000);
        });
    }
}
Main.main();
