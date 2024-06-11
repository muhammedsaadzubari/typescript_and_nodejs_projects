#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";
var OOP_Introduction_Explained;
(function (OOP_Introduction_Explained) {
    const print = (...messages) => {
        console.log(...messages);
    };
    class AnimateBanner {
        static banner = "TypeScript And NodeJs Projects\n\nProject #10: Object-Oriented Promgramming\n\nDeveloped by MUHAMMED SAAD \n\n";
        static sleep(ms) {
            return new Promise((res) => setTimeout(res, ms));
        }
        static async rainbowTitle() {
            let add_rainbow_title = animation.rainbow(this.banner);
            await AnimateBanner.sleep(2000);
            add_rainbow_title.stop();
        }
    }
    OOP_Introduction_Explained.AnimateBanner = AnimateBanner;
    class Person {
        personality;
        sentence;
        constructor() {
            this.personality = "Mystery";
            this.sentence = "Mystery shrouds the truth, inviting intrigue and curiosity.";
        }
        askQuestion(answer) {
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
        getPersonality() {
            return this.personality;
        }
        getSentence() {
            return this.sentence;
        }
    }
    OOP_Introduction_Explained.Person = Person;
    class Student extends Person {
        _name;
        constructor() {
            super();
            this._name = "";
        }
        get name() {
            return this._name;
        }
        set name(value) {
            this._name = value;
        }
    }
    OOP_Introduction_Explained.Student = Student;
    class Program {
        static async program() {
            let { inputForPersonality } = await inquirer.prompt({
                name: "inputForPersonality",
                type: "list",
                message: "Select 1 if you like to talk to others and select 2 if you would rather keep to yourself",
                choices: ["1", "2"]
            });
            let myPerson = new Person();
            myPerson.askQuestion(inputForPersonality);
            print((chalk.bgYellowBright.bold)(`You are: '${myPerson.getPersonality()}'`));
            print((chalk.bgCyanBright.bold)(myPerson.getSentence()));
            let { inputForName } = await inquirer.prompt({
                name: "inputForName",
                type: "input",
                message: "What is your name?",
                validate: (inputForName) => {
                    if (inputForName.trim() !== "") {
                        return true;
                    }
                    else {
                        return "Enter valid name!";
                    }
                }
            });
            let myStudent = new Student();
            myStudent.name = inputForName;
            print((chalk.bgGreenBright.bold)(`Your name is '${myStudent.name}' and your personality type is '${myStudent.getPersonality()}'`));
            print((chalk.bgBlueBright.bold)(myStudent.getSentence()));
        }
    }
    OOP_Introduction_Explained.Program = Program;
    class Main {
        static async main() {
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
            print((chalk.bgRedBright.bold)("Exiting..."));
        }
    }
    OOP_Introduction_Explained.Main = Main;
})(OOP_Introduction_Explained || (OOP_Introduction_Explained = {}));
OOP_Introduction_Explained.Main.main();
