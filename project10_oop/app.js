#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";
class AnimateBanner {
    static banner = `
    Welcome to my OOP Progam! 
                        
    
        OOOOOOOOO          OOOOOOOOO     PPPPPPPPPPPPPPPPP   
      OO:::::::::OO      OO:::::::::OO   P::::::::::::::::P0
    OO:::::::::::::OO  OO:::::::::::::OO P::::::PPPPPP:::::P0
    O:::::::OOO:::::::OO:::::::OOO:::::::OPP:::::P     P:::::P
    O::::::O   O::::::OO::::::O   O::::::O  P::::P     P:::::P
    O:::::O     O:::::OO:::::O     O:::::O  P::::P     P:::::P
    O:::::O     O:::::OO:::::O     O:::::O  P::::PPPPPP:::::P 
    O:::::O     O:::::OO:::::O     O:::::O  P:::::::::::::PP  
    O:::::O     O:::::OO:::::O     O:::::O  P::::PPPPPPPPP    
    O:::::O     O:::::OO:::::O     O:::::O  P::::P            
    O:::::O     O:::::OO:::::O     O:::::O  P::::P            
    O::::::O   O::::::OO::::::O   O::::::O  P::::P            
    O:::::::OOO:::::::OO:::::::OOO:::::::OPP::::::PP          
    OO:::::::::::::OO  OO:::::::::::::OO P::::::::P          
    OO:::::::::OO      OO:::::::::OO   P::::::::P          
       OOOOOOOOO          OOOOOOOOO     PPPPPPPPPP          
      
      \n
      Developed by MUHAMMED SAAD \n\n`;
    static sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    static async rainbowTitle() {
        const addRainbowTitle = animation.rainbow(AnimateBanner.banner); // Corrected method name to 'rainbowString'
        await AnimateBanner.sleep(2000);
        addRainbowTitle.stop();
    }
}
var OOP_Introduction_Explained;
(function (OOP_Introduction_Explained) {
    class Person {
        // Declare a field to represent the personality
        personality;
        sentence;
        // Constructor
        constructor() {
            this.personality = "Mystery";
            this.sentence =
                "Mystery shrouds the truth, inviting intrigue and curiosity.";
        }
        AskQuestion(answer) {
            if (answer === 1) {
                this.personality = "Extravert";
                this.sentence = "Extroverts feel energized by socializing.";
            }
            else if (answer === 2) {
                this.personality = "Introvert";
                this.sentence = "Introverts find solace in moments of solitude.";
            }
            else {
                this.personality = "You are still a Mystery";
            }
        }
        // This method returns the value of the Personality
        GetPersonality() {
            return this.personality;
        }
        GetSentence() {
            return this.sentence;
        }
    }
    OOP_Introduction_Explained.Person = Person;
    class Program {
        static async Main(args) {
            let input1;
            input1 = await inquirer.prompt({
                name: "input1",
                type: "number",
                message: "Type 1 if you like to talk to others and type 2 if you would rather keep to yourself",
            });
            if (isNaN(input1.input1)) {
                throw new Error("Please enter an integer value!");
            }
            let MyPerson = new OOP_Introduction_Explained.Person();
            MyPerson.AskQuestion(input1.input1);
            console.log(chalk.bold(chalk.bgYellowBright(`You are: ${MyPerson.GetPersonality()}`)));
            console.log(chalk.bold(chalk.bgBlueBright(`${MyPerson.GetSentence()}`)));
            let input2;
            input2 = await inquirer.prompt({
                name: "input2",
                type: "input",
                message: "What is your name?",
            });
            let MyStudent = new OOP_Introduction_Explained.Student();
            MyStudent.Name = input2.input2;
            console.log(chalk.bgGreenBright(chalk.bold(`Your name is '${MyStudent.Name}' and your personality type is '${MyStudent.GetPersonality()}'`)));
            console.log(chalk.bold(chalk.bgCyanBright(`${MyStudent.GetSentence()}`)));
        }
    }
    OOP_Introduction_Explained.Program = Program;
    // Here we can either write or read data to this class
    class Student extends OOP_Introduction_Explained.Person {
        // private field (backing field) hold any data assigned Name property
        _name;
        constructor() {
            super();
            this._name = "";
        }
        // This is the Name Property
        // use the Get accessor to read data from the class
        get Name() {
            return this._name;
        }
        // The value property of the set accessor is automatically created by the compiler
        set Name(value) {
            this._name = value;
        }
    }
    OOP_Introduction_Explained.Student = Student;
})(OOP_Introduction_Explained || (OOP_Introduction_Explained = {}));
(async () => {
    await AnimateBanner.rainbowTitle();
    let bool = true;
    while (bool) {
        try {
            await OOP_Introduction_Explained.Program.Main();
            let { prompt } = await inquirer.prompt({
                name: "prompt",
                type: "confirm",
                message: "Do you want to continue?",
            });
            bool = prompt;
        }
        catch (error) {
            console.error(error.message);
            let { prompt } = await inquirer.prompt({
                name: "prompt",
                type: "confirm",
                message: "Do you want to continue?",
            });
            bool = prompt;
        }
    }
    console.log(chalk.bgRedBright(chalk.bold("Exiting...")));
})();
