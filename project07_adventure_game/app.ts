#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";

class Animate_Banner {
  static #banner: string = `
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
  static #sleep(ms: number): Promise<void> {
    return new Promise<void>((res) => setTimeout(res, ms));
  }

  static async rainbow_title() {
    let add_rainbow_title = animation.rainbow(this.#banner);
    await this.#sleep(2000);
    add_rainbow_title.stop();
  }
}

class Main {
  static async main(): Promise<void> {
    // Game Variables:
    let enemies: string[] = ["Skeleton", "Zombie", "Warrior", "Assassin"];
    let maxEnemyHealth: number = 75;
    let enemyAttackDamage: number = 25;

    // Player Variables:
    let health: number = 100;
    let attackDamage: number = 50;
    let numHealthPotions: number = 3;
    let healthPotionsHealAmount: number = 30;
    let healthPotionDropChance: number = 50; //Percentage

    // Enum of Options:
    enum Options {
      "1. Attack",
      "2. Drink health potion",
      "3. Run",
    }
    enum Options_ {
      "1. Continue fighting",
      "2. Exit dungeon",
    }

    let running: boolean = true;

    console.log(chalk.yellowBright("Welcome to the Dungeon!\n\n"));

    GAME: while (running) {
      console.log("~".repeat(80));

      let enemyHealth: number = Math.floor(Math.random() * maxEnemyHealth);
      let enemy: string = enemies[Math.floor(Math.random() * enemies.length)];
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
            let damageDealt: number = Math.floor(Math.random() * attackDamage);
            let damageTaken: number = Math.floor(
              Math.random() * enemyAttackDamage
            );

            enemyHealth -= damageDealt;
            health -= damageTaken;

            console.log(
              `\t> You strike the ${enemy} for ${damageDealt} damage.`
            );
            console.log(`\t> You recieve ${damageTaken} in retaliation!`);

            if (health < 1) {
              console.log(
                `\t> You have taken too much damage, you are too weak to go on!`
              );
              break;
            }
            break;
          case Options[1]:
            if (numHealthPotions > 0) {
              health += healthPotionsHealAmount;
              numHealthPotions--;
              console.log(
                `\t> You drink a health potion, healing yourself for ${healthPotionsHealAmount}. \n\t> You now have ${health} HP. \n\t> You have ${numHealthPotions} health potions left. \n`
              );
            } else {
              console.log(
                `\t> You have no health potions left! Defeat enemies for a chance to get one!\n`
              );
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
          console.log(
            ` # You now have ${numHealthPotions} health potion(s). #\n `
          );
        }
        let { input_ } = await inquirer.prompt({
          name: "input_",
          type: "list",
          message: "What would you like to do?",
          choices: [Options_[0], Options_[1]],
        });
        switch (input_) {
          case Options_[0]:
            console.log(chalk.greenBright`You continue on your adventure!`);
            break;
          case Options_[1]:
            console.log(
              chalk.redBright`You exit the dungeon, successful from your adventures!`
            );
            console.log(chalk.bgCyan("#".repeat(26)));
            console.log(chalk.bgCyan("# THANKYOU FOR PLAYING! #"));
            console.log(chalk.bgCyan("#".repeat(26)));
            process.exit()
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