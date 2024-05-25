#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";
class Animate_Banner {
    static #banner = `
  Let's play the adventure game! \n
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀ ⡤ ⠒ ⢁ ⣀ ⣲ ⣤ ⣈⠁⠒⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣎⣰⣿⡟⡥⠖⠚⠙⡆⠉⢿⣿⣿⣿⣿⣿⣿⣿⣷⡌⢣⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⡔⠁⠀⠐⠀⠀⠙⢦⠀⠀⠀⠀⠀⠀⠀⡼⣿⣿⣿⠀⠈⢧⠘⡄⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠘⣄⠀⠀⢀⡤⠒⢰⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⡴⠁⠀⠠⢄⡀⠀⠀⠠⢈⣇⡀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣧⡀⣸⠶⠛⢮⡙⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣘⣤⠖⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡜⠀⠀⠀⠀⣀⠙⡆⢀⢀⣇⠀⠙⡄⠀⠀⠀⠀⠘⣿⣿⣿⡿⢋⣠⣤⣴⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⠁⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠃⠀⠀⠑⠪⣀⣠⢃⣜⢼⡦⠄⢠⠃⠀⠀⠀⠀⠀⠘⣿⣿⣾⣿⣿⣿⡿⢿⠿⠉⣴⣿⠟⠉⠀⠀⠈⣽⠉⠉⣿⢯⡅⠀⠀⠀⠀⢀⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠑⡍⠉⠀⠀⠁⡠⠋⠀⠀⠀⠀⠀⠀⠐⣿⣿⡿⣿⡿⡟⢿⣶⡂⡾⢿⣅⠀⠀⠘⢟⣰⠟⠀⣿⣟⠩⡇⠀⠀⠀⣠⠞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⢳⢌⣧⠀⡟⠁⠀⠈⠂⠩⡛⠒⠒⠋⠁⠀⣴⣿⣿⣶⣧⠀⠀⢰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡄⠀⠀⠀⠀⠀⠀⠀⠀⣰⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣏⣟⢴⠁⠀⡀⠀⢀⣀⡵⠀⠀⢀⣀⣰⣿⣏⡘⢿⡿⠀⠀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠇⠀⠀⠀⠀⠀⠀⠀⠈⠙⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⡄⣇⡆⣃⣼⠟⡻⠿⠿⣿⡿⠿⠿⠿⣸⡸⢸⣥⣤⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢆⠀⠀⠀⠀⠀⠀⢀⣠⣴⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣻⣿⣾⣦⡾⠥⠔⠓⠊⠉⠤⠀⠒⠃⠉⢹⠇⠸⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠔⠊⠉⠓⠦⡀⠀⠀⠀⠀
⠀⠉⢻⣷⣶⣿⣿⣿⣿⣿⡵⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⢯⣻⣗⡢⠭⠛⠒⠂⠉⠉⠁⠉⠉⠉⠀⣰⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣰⠁⠠⠤⠤⢄⣀⠈⢢⠀⠀⠀
⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣗⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡇⡠⠄⠀⠀⠀⠀⠀⠀⠀⠀⢁⢴⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⡐⠁⠀⢀⠀⠀⠀⠀⠈⠁⠀⢣⠀⠀
⠀⠀⠀⠀⠘⢿⣿⣿⣿⣿⣿⣿⣞⡄⠀⠀⠀⠀⠀⠀⠀⠀⣀⡠⡔⠊⣽⣾⣤⡀⠀⠀⠀⠀⠀⠀⠀⢰⣷⣾⣿⣼⠐⠂⣤⣀⠀⠀⠀⠀⠀⠳⣎⠔⠁⠀⠀⠀⠀⠀⠀⠀⡘⡆⠀
⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣷⡀⠀⢀⡠⡤⠒⠊⢁⢀⣔⣤⣴⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣶⣾⠅⠙⠢⡀⠀⠀⠀⡏⢀⡔⠊⠀⠀⠀⠀⠀⢸⢡⢧⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⢻⠃⢢⣦⣄⡘⢆⠀⠀⢣⡎⠀⢀⡀⠀⠀⠀⠀⠀⢋⠾⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⢿⣿⢟⠛⣿⣆⣤⣤⣶⣶⣿⣿⣿⣿⣿⣿⣇⣿⣾⣿⣿⣿⣿⣮⢇⠀⠀⠣⣀⢀⠟⠀⠀⠀⠀⠀⠘⡄⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣥⣿⣿⣿⣿⣿⣿⣿⣿⣿⣣⠀⠀⢼⠰⢄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡃⠀⠀⣿⣿⡿⡿⠹⣿⣿⣿⣿⣿⣟⡆⢀⣾⣧⣀⠉⠀⠀⠀⠀⠀⢀⡜
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣾⣿⣿⢯⠁⠀⢹⣿⣿⣿⣿⣿⣡⣿⣿⣿⣿⣿⣷⣶⣶⡶⠋⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡟⠀⠀⠀⠀⠀⠀⠉⠛⠛⠿⣿⣿⣿⡁⣇⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠴⠞⠋⢱⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣧⡊⠲⢄⡀⠀⠘⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⠶⠋⠁⠀⠀⠀⠈⠻⣶⣤⣄⣀⣀⣠⣤⡴⠐⠛⠁⠀⠀⠀⠀⠈⠙⢶⣄⠈⠻⠿⠿⠟⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠺⠃⠁⠀⠀⠀⠀⠀⢀⣀⣠⣬⣿⣿⣿⣿⣿⣿⣧⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠔⠛⠁⠀⠀⠀⠀⠀⣠⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣄⠀⠀⠀⠀⠀⠀⠀⠙⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⠞⠉⠀⠀⠀⠀⣀⣤⣶⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠉⠉⠉⠉⠁⠒⠤⡙⢿⣿⣿⣦⣄⠀⠀⠀⠀⠀⠀⠙⢵⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠶⠋⠁⠀⠀⠀⣠⣴⣾⣿⣿⣿⣿⣿⣿⡿⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⠬⣛⠿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠙⠷⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡠⠞⠁⠀⠀⠀⣠⣴⣿⣿⣿⣿⣿⡿⠿⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠑⠪⢝⡷⣤⣀⣀⢀⣀⣤⣴⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡝⣿⣿⣿⣿⣿⣿⣷⣄⠙⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡯⣸⣿⣿⣿⣿⣿⣿⣿⢸⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡽⣿⣿⣿⣿⣿⣿⣿⣧⡀⠑⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠂⣿⣿⣿⣿⣿⣿⣿⣿⡄⡇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡻⣿⣿⣿⣿⣿⣿⣿⣿⣦⠈⢣⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢀⣿⣿⣿⣿⣿⣿⣿⣿⡇⡇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⡹⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠁⣾⣿⣿⣿⣿⣿⣿⣿⣿⣧⠃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣯⠳⣤⡀⠀⠉⠉⢁⣀⠀⠆⠪⠹⡛⠛⠛⠛⠋⠉⠀⠀⢈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠞⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⢷⣄⠂⠐⠋⠍⠑⠊⠁⠀⠉⠁⠈⠁⠂⠀⠀⠀⠀⢀⡼⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠑⠭⣙⠛⣛⠿⠛⠉⠁⠙⠪⠷⢤⣀⡀⡀⢀⠀
⠀⠀⠀⠀⠀⠀⠀⠉⠛⠶⢤⣄⣀⣀⣀⣀⣤⠤⠴⠆⠀⠐⠒⠚⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠚⠋⢽⠏⠉⠃
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⣠⡆
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⡶⣄⣀⠀⠀⠀⠀⣀⣠⣤⡞⠋⠀  \n

Develop by MUHAMMED SAAD \n\n`;
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
    static async main() {
        // Game Variables:
        let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
        let maxEnemyHealth = 75;
        let enemyAttackDamage = 25;
        // Player Variables:
        let health = 100;
        let attackDamage = 50;
        let numHealthPotions = 3;
        let healthPotionsHealAmount = 30;
        let healthPotionDropChance = 50; //Percentage
        // Enum of Options:
        let Options;
        (function (Options) {
            Options[Options["1. Attack"] = 0] = "1. Attack";
            Options[Options["2. Drink health potion"] = 1] = "2. Drink health potion";
            Options[Options["3. Run"] = 2] = "3. Run";
        })(Options || (Options = {}));
        let Options_;
        (function (Options_) {
            Options_[Options_["1. Continue fighting"] = 0] = "1. Continue fighting";
            Options_[Options_["2. Exit dungeon"] = 1] = "2. Exit dungeon";
        })(Options_ || (Options_ = {}));
        let running = true;
        console.log(chalk.yellowBright("Welcome to the Dungeon!\n\n"));
        GAME: while (running) {
            console.log("~".repeat(80));
            let enemyHealth = Math.floor(Math.random() * maxEnemyHealth);
            let enemy = enemies[Math.floor(Math.random() * enemies.length)];
            console.log(`\t# ${enemy} appeared! #\n`);
            while (enemyHealth > 0) {
                console.log(`\tYour HP: ${health}`);
                console.log(`\t${enemy}'s HP: ${enemyHealth}`);
                console.log(`\n`);
                let { input } = await inquirer.prompt({
                    name: "input",
                    message: "What would you like to do?",
                    type: "list",
                    choices: [Options[0], Options[1], Options[2]],
                });
                switch (input) {
                    case Options[0]:
                        let damageDealt = Math.floor(Math.random() * attackDamage);
                        let damageTaken = Math.floor(Math.random() * enemyAttackDamage);
                        enemyHealth -= damageDealt;
                        health -= damageTaken;
                        console.log(`\t> You strike the ${enemy} for ${damageDealt} damage.`);
                        console.log(`\t> You recieve ${damageTaken} in retaliation!`);
                        if (health < 1) {
                            console.log(`\t> You have taken too much damage, you are too weak to go on!`);
                            break;
                        }
                        break;
                    case Options[1]:
                        if (numHealthPotions > 0) {
                            health += healthPotionsHealAmount;
                            numHealthPotions--;
                            console.log(`\t> You drink a health potion, healing yourself for ${healthPotionsHealAmount}. \n\t> You now have ${health} HP. \n\t> You have ${numHealthPotions} health potions left. \n`);
                        }
                        else {
                            console.log(`\t> You have no health potions left! Defeat enemies for a chance to get one!\n`);
                        }
                        break;
                    case Options[2]:
                        console.log(`\t You run away from the ${enemy}!`);
                        continue GAME;
                }
                if (health < 1) {
                    console.log(`You limp out of the dungeon, weak from battle.`);
                    console.log(chalk.bgCyan("#".repeat(26)));
                    console.log(chalk.bgCyan("# THANKYOU FOR PLAYING! #"));
                    console.log(chalk.bgCyan("#".repeat(26)));
                    break GAME;
                }
                console.log("~".repeat(80));
                console.log(` # ${enemy} was defeated! # `);
                console.log(` # You have ${health} HP left # \n`);
                if (Math.floor(Math.random() * 100) < healthPotionDropChance) {
                    numHealthPotions++;
                    console.log(` # The ${enemy} dropped a health potion! # `);
                    console.log(` # You now have ${numHealthPotions} health potion(s). #\n `);
                }
                let { input_ } = await inquirer.prompt({
                    name: "input_",
                    type: "list",
                    message: "What would you like to do?",
                    choices: [Options_[0], Options_[1]],
                });
                switch (input_) {
                    case Options_[0]:
                        console.log(chalk.greenBright `You continue on your adventure!`);
                        break;
                    case Options_[1]:
                        console.log(chalk.redBright `You exit the dungeon, successful from your adventures!`);
                        console.log(chalk.bgCyan("#".repeat(26)));
                        console.log(chalk.bgCyan("# THANKYOU FOR PLAYING! #"));
                        console.log(chalk.bgCyan("#".repeat(26)));
                        process.exit();
                }
            }
        }
    }
}
(async () => {
    await Animate_Banner.rainbow_title();
    let bool = true;
    while (bool) {
        await Main.main();
        let { inp } = await inquirer.prompt({
            name: "inp",
            message: chalk.bgRedBright("Do you want to continue?"),
            type: "confirm",
        });
        bool = inp;
    }
})();
