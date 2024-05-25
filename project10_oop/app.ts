#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";

class AnimateBanner {
  private static banner: string = `
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

  private static sleep(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  static async rainbowTitle() {
    const addRainbowTitle = animation.rainbow(AnimateBanner.banner); // Corrected method name to 'rainbowString'
    await AnimateBanner.sleep(2000);
    addRainbowTitle.stop();
  }
}
namespace OOP_Introduction_Explained {
  export class Person {
    // Declare a field to represent the personality
    private personality: string;
    private sentence: string;

    // Constructor
    constructor() {
      this.personality = "Mystery";
      this.sentence =
        "Mystery shrouds the truth, inviting intrigue and curiosity.";
    }

    public AskQuestion(answer: number): void {
      if (answer === 1) {
        this.personality = "Extravert";
        this.sentence = "Extroverts feel energized by socializing.";
      } else if (answer === 2) {
        this.personality = "Introvert";
        this.sentence = "Introverts find solace in moments of solitude.";
      } else {
        this.personality = "You are still a Mystery";
      }
    }

    // This method returns the value of the Personality
    public GetPersonality(): string {
      return this.personality;
    }
    public GetSentence(): string {
      return this.sentence;
    }
  }
  export class Program {
    static async Main(args?: string[]): Promise<void> {
      let input1;
      input1 = await inquirer.prompt({
        name: "input1",
        type: "number",
        message:
          "Type 1 if you like to talk to others and type 2 if you would rather keep to yourself",
      });
      if (isNaN(input1.input1)) {
        throw new Error("Please enter an integer value!");
      }
      let MyPerson: OOP_Introduction_Explained.Person =
        new OOP_Introduction_Explained.Person();
      MyPerson.AskQuestion(input1.input1);
      console.log(
        chalk.bold(
          chalk.bgYellowBright(`You are: ${MyPerson.GetPersonality()}`)
        )
      );
      console.log(chalk.bold(chalk.bgBlueBright(`${MyPerson.GetSentence()}`)));

      let input2;
      input2 = await inquirer.prompt({
        name: "input2",
        type: "input",
        message: "What is your name?",
      });
      let MyStudent: OOP_Introduction_Explained.Student =
        new OOP_Introduction_Explained.Student();
      MyStudent.Name = input2.input2;
      console.log(
        chalk.bgGreenBright(
          chalk.bold(
            `Your name is '${
              MyStudent.Name
            }' and your personality type is '${MyStudent.GetPersonality()}'`
          )
        )
      );
      console.log(chalk.bold(chalk.bgCyanBright(`${MyStudent.GetSentence()}`)));
    }
  }
  // Here we can either write or read data to this class
  export class Student extends OOP_Introduction_Explained.Person {
    // private field (backing field) hold any data assigned Name property
    private _name: string;

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
    set Name(value: string) {
      this._name = value;
    }
  }
}
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
    } catch (error: any) {
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
