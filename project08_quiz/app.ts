#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";
import ora from "ora";

type str = string;
type int = number;

class System {
  public static print(...messages: any[]) {
    console.log(...messages);
  }
  public static async promptList(message: str, choices: str[], prefix: str): Promise<str> {
    let { input } = await inquirer.prompt({
      name: "input",
      type: "list",
      prefix,
      message,
      choices,
    });
    return input;
  }
  public static async promptConfirm(): Promise<boolean> {
    let { input } = await inquirer.prompt({
      name: "input",
      type: "confirm",
      message: "Do you want to continue?",
    });
    return input;
  }
}

interface obj {
  question: str;
  options: { a: str; b: str; c: str; d: str };
  answer: str;
}

class Animate_Banner {
  private static banner: str =
    "TypeScript And NodeJs Projects\n\nProject #08: Quiz\n\nDeveloped by MUHAMMED SAAD \n\n";
  public static sleep(ms: int): Promise<void> {
    return new Promise((res) => setTimeout(res, ms));
  }

  public static async rainbow_title(): Promise<void> {
    let add_rainbow_title = animation.rainbow(this.banner);
    await Animate_Banner.sleep(2000);
    add_rainbow_title.stop();
  }
}

class Main {
  private static simpleLevelQuestions: obj[] = [
    {
      question: "What is TypeScript primarily used for?",
      options: {
        a: "Styling web pages",
        b: "Server-side scripting",
        c: "Enhancing JavaScript with static typing",
        d: "Creating databases",
      },
      answer: "Enhancing JavaScript with static typing",
    },
    {
      question: "Which keyword is used to declare a variable in TypeScript?",
      options: {
        a: "let",
        b: "var",
        c: "const",
        d: "all of the above",
      },
      answer: "all of the above",
    },
    {
      question: "What is the extension of TypeScript files?",
      options: {
        a: ".ts",
        b: ".js",
        c: ".css",
        d: ".html",
      },
      answer: ".ts",
    },
    {
      question:
        "Which tool is commonly used to compile TypeScript code to JavaScript?",
      options: {
        a: "Node.js",
        b: "Webpack",
        c: "TypeScript Compiler (tsc)",
        d: "Babel",
      },
      answer: "TypeScript Compiler (tsc)",
    },
    {
      question: "What does 'type inference' mean in TypeScript?",
      options: {
        a: "Defining types explicitly",
        b: "Inferring types based on the context",
        c: "Automatically converting types",
        d: "Ignoring type errors",
      },
      answer: "Inferring types based on the context",
    },
    {
      question:
        "Which symbol is used to denote a type assertion in TypeScript?",
      options: {
        a: "<>",
        b: "()",
        c: "{}",
        d: "[]",
      },
      answer: "<>",
    },
    {
      question: "What is the purpose of 'interface' in TypeScript?",
      options: {
        a: "To declare a new class",
        b: "To define the structure of an object",
        c: "To create private methods",
        d: "To implement inheritance",
      },
      answer: "To define the structure of an object",
    },
    {
      question: "Which of the following is NOT a TypeScript feature?",
      options: {
        a: "Generics",
        b: "Enums",
        c: "Interfaces",
        d: "Looping",
      },
      answer: "Looping",
    },
    {
      question:
        "What is the result of adding a number and a string in TypeScript?",
      options: {
        a: "An error",
        b: "A concatenated string",
        c: "The number",
        d: "Undefined",
      },
      answer: "A concatenated string",
    },
    {
      question: "Which command is used to install TypeScript globally via npm?",
      options: {
        a: "npm install -g ts",
        b: "npm install -g typescript",
        c: "npm install typescript",
        d: "npm install ts",
      },
      answer: "npm install -g typescript",
    },
  ];
  private static moderateLevelQuestions: obj[] = [
    {
      question: "What is the purpose of 'strict' mode in TypeScript?",
      options: {
        a: "To enforce stricter syntax rules",
        b: "To disable type checking",
        c: "To allow implicit type conversions",
        d: "To remove all type annotations",
      },
      answer: "To enforce stricter syntax rules",
    },
    {
      question:
        "Which of the following is NOT a valid TypeScript primitive type?",
      options: {
        a: "string",
        b: "number",
        c: "boolean",
        d: "array",
      },
      answer: "array",
    },
    {
      question: "What does the 'readonly' keyword do in TypeScript?",
      options: {
        a: "Allows write access to a property",
        b: "Prevents changes to a property after initialization",
        c: "Defines a constant variable",
        d: "Removes a property from an object",
      },
      answer: "Prevents changes to a property after initialization",
    },
    {
      question: "What is the purpose of 'enums' in TypeScript?",
      options: {
        a: "To declare a variable with multiple types",
        b: "To create a list of constants",
        c: "To implement dynamic typing",
        d: "To define asynchronous functions",
      },
      answer: "To declare a variable with multiple types",
    },
    {
      question: "What is the 'unknown' type in TypeScript used for?",
      options: {
        a: "To declare variables with any type",
        b: "To represent values that might exist",
        c: "To denote a type that is not yet known",
        d: "To enforce strict type checking",
      },
      answer: "To denote a type that is not yet known",
    },
    {
      question: "Which operator is used for non-null assertion in TypeScript?",
      options: {
        a: "!!",
        b: "??",
        c: "!",
        d: "?",
      },
      answer: "!",
    },
    {
      question: "What is the purpose of 'abstract' classes in TypeScript?",
      options: {
        a: "To create objects directly",
        b: "To provide a blueprint for other classes to extend",
        c: "To define static methods",
        d: "To enforce encapsulation",
      },
      answer: "To provide a blueprint for other classes to extend",
    },
    {
      question: "What is the output of typeof null in TypeScript?",
      options: {
        a: "'null'",
        b: "'object'",
        c: "'undefined'",
        d: "'null' is not recognized",
      },
      answer: "'object'",
    },
    {
      question: "What does 'never' type represent in TypeScript?",
      options: {
        a: "A type for functions that never return",
        b: "A type for variables that are constantly changing",
        c: "A type for values that will never occur",
        d: "A type for optional properties",
      },
      answer: "A type for values that will never occur",
    },
    {
      question:
        "Which TypeScript feature allows you to specify multiple types for a variable?",
      options: {
        a: "Generics",
        b: "Interfaces",
        c: "Unions",
        d: "Enums",
      },
      answer: "Unions",
    },
  ];
  private static hardLevelQuestions: obj[] = [
    {
      question: "What is a 'tuple' in TypeScript?",
      options: {
        a: "A data structure that holds a single value",
        b: "An array with a fixed number of elements whose types are known",
        c: "A function that returns multiple values",
        d: "A method for asynchronous operations",
      },
      answer: "An array with a fixed number of elements whose types are known",
    },
    {
      question: "What is the purpose of 'never' type in TypeScript?",
      options: {
        a: "To declare a variable that never changes",
        b: "To represent a value that will never occur",
        c: "To create an infinite loop",
        d: "To denote a variable with unknown type",
      },
      answer: "To represent a value that will never occur",
    },
    {
      question: "What is a 'mapped type' in TypeScript?",
      options: {
        a: "A type that maps one data structure to another",
        b: "A type that iterates over each property of another type",
        c: "A type that maps values to their corresponding keys",
        d: "A type that generates new types based on existing ones",
      },
      answer: "A type that generates new types based on existing ones",
    },
    {
      question: "What is 'structural typing' in TypeScript?",
      options: {
        a: "A typing system based on structural engineering principles",
        b: "A typing system where type compatibility is based on the structure of the types",
        c: "A typing system used exclusively for user-defined structures",
        d: "A typing system that prioritizes inheritance over composition",
      },
      answer:
        "A typing system where type compatibility is based on the structure of the types",
    },
    {
      question: "What is the purpose of 'namespace' in TypeScript?",
      options: {
        a: "To define a scope for a set of related functionalities",
        b: "To specify the visibility of class members",
        c: "To create aliases for complex type names",
        d: "To enforce encapsulation",
      },
      answer: "To define a scope for a set of related functionalities",
    },
    {
      question: "What is 'declaration merging' in TypeScript?",
      options: {
        a: "Combining multiple type definitions into one",
        b: "Merging variable declarations with different types",
        c: "Declaring functions within interfaces",
        d: "Declaring variables with the same name in different scopes",
      },
      answer: "Combining multiple type definitions into one",
    },
    {
      question:
        "What is the purpose of 'never' keyword in function return type?",
      options: {
        a: "To indicate that the function will never return",
        b: "To enforce a strict return type",
        c: "To denote that the function can return null or undefined",
        d: "To ensure that the function returns a value",
      },
      answer: "To indicate that the function will never return",
    },
    {
      question: "What is the output of 'null == undefined' in TypeScript?",
      options: {
        a: "true",
        b: "false",
        c: "undefined",
        d: "null",
      },
      answer: "true",
    },
    {
      question: "What is 'TypeScript Compiler API' used for?",
      options: {
        a: "To transform TypeScript code to JavaScript",
        b: "To provide type information at runtime",
        c: "To create custom tooling for working with TypeScript",
        d: "To optimize performance of TypeScript applications",
      },
      answer: "To create custom tooling for working with TypeScript",
    },
    {
      question: "Which of the following is NOT a TypeScript access modifier?",
      options: {
        a: "public",
        b: "private",
        c: "protected",
        d: "static",
      },
      answer: "static",
    },
  ];

