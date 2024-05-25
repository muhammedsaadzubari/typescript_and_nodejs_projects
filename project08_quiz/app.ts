#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";

class Animate_Banner {
  static #banner: string = `
  "Ready to have some fun with this quiz?"
                d8b         
                Y8P         
                            
   .d88888888  88888888888888 
  d88" 888888  888888   d88P  
  888  888888  888888  d88P   
  Y88b 888Y88b 888888 d88P    
  "Y88888 "Y8888888888888888 
       888                    
       888                    
       888                                      
  \n

  Develop by MUHAMMED SAAD \n\n`;
  static sleep(ms: number): Promise<void> {
    return new Promise<void>((res) => setTimeout(res, ms));
  }

  static async rainbow_title() {
    let add_rainbow_title = animation.rainbow(this.#banner);
    await Animate_Banner.sleep(2000);
    add_rainbow_title.stop();
  }
}
interface obj {
  question: string;
  options: string[];
  correct_answer: string;
}
class Main {
  static #question_simple: obj[] = [
    {
      question: "What is TypeScript?",
      options: [
        "a) A JavaScript library",
        "b) A programming language",
        "c) A markup language",
        "d) A database management system",
      ],
      correct_answer: "b) A programming language",
    },
    {
      question: "Which keyword is used to declare a variable in TypeScript?",
      options: ["a) var", "b) let", "c) const", "d) All of the above"],
      correct_answer: "d) All of the above",
    },
    {
      question:
        "What is the basic data type to represent whole numbers in TypeScript?",
      options: ["a) number", "b) string", "c) boolean", "d) integer"],
      correct_answer: "a) number",
    },
    {
      question: "Which symbol is used to declare a type in TypeScript?",
      options: ["a) !", "b) :", "c) #", "d) $"],
      correct_answer: "b) :",
    },
    {
      question: "How do you define a function in TypeScript?",
      options: [
        "a) function myFunction() {}",
        "b) def myFunction() {}",
        "c) let myFunction = function() {}",
        "d) Both a and c",
      ],
      correct_answer: "d) Both a and c",
    },
    {
      question: "What keyword is used to define an interface in TypeScript?",
      options: ["a) class", "b) interface", "c) type", "d) implements"],
      correct_answer: "b) interface",
    },
    {
      question: "How do you define a class in TypeScript?",
      options: [
        "a) class MyClass {}",
        "b) function MyClass() {}",
        "c) let MyClass = {}",
        "d) interface MyClass {}",
      ],
      correct_answer: "a) class MyClass {}",
    },
    {
      question: "What is the purpose of the 'extends' keyword in TypeScript?",
      options: [
        "a) To create a subclass",
        "b) To extend the length of an array",
        "c) To include external libraries",
        "d) To import modules",
      ],
      correct_answer: "a) To create a subclass",
    },
    {
      question: "Which operator is used for optional properties in TypeScript?",
      options: ["a) !", "b) ?", "c) :", "d) ."],
      correct_answer: "b) ?",
    },
    {
      question: "How can we compile a typescript code into javascript?",
      options: [
        "a) Using the TypeScript compiler (tsc)",
        "b) Manually translating each line",
        "c) Using a browser extension",
        "d) TypeScript files are directly executed by browsers",
      ],
      correct_answer: "b) A programming language",
    },
  ];
  static #question_moderate: obj[] = [
    {
      question: "What is the purpose of TypeScript?",
      options: [
        "a) To add static typing to JavaScript",
        "b) To replace JavaScript",
        "c) To enhance HTML and CSS",
        "d) To improve server-side scripting",
      ],
      correct_answer: "a) To add static typing to JavaScript",
    },
    {
      question:
        "What is the key difference between 'interface' and 'type' in TypeScript?",
      options: [
        "a) 'interface' can only be used for obj[]ects, while 'type' can be used for any data type",
        "b) 'type' can only be used for obj[]ects, while 'interface' can be used for any data type",
        "c) There is no difference; they can be used interchangeably",
        "d) 'type' allows you to create union types, while 'interface' does not",
      ],
      correct_answer:
        "a) 'interface' can only be used for obj[]ects, while 'type' can be used for any data type",
    },
    {
      question:
        "What is the basic data type to represent whole numbers in TypeScript?",
      options: [
        "a) A type that represents a single value",
        "b) A type that represents multiple possible types for a variable",
        "c) A type that represents a combination of two interfaces",
        "d) A type that represents a combination of two classes",
      ],
      correct_answer:
        "b) A type that represents multiple possible types for a variable",
    },
    {
      question: "How do you define an array in TypeScript?",
      options: [
        "a) let arr: array = [];",
        "b) let arr: Array = [];",
        "c) let arr: any[] = [];",
        "d) let arr: Array<any> = [];",
      ],
      correct_answer: "c) let arr: any[] = [];",
    },
    {
      question: "What does the 'as' keyword do in TypeScript?",
      options: [
        "a) It creates a new instance of a class",
        "b) It performs type assertion",
        "c) It defines an alias for a module",
        "d) It represents a logical 'and' operation",
      ],
      correct_answer: "b) It performs type assertion",
    },
    {
      question: "What is the purpose of the 'readonly' modifier in TypeScript?",
      options: [
        "a) To make a property immutable after initialization",
        "b) To prevent a class from being extended",
        "c) To make a property writable after initialization",
        "d) To allow only certain types to be assigned to a property",
      ],
      correct_answer: "a) To make a property immutable after initialization",
    },
    {
      question: "What is an 'index signature' in TypeScript?",
      options: [
        "a) It defines the index of an array",
        "b) It defines the structure of an obj[]ect",
        "c) It specifies the return type of a function",
        "d) It allows you to define the types of keys that an obj[]ect can have",
      ],
      correct_answer:
        "d) It allows you to define the types of keys that an obj[]ect can have",
    },
    {
      question: "What is a 'declaration merging' in TypeScript?",
      options: [
        "a) It allows you to merge multiple files into one",
        "b) It combines multiple type declarations with the same name into a single declaration",
        "c) It merges interfaces with classes",
        "d) It merges imported modules with the local namespace",
      ],
      correct_answer:
        "b) It combines multiple type declarations with the same name into a single declaration",
    },
    {
      question:
        "How do you declare an optional parameter in a function in TypeScript?",
      options: [
        "a) function myFunction(param: optional string) {}",
        "b) function myFunction(param?: string) {}",
        "c) function myFunction(param: string?) {}",
        "d) function myFunction(param: string = null) {}",
      ],
      correct_answer: "b) function myFunction(param?: string) {}",
    },
    {
      question: "What is the purpose of the 'namespace' keyword in TypeScript?",
      options: [
        "a) To define a block of code that can be reused in different parts of the program",
        "b) To declare a module with its dependencies",
        "c) To group related types, interfaces, functions, and classes",
        "d) To specify the accessibility of a variable or function",
      ],
      correct_answer:
        "c) To group related types, interfaces, functions, and classes",
    },
  ];
  static #question_advanced: obj[] = [
    {
      question: "What are generics in TypeScript and how are they used?",
      options: [
        "a) Generics are a feature that allows defining classes with both private and public members.",
        "b) Generics are a way to define static methods in TypeScript.",
        "c) Generics allow types to be parameterized by other types, enabling the creation of reusable, type-safe components.",
        "d) Generics are a mechanism to create asynchronous functions in TypeScript.",
      ],
      correct_answer:
        "c) Generics allow types to be parameterized by other types, enabling the creation of reusable, type-safe components.",
    },
    {
      question:
        "Explain the difference between ambient declarations and regular declarations in TypeScript.",
      options: [
        "a) Ambient declarations are used for internal types, while regular declarations are used for external types.",
        "b) Regular declarations are used for existing JavaScript code, while ambient declarations are used for TypeScript code.",
        "c) Regular declarations are included in the generated JavaScript code, while ambient declarations are not.",
        "d) Ambient declarations are used to declare types for existing JavaScript code or external libraries without providing their implementation, while regular declarations are used within TypeScript code.",
      ],
      correct_answer:
        "d) Ambient declarations are used to declare types for existing JavaScript code or external libraries without providing their implementation, while regular declarations are used within TypeScript code.",
    },
    {
      question:
        "How does TypeScript handle runtime type checking compared to compile-time type checking?",
      options: [
        "a) TypeScript performs runtime type checking using reflection.",
        "b) TypeScript performs both runtime and compile-time type checking with equal emphasis.",
        "c) TypeScript primarily performs type checking at compile time, ensuring type safety during development.",
        "d) TypeScript relies solely on runtime type checking and does not perform any compile-time checks.",
      ],
      correct_answer:
        "c) TypeScript primarily performs type checking at compile time, ensuring type safety during development.",
    },
    {
      question:
        "What is the purpose of mapped types in TypeScript and provide an example of usage?",
      options: [
        "a) Mapped types allow the creation of new types by transforming properties of an existing type. Example: { [P in keyof T]: T[P] | null }.",
        "b) Mapped types are used for defining complex regular expressions in TypeScript.",
        "c) Mapped types allow the creation of new types by combining two existing types using the & operator.",
        "d) Mapped types are used for creating dynamic arrays in TypeScript.",
      ],
      correct_answer:
        "a) Mapped types allow the creation of new types by transforming properties of an existing type. Example: { [P in keyof T]: T[P] | null }.",
    },
    {
      question:
        "Describe what conditional types are in TypeScript and how they can be used to create flexible type definitions.",
      options: [
        "a) Conditional types are used to perform type conversions based on runtime conditions.",
        "b) Conditional types allow the selection of types based on the evaluation of a condition, enabling flexible type definitions.",
        "c) Conditional types are used to define types that are only valid under certain conditions.",
        "d) Conditional types are a TypeScript feature that allows defining types for switch-case statements.",
      ],
      correct_answer:
        "b) Conditional types allow the selection of types based on the evaluation of a condition, enabling flexible type definitions.",
    },
    {
      question:
        "Explain the concept of type inference in TypeScript and provide an example.",
      options: [
        "a) Type inference refers to the process of automatically inferring the types of variables, functions, and expressions based on their usage. Example: let x = 10;.",
        "b) Type inference is a mechanism for dynamically changing the types of variables at runtime. Example: let x: any = 10;.",
        "c) Type inference is a way to enforce strict type declarations in TypeScript without relying on the compiler. Example: let x: number = 10;.",
        "d) Type inference is a feature that allows TypeScript to infer types from comments provided in the code. ",
      ],
      correct_answer:
        "a) Type inference refers to the process of automatically inferring the types of variables, functions, and expressions based on their usage. Example: let x = 10;.",
    },
    {
      question:
        "What is a type guard in TypeScript? Provide an example of how it can be implemented.",
      options: [
        "a) A type guard is a mechanism for restricting the types of parameters passed to a function. Example: function isString(value: any): value is string { return typeof value === 'string'; }.",
        "b) A type guard is a feature used to enforce strict typing in TypeScript classes. Example: class MyClass { constructor(private value: string) {} }.",
        "c) A type guard is a method for preventing certain types of errors in TypeScript code. Example: if (typeof value === 'string') { /* handle string value */ }.",
        "d) A type guard is a tool for ensuring that asynchronous functions return the expected types. Example: async function fetchData(): Promise<string> { /* implementation */ }.",
      ],
      correct_answer:
        "a) A type guard is a mechanism for restricting the types of parameters passed to a function. Example: function isString(value: any): value is string { return typeof value === 'string'; }.",
    },
    {
      question:
        "Describe what type erasure is in TypeScript and its implications for runtime behavior.",
      options: [
        "a) Type erasure is the process of removing type annotations from TypeScript code to improve performance. Example: let x: number = 10; is transformed to let x = 10;.",
        "b) Type erasure is a feature that allows TypeScript to handle types dynamically at runtime. Example: let x: any = 10; retains its type information during execution.",
        "c) Type erasure refers to the removal of type information during compilation, meaning TypeScript types are not available at runtime. Example: let x: number = 10; is compiled to JavaScript without any type information.",
        "d) Type erasure is the process of converting TypeScript code to a more efficient representation at runtime. Example: let x: number = 10; is transformed to a more optimized form during execution.",
      ],
      correct_answer:
        "c) Type erasure refers to the removal of type information during compilation, meaning TypeScript types are not available at runtime. Example: let x: number = 10; is compiled to JavaScript without any type information.",
    },
    {
      question:
        "What are decorator functions in TypeScript and how are they used in the context of classes?",
      options: [
        "a) Decorator functions are functions used for validating function parameters in TypeScript. Example: function validate(target: any, key: string, descriptor: PropertyDescriptor) { /* implementation */ }.",
        "b) Decorator functions are used for dynamically extending the behavior of classes, methods, properties, or parameters in TypeScript. Example: @validate class MyClass { /* implementation */ }.",
        "c) Decorator functions are a feature for optimizing class inheritance in TypeScript. Example: @sealed class MyClass { /* implementation */ }.",
        "d) Decorator functions are a tool for optimizing memory usage in TypeScript applications. Example: @memoize class MyClass { /* implementation */ }.",
      ],
      correct_answer:
        "b) Decorator functions are used for dynamically extending the behavior of classes, methods, properties, or parameters in TypeScript. Example: @validate class MyClass { /* implementation */ }.",
    },
    {
      question:
        "Explain the concept of covariance and contravariance in TypeScript with respect to function parameters and return types.",
      options: [
        "a) Covariance refers to the ability of a function to accept parameters of a narrower type, while contravariance refers to the ability to return a broader type. Example: let fn: (arg: Animal) => void = (arg: Dog) => { /* implementation */ };.",
        "b) Covariance refers to the ability of a function to accept parameters of a broader type, while contravariance refers to the ability to return a narrower type. Example: let fn: (arg: Dog) => void = (arg: Animal) => { /* implementation */ };.",
        "c) Covariance refers to the ability of a function to accept parameters of the same type, while contravariance refers to the ability to return a different type. Example: let fn: (arg: T) => void = (arg: U) => { /* implementation */ };.",
        "d) Covariance refers to the ability of a function to accept parameters of a different type, while contravariance refers to the ability to return the same type. Example: let fn: (arg: T) => void = (arg: U) => { /* implementation */ };.",
      ],
      correct_answer:
        "b) Covariance refers to the ability of a function to accept parameters of a broader type, while contravariance refers to the ability to return a narrower type. Example: let fn: (arg: Dog) => void = (arg: Animal) => { /* implementation */ };.",
    },
  ];
  static async #prompt(args: obj[]) {
    let score = 0;
    for (const obj of args) {
      let { input } = await inquirer.prompt({
        name: "input",
        type: "list",
        message: obj.question,
        choices: obj.options,
      });
      let loader = animation.radar(`.`.repeat(80));
      await Animate_Banner.sleep(1500);
      loader.stop();

      if (input === obj.correct_answer) {
        console.log(chalk.greenBright("You have selected a correct answer."));
        score += 10;
        console.log(
          `Your score is increased by 10 and now the score is ${score}.`
        );
      } else {
        console.log(chalk.redBright("You have selected a wrong answer."));
        console.log(
          chalk.cyanBright(`The correct answer is ${obj.correct_answer}`)
        );
      }
    }
    console.log(`Your score is ${score}.`);
  }
  static async main() {
    enum Level {
      "1_" = "Simple",
      "2_" = "Moderate",
      "3_" = "Hard",
    }
    await Animate_Banner.rainbow_title();
    let bool = true;
    while (bool) {
      let { level } = await inquirer.prompt({
        name: "level",
        type: "list",
        message: "Please select level!",
        choices: [Level["1_"], Level["2_"], Level["3_"]],
      });
      switch (level) {
        case Level["1_"]:
          await Main.#prompt(Main.#question_simple);
          break;
        case Level["2_"]:
          await Main.#prompt(Main.#question_moderate);
          break;
        case Level["3_"]:
          await Main.#prompt(Main.#question_advanced);
          break;
      }
      let { continueOrExit } = await inquirer.prompt({
        name: "continueOrExit",
        type: "confirm",
        message: "Do you want to continue?",
      });
      bool = continueOrExit;
    }
  }
}
Main.main();
