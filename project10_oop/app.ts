#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";

namespace OOP_Introduction_Explained {
  type int = number;
  type str = string;
  const print = (...messages: any[]) => {
    console.log(...messages);
  };

  export class AnimateBanner {
    private static banner: str = "TypeScript And NodeJs Projects\n\nProject #10: Object-Oriented Promgramming\n\nDeveloped by MUHAMMED SAAD \n\n";
    public static sleep(ms: int): Promise<void> {
      return new Promise((res) => setTimeout(res, ms));
    }
    public static async rainbowTitle(): Promise<void> {
      let add_rainbow_title = animation.rainbow(this.banner);
      await AnimateBanner.sleep(2000);
      add_rainbow_title.stop();
    }
  }

  export class Person {
    private personality: str;
    private sentence: str;
    constructor() {
      this.personality = "Mystery";
      this.sentence = "Mystery shrouds the truth, inviting intrigue and curiosity.";
    }
    public askQuestion(answer: int): void {
      switch (answer) {
        case 1:
          this.personality = "Extravert";
          this.sentence = "Extroverts feel energized by socializing.";
        break;
        case 2:
          this.personality = "Introvert";
          this.sentence = "Introverts find solace in moments of solitude.";
        break;
      }
    }
    public getPersonality(): str {
      return this.personality;
    }
    public getSentence(): str {
      return this.sentence;
    }
  }

  export class Student extends Person {
    private _name: str;
    constructor() {
      super();
      this._name = "";
    }
    public get name() {
      return this._name;
    }
    public set name(value: str) {
      this._name = value;
    }
  }

  export class Program {
    public static async program(): Promise<void> {
      let { inputForPersonality } = await inquirer.prompt({
        name: "inputForPersonality",
        type: "list",
        message: "Select 1 if you like to talk to others and select 2 if you would rather keep to yourself",
        choices: ["1", "2"]
      });
      let myPerson: Person = new Person();
      myPerson.askQuestion(inputForPersonality)
      print((chalk.bgYellowBright.bold)(`You are: '${myPerson.getPersonality()}'`));
      print((chalk.bgCyanBright.bold)(myPerson.getSentence()));
      let { inputForName } = await inquirer.prompt({
        name: "inputForName",
        type: "input",
        message: "What is your name?",
        validate: (inputForName: str) => {
            if(inputForName.trim() !== ""){
                return true;
            }else{
                return "Enter valid name!";
            }
        }
      });
      let myStudent: Student = new Student();
      myStudent.name = inputForName;
      print((chalk.bgGreenBright.bold)(`Your name is '${ myStudent.name }' and your personality type is '${ myStudent.getPersonality() }'`));
      print((chalk.bgBlueBright.bold)(myStudent.getSentence()))
    }
  }

  export class Main {
    public static async main(): Promise<void> {
        await AnimateBanner.rainbowTitle();
        let running = true;
        while (running) {
            await Program.program();
            let { confirm } = await inquirer.prompt({
                name: "confirm",
                type: "confirm",
                message: "Do you want to continue?"
            });
            running = confirm;
        }
        print((chalk.bgRedBright.bold)("Exiting..."))
    }
  }
}

OOP_Introduction_Explained.Main.main();