  private static async quiz(args: obj[]) {
    let score: int = 0;
    let line: str = `~`.repeat(70);
    for (const index in args) {
      let input = await System.promptList(args[index].question, Object.values(args[index].options), `${index + 1}.`);
      const loader = ora("Checking Answer...").start();
      await Animate_Banner.sleep(2000);
      switch (input) {
        case args[index].answer:
          System.print(`\n`);
          loader.succeed(
            chalk.greenBright("You have selected a correct answer.")
          );
          score += 5;
          System.print(
            chalk.cyanBright(
              `  Your score is increased by 5 points and now the score is ${score}.`
            )
          );
          break;
        default:
          System.print(`\n`);
          loader.fail(chalk.redBright("You have selected a wrong answer."));
          System.print(chalk.cyanBright(`The correct answer is ${args[index].answer}`));
          break;
      }
      System.print(`\n`);
      await Animate_Banner.sleep(4000);
      console.clear();
    }
    System.print((chalk.bgYellowBright.bold.black)(`\n${line}`));
    System.print((chalk.bgYellowBright.bold.black)(`Your score is ${score} points.`));
    System.print((chalk.bgYellowBright.bold.black)(`${line}\n`));
    if(score === 50){
      System.print((chalk.bgGreenBright.bold.black)(`\n${line}`));
      System.print((chalk.bgGreenBright.bold.black)(`Congratulations, you won the quiz!`));
      System.print((chalk.bgGreenBright.bold.black)(`${line}\n`));
    }else if(score >= 15){
      System.print((chalk.bgRgb(255, 165, 0).bold.black)(`\n${line}`));
      System.print((chalk.bgRgb(255, 165, 0).bold.black)(`"Your fair score reflects your dedication and understanding of the quiz content. Well done!`));
      System.print((chalk.bgRgb(255, 165, 0).bold.black)(`${line}\n`));
    }else{
      System.print((chalk.bgRedBright.bold.black)(`\n${line}`));
      System.print((chalk.bgRedBright.bold.black)(`For your effort, thank you. Though you did not win this time, your participation is appreciated.!`));
      System.print((chalk.bgRedBright.bold.black)(`${line}\n`));
    }
  }
  public static async main(): Promise<void> {
    enum Level {
      "I" = "Simple",
      "II" = "Moderate",
      "III" = "Hard",
    }
    await Animate_Banner.rainbow_title();
    let running: boolean = true;
    while (running) {
      let level = await System.promptList(
        "Please select level!",
        Object.values(Level),
        '🎚️'
      );
      await Animate_Banner.sleep(2000);
      console.clear();
      switch (level) {
        case Level["I"]:
          await Main.quiz(Main.simpleLevelQuestions);
          break;
        case Level["II"]:
          await Main.quiz(Main.moderateLevelQuestions);
          break;
        case Level["III"]:
          await Main.quiz(Main.hardLevelQuestions);
          break;
      }
      running = await System.promptConfirm();
    }
  }
}
Main.main();