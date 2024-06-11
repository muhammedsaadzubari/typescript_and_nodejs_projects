#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";
const print = (...message) => {
    console.log(...message);
};
const random = (number) => {
    return Math.floor(Math.random() * number);
};
const promptList = async (message, choices) => {
    let { input } = await inquirer.prompt({
        name: "input",
        type: "list",
        message,
        choices,
    });
    return input;
};
const promptConfirm = async () => {
    let { input } = await inquirer.prompt({
        name: "input",
        type: "confirm",
        message: (chalk.redBright)("Do you want to continue?")
    });
    return input;
};
const exitMessage = (line) => {
    print((chalk.bgCyan.bold)(line));
    print((chalk.bgCyan.bold)('# THANKYOU FOR PLAYING! #'));
    print((chalk.bgCyan.bold)(line));
};
class Animate_Banner {
    static #banner = "TypeScript And NodeJs Projects\n\nProject #07: Adventure Game\n\nDeveloped by MUHAMMED SAAD \n\n";
    static #sleep(ms) {
        return new Promise((res) => setTimeout(res, ms));
    }
    static async rainbow_title() {
        let add_rainbow_title = animation.rainbow(this.#banner);
        await this.#sleep(2000);
        add_rainbow_title.stop();
    }
}
class Main {
    static async game() {
        let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
        let maxEnemyHealth = 75;
        let enemyAttackDamage = 25;
        let health = 100;
        let attackDamage = 50;
        let numHealthPotions = 3;
        let healthPotionsHealAmount = 30;
        let healthPotionDropChance = 50; // %
        let line1 = ("~".repeat(80));
        let line2 = ("#".repeat(25));
        let running = true;
        let Options_1;
        (function (Options_1) {
            Options_1["I"] = "1. Attack";
            Options_1["II"] = "2. Drink Health Potion";
            Options_1["III"] = "3. Run";
        })(Options_1 || (Options_1 = {}));
        let Options_2;
        (function (Options_2) {
            Options_2["I"] = "1. Continue Fighting";
            Options_2["II"] = "2. Exit Dungeon";
        })(Options_2 || (Options_2 = {}));
        console.log((chalk.bgGreenBright.bold)("Welcome to the dungeon!"));
        GAME: while (running) {
            let enemyHealth = random(maxEnemyHealth);
            let enemy = enemies[random(enemies.length)];
            print(line1);
            print(`\t# ${enemy} appeared! #\n`);
            while (enemyHealth > 0) {
                print(`\tYour HP: ${health}`);
                print(`\t${enemy}'s HP: ${enemyHealth}`);
                print(`\n`);
                let input1 = await promptList("What would you like to do?", Object.values(Options_1));
                switch (input1) {
                    case Options_1["I"]:
                        let damageDealt = random(attackDamage);
                        let damageTaken = random(enemyAttackDamage);
                        enemyHealth -= damageDealt;
                        health -= damageTaken;
                        print(`\t> You strike the ${enemy} for ${damageDealt} damage.`);
                        print(`\t> You recieve ${damageTaken} in retaliation!`);
                        if (health < 1) {
                            print(`\t> You have taken too much damage, you are too weak to go on!`);
                            break;
                        }
                        break;
                    case Options_2["II"]:
                        if (numHealthPotions > 0) {
                            health += healthPotionsHealAmount;
                            numHealthPotions--;
                            print(`\t> You drink a health potion, healing yourself for ${healthPotionsHealAmount}. \n\t> You now have ${health} HP. \n\t> You have ${numHealthPotions} health potions left. \n`);
                        }
                        else {
                            print(`\t> You have no health potions left! Defeat enemies for a chance to get one!\n`);
                        }
                        break;
                    default:
                        print(`\t You run away from the ${enemy}!`);
                        continue GAME;
                }
                if (health < 1) {
                    print(`You limp out of the dungeon, weak from battle.`);
                    print((chalk.bgCyan.bold)(line2));
                    print((chalk.bgCyan.bold)('# THANKYOU FOR PLAYING! #'));
                    print((chalk.bgCyan.bold)(line2));
                    break GAME;
                }
                print(line1);
                print(` # ${enemy} was defeated! # `);
                print(` # You have ${health} HP left # `);
                print('\n');
                if (random(100) < healthPotionDropChance) {
                    numHealthPotions++;
                    print(` # The ${enemy} dropped a health potion! # `);
                    print(` # You now have ${numHealthPotions} health potion(s). #\n `);
                }
                let input2 = await promptList('What would you like to do?', Object.values(Options_2));
                switch (input2) {
                    case Options_2["I"]:
                        print((chalk.greenBright.bold)('You continue on your adventure!'));
                        break;
                    default:
                        print((chalk.redBright.bold)(`You exit the dungeon, successful from your adventures!`));
                        exitMessage(line2);
                        process.exit();
                }
            }
        }
    }
    static async main() {
        let running = true;
        Animate_Banner.rainbow_title();
        while (running) {
            await Main.game();
            running = await promptConfirm();
        }
        print((chalk.bgRedBright.bold)('Exiting...'));
    }
}
Main.main();
