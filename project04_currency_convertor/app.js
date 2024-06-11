#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const currencyRates = {
    PKR: { PKR: 1, USD: 0.0036, SAR: 0.013, EUR: 0.0033, AED: 0.013, GBP: 0.00284 },
    USD: { PKR: 278.4, USD: 1, SAR: 3.75, EUR: 0.92, AED: 3.67, GBP: 0.79 },
    SAR: { PKR: 74.22, USD: 0.27, SAR: 1, EUR: 0.25, AED: 0.98, GBP: 0.21 },
    EUR: { PKR: 301.54, USD: 1.08, SAR: 4.06, EUR: 1, AED: 3.98, GBP: 0.86 },
    AED: { PKR: 75.81, USD: 0.27, SAR: 1.02, EUR: 0.25, AED: 1, GBP: 0.22 },
    GBP: { PKR: 351.43, USD: 1.26, SAR: 4.73, EUR: 1.17, AED: 4.64, GBP: 1 },
};
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
};
const title = async () => {
    let rainbowTitleAnimation = chalkAnimation.rainbow("TypeScript And NodeJs Projects\n\nProject #04: Currency Convertor\n\nDeveloped by MUHAMMED SAAD \n\n");
    await sleep();
    rainbowTitleAnimation.stop();
};
async function selectCurrency(promptMessage, choices) {
    const { currency } = await inquirer.prompt({
        name: "currency",
        message: (chalk.blueBright)(promptMessage),
        type: "list",
        choices: choices,
    });
    return currency;
}
async function getAmount(currency) {
    const { amount } = await inquirer.prompt({
        name: "amount",
        message: (chalk.rgb(33, 50, 56))(`Enter the amount of ${currency} to convert:`),
        type: "number",
    });
    if (amount) {
        return amount;
    }
    else {
        throw (chalk.redBright("Enter amount of value do you want to convert!"));
    }
}
async function restartOrExit() {
    const { choice } = await inquirer.prompt({
        name: "choice",
        message: (chalk.rgb(33, 50, 56))("Do you want to continue?"),
        type: "confirm",
    });
    return choice;
}
async function convertCurrency(fromCurrency, toCurrency, amount) {
    const conversionRate = currencyRates[fromCurrency][toCurrency];
    return amount * conversionRate;
}
async function main() {
    await title();
    let continueConversion = true;
    while (continueConversion) {
        try {
            const fromCurrency = await selectCurrency("Select currency to convert from:", Object.keys(currencyRates));
            const amount = await getAmount(fromCurrency);
            const toCurrency = await selectCurrency("Select currency to convert to:", Object.keys(currencyRates[fromCurrency]));
            const convertedValue = await convertCurrency(fromCurrency, toCurrency, amount);
            console.log((chalk.greenBright)(`Converted value: ${convertedValue.toFixed(2)} ${toCurrency}`));
        }
        catch (error) {
            console.log(error);
        }
        continueConversion = await restartOrExit();
    }
    if (!(continueConversion))
        console.log((chalk.redBright)("Exiting..."));
}
main();
