#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import animation from "chalk-animation";

class Animate_Banner {
  #banner: string = ` Get ready to manage your student data with our Student Management System! \n
                          .----------------.
                          | .------------. |
                          | |   Student  | |
                          | | Management | |
                          | |   System!  | |
                          | |____________| |
                          |____________oo__|
      ==========='            ___)___(___,o  (   .---._
         ===========         |___________| 8  \\  |TEA|_)    .+-------+.
      ===========                      o8o8    ) |___|    .' |_______| '.
        =============      __________8___    (          /  /         \\  \\
     |\\'==========='/|   .'= --------- --'.   '.       |\\ /           \\ /|
     | '-----------' |  / ooooooooooooo  oo\\   _\\_     | '-------------' |
     |______I_N______| /  oooooooooooo[] ooo\\  |=|     |_______OUT_______|
                      / O O =========  O OO  \\ '-'   .-------,
                      ''''''''''''''''''''''''       \n

    Develop by MUHAMMED SAAD \n\n`;
  #sleep(ms: number): Promise<void> {
    return new Promise<void>((res) => setTimeout(res, ms));
  }

  async rainbow_title() {
    let add_rainbow_title = animation.rainbow(this.#banner);
    await this.#sleep(2000);
    add_rainbow_title.stop();
  }
}

class Person {
  "Full Name": string = "";
  "Age": number;
  "Gender": string;
  "Phone no": string;
  "Email": string;
  constructor(
    first_name: string,
    last_name: string,
    age: number,
    gender: string,
    phone_no: string,
    email: string
  ) {
    this["Age"] = age;
    this.#full_name_in_title_case(first_name, last_name);
    this["Gender"] = gender;
    this["Phone no"] = phone_no;
    this["Email"] = email;
  }
  #full_name_in_title_case(f_name: string, l_name: string) {
    let full_name_in_array: string[] = [f_name, l_name];
    full_name_in_array.forEach((val, index) => {
      let space = index < full_name_in_array.length - 1 ? " " : "";
      this["Full Name"] +=
        val.charAt(0).toUpperCase() + val.slice(1).toLowerCase() + space;
    });
  }
}

class Student extends Person {
  static no: number = 0;
  "Roll no.": string = this.#five_digit_rollno();
  "Enrolled Courses": Courses[] = [];
  "Balance": number = 0;
  "Tution Fee": number = 0;
  "Status": string =
    this["Tution Fee"] !== 0
      ? `You have to pay ${this["Tution Fee"]} rupees!`
      : `You have not any amount to pay!`;
  "Address": string;
  #five_digit_rollno() {
    return `${++Student.no}`.padStart(5, `0`);
  }
  enroll_courses(courses: Courses[]) {
    this["Enrolled Courses"].push(...courses);
  }
  pay_tution_fee() {
    this["Balance"] -= this["Tution Fee"];
    this["Status"] = "Fees is paid!";
  }
  tution_fee(obj: Courses[]) {
    obj.forEach((element) => {
      this["Tution Fee"] += element["Tution Fee"];
    });
  }
  balance(amount: number) {
    this["Balance"] += amount;
  }
  constructor(
    f_name: string,
    l_name: string,
    age: number,
    gender: string,
    address: string,
    phone_no: string,
    email: string
  ) {
    super(f_name, l_name, age, gender, phone_no, email);
    this["Address"] = address;
  }
}

class Instructor extends Person {
  "ID": string = this.#three_digit_id();
  static no: number = 0;
  "Salary": number;
  "Courses Assigned": Courses[] = [];
  #three_digit_id() {
    return `${++Instructor.no}`.padStart(3, `0`);
  }
  assign_course(courses: Courses[]) {
    this["Courses Assigned"].push(...courses);
  }
  constructor(
    f_name: string,
    l_name: string,
    age: number,
    salary: number,
    gender: string,
    phone_no: string,
    email: string
  ) {
    super(f_name, l_name, age, gender, phone_no, email);
    this["Salary"] = salary;
  }
}

class Courses {
  static no: number = 0;
  "ID": string = this.#two_digit_id();
  "Name": string;
  "Enrolled Student": Student[] = [];
  "Assigned Instructor": Instructor[] = [];
  "Timing": string;
  "Tution Fee": number;
  #two_digit_id() {
    return `${++Courses.no}`.padStart(2, `0`);
  }
  #timing(
    from: number,
    from_am_or_pm: string,
    to: number,
    to_am_or_pm: string
  ) {
    return `From ${from}${from_am_or_pm} to ${to}${to_am_or_pm}`;
  }
  constructor(
    name: string,
    timing: [number, string, number, string],
    tution_fee: number
  ) {
    this["Name"] = name;
    (this["Timing"] = this.#timing(timing[0], timing[1], timing[2], timing[3])),
      (this["Tution Fee"] = tution_fee);
  }
  add_student(student: Student) {
    this["Enrolled Student"].push(student);
  }
  assign_instructer(instructer: Instructor) {
    this["Assigned Instructor"].push(instructer);
  }
}
class Main {
  static #students: Student[] = [];
  static #instructors: Instructor[] = [];
  static #courses: Courses[] = [];
  static async #prompt_type_input(message: string) {
    let { prompt } = await inquirer.prompt({
      name: "prompt",
      type: "input",
      message,
    });
    return prompt;
  }
  static async #prompt_type_number(message: string) {
    let { prompt } = await inquirer.prompt({
      name: "prompt",
      type: "number",
      message,
    });
    return prompt;
  }
  static async #prompt_type_confirm(message: string) {
    let { prompt } = await inquirer.prompt({
      name: "prompt",
      type: "confirm",
      message,
    });
    return prompt;
  }
  static async #prompt_type_list(message: string, choices: string[]) {
    let { prompt } = await inquirer.prompt({
      name: "prompt",
      type: "list",
      message,
      choices,
    });
    return prompt;
  }
  static async #prompt_type_checkbox(message: string, choices: string[]) {
    let { prompt } = await inquirer.prompt({
      name: "prompt",
      type: "checkbox",
      message,
      choices,
    });
    return prompt;
  }
  static async #add_student() {
    let f_name: string = await Main.#prompt_type_input("Enter First Name!");
    let l_name: string = await Main.#prompt_type_input("Enter Last Name!");
    let age: number = await Main.#prompt_type_number("Enter Age!");
    let gender: string = await Main.#prompt_type_list(
      "Enter Student's Gender!",
      ["Male", "Female"]
    );
    let address: string = await Main.#prompt_type_input(
      "Enter Residential Address!"
    );
    let phone_no = await Main.#prompt_type_input("Enter Phone no.");
    let email = await Main.#prompt_type_input("Enter email!");
    let student: Student = new Student(
      f_name,
      l_name,
      age,
      gender,
      address,
      phone_no,
      email
    );
    Main.#students.push(student);
    console.log(chalk.cyan("Student is added succesfully!"));
    console.table(student);
  }
  static async #add_instructor() {
    let f_name: string = await Main.#prompt_type_input("Enter First Name!");
    let l_name: string = await Main.#prompt_type_input("Enter Last Name!");
    let age: number = await Main.#prompt_type_number("Enter Age!");
    let gender: string = await Main.#prompt_type_list(
      "Enter Instructor's Gender!",
      ["Male", "Female"]
    );
    let phone_no = await Main.#prompt_type_input("Enter Phone no.");
    let email = await Main.#prompt_type_input("Enter email!");
    let salary: number = await Main.#prompt_type_number(
      "Enter Instructor's salary!"
    );
    let instructor: Instructor = new Instructor(
      f_name,
      l_name,
      age,
      salary,
      gender,
      phone_no,
      email
    );
    Main.#instructors.push(instructor);
    console.log(chalk.cyan("Instructor is added succesfully!"));
    console.table(instructor);
  }
  static async #add_course() {
    let name: string = await Main.#prompt_type_input("Enter Course' name!");
    console.log("Timing");
    let from: number = await Main.#prompt_type_number("From:");
    let from_am_or_pm: string = await Main.#prompt_type_list(
      "<A.M.> Or <P.M.>",
      ["a.m.", "p.m."]
    );
    let to: number = await Main.#prompt_type_number("To:");
    let to_am_or_pm: string = await Main.#prompt_type_list("<A.M.> Or <P.M.>", [
      "a.m.",
      "p.m.",
    ]);
    let fees: number = await Main.#prompt_type_number("Enter Course' Fees!");
    let course: Courses = new Courses(
      name,
      [from, from_am_or_pm, to, to_am_or_pm],
      fees
    );
    Main.#courses.push(course);
    console.log(chalk.cyan("Course is added succesfully!"));
    console.table(course);
  }
  static async #edit_student() {
    if (Main.#students.length === 0) {
      console.log(chalk.redBright("You have not any student to edit yet!"));
    } else {
      let bool = true;
      while (bool) {
        console.table(Main.#students);
        let roll_no: string = await Main.#prompt_type_input(
          "Enter Roll no. to edit!"
        );
        let index: number = Main.#students.findIndex((obj) => {
          return obj["Roll no."] === roll_no;
        });
        if (index !== -1) {
          --Student.no
          let f_name: string = await Main.#prompt_type_input(
            "Enter First Name!"
          );
          let l_name: string = await Main.#prompt_type_input(
            "Enter Last Name!"
          );
          let age: number = await Main.#prompt_type_number("Enter Age!");
          let gender: string = await Main.#prompt_type_list(
            "Enter Student's Gender!", ["Male", "Female"]
          );
          let address: string = await Main.#prompt_type_input(
            "Enter Residential Address!"
          );
          let phone_no: string = await Main.#prompt_type_input(
            "Enter Phone No.!"
          );
          let email: string = await Main.#prompt_type_input(
            "Enter Student's Email!"
          );
          let student: Student = new Student(
            f_name,
            l_name,
            age,
            gender,
            address,
            phone_no,
            email
          );
          Main.#students.splice(index, 1, student);
          console.log(chalk.green("Student is edit succesfully!"));
          console.table(student);
          bool = false;
        } else {
          console.log(
            chalk.red("The roll no. you have provide can't be found!")
          );
          bool = await Main.#prompt_type_confirm("Do you want to continue!");
        }
      }
    }
  }
  static async #edit_instructor() {
    if (Main.#instructors.length === 0) {
      console.log(chalk.redBright("You have not any instructor to edit yet!"));
    } else {
      let bool = true;
      while (bool) {
        console.table(Main.#instructors);
        let id: string = await Main.#prompt_type_input("Enter ID to edit!");
        let index = Main.#instructors.findIndex((obj) => {
          return obj["ID"] === id;
        });
        if (index !== -1) {
          --Instructor.no
          let f_name: string = await Main.#prompt_type_input(
            "Enter First Name!"
          );
          let l_name: string = await Main.#prompt_type_input(
            "Enter Last Name!"
          );
          let age: number = await Main.#prompt_type_number("Enter Age!");
          let gender: string = await Main.#prompt_type_list(
            "Enter Student's Gender!", ["Male", "Female"]
          );
          let phone_no: string = await Main.#prompt_type_input(
            "Enter Phone No.!"
          );
          let email: string = await Main.#prompt_type_input(
            "Enter Student's Email!"
          );
          let salary: number = await Main.#prompt_type_number(
            "Enter Instructor's salary!"
          );
          let instructor: Instructor = new Instructor(
            f_name,
            l_name,
            age,
            salary,
            gender,
            phone_no,
            email
          );
          Main.#instructors.splice(index, 1, instructor);
          console.log(chalk.green("Instructor is edit succesfully!"));
          console.table(instructor);
          bool = false;
        } else {
          console.log(chalk.red("The ID you have provide can't be found!"));
          bool = await Main.#prompt_type_confirm("Do you want to continue!");
        }
      }
    }
  }
  static async #edit_course() {
    if (Main.#courses.length === 0) {
      console.log(chalk.redBright("You have not any course to edit yet!"));
    } else {
      let bool = true;
      while (bool) {
        console.table(Main.#courses);
        let id: string = await Main.#prompt_type_input("Enter ID to edit!");
        let index = Main.#courses.findIndex((obj) => {
          return obj["ID"] === id;
        });
        if (index !== -1) {
          --Courses.no
          let name: string = await Main.#prompt_type_input(
            "Enter Course' name!"
          );
          console.log("Timing");
          let from: number = await Main.#prompt_type_number("From:");
          let from_am_or_pm: string = await Main.#prompt_type_list(
            "<A.M.> Or <P.M.>",
            ["a.m.", "p.m."]
          );
          let to: number = await Main.#prompt_type_number("To:");
          let to_am_or_pm: string = await Main.#prompt_type_list(
            "<A.M.> Or <P.M.>",
            ["a.m.", "p.m."]
          );
          let fees: number = await Main.#prompt_type_number(
            "Enter Course' Fees!"
          );
          let course: Courses = new Courses(
            name,
            [from, from_am_or_pm, to, to_am_or_pm],
            fees
          );
          Main.#courses.splice(index, 1, course);
          console.log(chalk.green("Course is edit succesfully!"));
          console.table(course);
          bool = false;
        } else {
          console.log(chalk.red("The ID you have provide can't be found!"));
          bool = await Main.#prompt_type_confirm("Do you want to continue!");
        }
      }
    }
  }
  static async #delete_student() {
    if (Main.#students.length === 0) {
      console.log(chalk.redBright("You have not any student to delete yet!"));
    } else {
      let bool = true;
      while (bool) {
        console.table(Main.#students);
        let roll_no: string = await Main.#prompt_type_input(
          "Enter Roll no. to delete!"
        );
        let obj = Main.#students.find((obj) => {
          return obj["Roll no."] === roll_no;
        });
        if (obj !== undefined) {
          --Student.no
          let index = Main.#students.indexOf(obj);
          Main.#students.splice(index, 1);
          console.table(obj);
          console.log(chalk.red("Student is deleted succesfully!"));
          bool = false;
        } else {
          console.log(
            chalk.red("The roll no. you have provide can't be found!")
          );
          bool = await Main.#prompt_type_confirm("Do you want to continue!");
        }
      }
    }
  }
  static async #delete_instructor() {
    if (Main.#instructors.length === 0) {
      console.log(
        chalk.redBright("You have not any instructor to delete yet!")
      );
    } else {
      let bool = true;
      while (bool) {
        console.table(Main.#instructors);
        let id: string = await Main.#prompt_type_input("Enter ID to delete!");
        let obj = Main.#instructors.find((obj) => {
          return obj["ID"] === id;
        });
        if (obj !== undefined) {
          --Instructor.no
          let index = Main.#instructors.indexOf(obj);
          Main.#instructors.splice(index, 1);
          console.log(chalk.red("Instructor is deleted succesfully!"));
          console.table(obj);
          bool = await Main.#prompt_type_confirm("Do you want to continue!");
        } else {
          console.log(chalk.red("The ID you have provide can't be found!"));
          bool = await Main.#prompt_type_confirm("Do you want to continue!");
        }
      }
    }
  }
  static async #delete_course() {
    if (Main.#courses.length === 0) {
      console.log(chalk.redBright("You have not any course to delete yet!"));
    } else {
      let bool = true;
      while (bool) {
        console.table(Main.#courses);
        let id: string = await Main.#prompt_type_input("Enter ID to delete!");
        let obj = Main.#courses.find((obj) => {
          return obj["ID"] === id;
        });
        if (obj !== undefined) {
          --Courses.no
          let index = Main.#courses.indexOf(obj);
          Main.#courses.splice(index, 1);
          console.log(chalk.red("Course is deleted succesfully!"));
          console.table(obj);
          bool = await Main.#prompt_type_confirm("Do you want to continue!");
        } else {
          console.log(chalk.red("The ID you have provide can't be found!"));
          bool = await Main.#prompt_type_confirm("Do you want to continue!");
        }
      }
    }
  }
  static async #add_student_balance() {
    if (Main.#students.length === 0) {
      console.log(
        chalk.redBright("You have not any student to add their balance yet!")
      );
    } else {
      let bool = true;
      while (bool) {
        console.table(Main.#students);
        let roll_no: string = await Main.#prompt_type_input(
          "Enter Roll no. to add balance!"
        );
        let obj = Main.#students.find((ele) => {
          return ele["Roll no."] === roll_no;
        });
        if (obj !== undefined) {
          let amount = await Main.#prompt_type_number("Enter amount!");
          obj.balance(amount);
          console.log(chalk.blue("Balance is added succesfully!"));
          console.table(obj);
          bool = await Main.#prompt_type_confirm("Do you want to continue!");
        } else {
          console.log(
          chalk.red("The roll no. you have provide can't be found!")
          );
          bool = await Main.#prompt_type_confirm("Do you want to continue!");
        }
      }
    }
  }
  static async #enroll_student_in_course() {
    if (Main.#students.length === 0) {
      console.log(
        chalk.redBright("You have not any student to enroll them in a course!")
      );
    } else {
      let bool = true;
      while (bool) {
        console.table(Main.#students);
        let roll_no: string = await Main.#prompt_type_input(
          "Enter Roll no. to enroll in course!"
        );
        let obj = Main.#students.find((obj) => {
          return obj["Roll no."] === roll_no;
        });
        if (obj !== undefined) {
          if (Main.#courses.length === 0) {
            console.log(
              chalk.redBright("You have not any course to enroll student!")
            );
          } else {
            let courses_name = await Main.#prompt_type_checkbox(
              "Select courses to enroll student in them!",
              Main.#courses.map((ele) => ele.Name)
            );
            let bool = true;
            while (bool) {
              if (courses_name.length !== 0) {
                let courses: Courses[] = courses_name.map((val: string) =>
                  Main.#courses.find((ele) => ele["Name"] === val)
                );
                obj.enroll_courses(courses);
                obj.tution_fee(courses);
                courses.forEach((element: Courses) => {
                  element.add_student(obj);
                });
                console.log(
                  chalk.yellow("Student is enrolled in course succesfully!")
                );
                console.table(courses);
                console.table(obj);
                bool = false
              } else {
                console.log(
                  "You have not selected any course to enroll the student!"
                );
                bool = await Main.#prompt_type_confirm(
                  "Do you want to continue!"
                );
              }
            }
          }
          bool = false
        } else {
          console.log(
            chalk.red("The roll no. you have provide can't be found!")
          );
          bool = await Main.#prompt_type_confirm("Do you want to continue!");
        }
      }
    }
  }
  static async #assign_instructor_to_course() {
    if (Main.#instructors.length === 0) {
      console.log(
        chalk.redBright(
          "You have not any instructor to assign a course to them!"
        )
      );
    } else {
      let bool = true;
      while (bool) {
        console.table(Main.#instructors);
        let ID: string = await Main.#prompt_type_input(
          "Enter Instructor's ID. to assign course!"
        );
        let obj = Main.#instructors.find((obj) => {
          return obj["ID"] === ID;
        });
        if (obj !== undefined) {
          if (Main.#courses.length === 0) {
            console.log(
              chalk.redBright("You have not any course to assign a instructor!")
            );
          } else {
            let courses_name = await Main.#prompt_type_checkbox(
              "Select courses to assign instructor!",
              Main.#courses.map((ele) => ele.Name)
            );
            while (bool) {
              if (courses_name.length !== 0) {
                let courses: Courses[] = courses_name.map((val: string) =>
                  Main.#courses.find((ele) => ele["Name"] === val)
                );
                obj?.assign_course(courses);
                courses.forEach((element: Courses) => {
                  obj ? element.assign_instructer(obj) : undefined;
                });
                console.table(courses);
                console.log(
                  chalk.yellow(
                    "Instructor was assigned to a course succesfully!"
                  )
                );
                console.table(obj);
                bool = false
              } else {
                console.log(
                  "You have not selected any course to enroll the student!"
                );
                bool = await Main.#prompt_type_confirm(
                  "Do you want to continue!"
                );
              }
            }
          }
          bool = false
        } else {
          console.log(
            chalk.red("The ID you have provide can't be found!")
          );
          bool = await Main.#prompt_type_confirm("Do you want to continue!");
        }
      }
    }
  }
  static async #pay_tution_fee() {
  if(Main.#students.length !== 0){
  if(Main.#students.some((obj) => { obj["Enrolled Courses"].length !== 0})){
      let bool = true;
      while (bool) {
        console.table(Main.#students);
        let rollno: string = await Main.#prompt_type_input(
          "Enter student's roll no. to pay tution fee!"
        );
        let obj = Main.#students.find((obj) => {
          return obj["Roll no."] === rollno;
        });
        if (obj !== undefined) {
          if (obj["Tution Fee"] > obj.Balance) {
            console.log((chalk.redBright)("You have unsufficent balance!"));
          } else {
            obj.pay_tution_fee();
            console.log(chalk.red("Fees was paid successfully!"));
            console.table(`Tution Fee: ${obj["Tution Fee"]}`);
            console.table(`Balance: ${obj["Balance"]}`);
            console.table(`Status: ${obj["Status"]}`);
          }
          bool = false
        } else {
          console.log(
            chalk.red("The roll no. you have provide can't be found!")
          );
          bool = await Main.#prompt_type_confirm("Do you want to continue!");
        }
      }
    }else{
      console.log(chalk.redBright("You have not assigned course to student!"));
    }
    }else{
      console.log(chalk.redBright("You have not any student yet!"));
    }
    }
  static async #add() {
    let operation = await Main.#prompt_type_list(
      "Which operation do you want to perform",
      ["Add Student", "Add Instructor", "Add Course", "Exit"]
    );
    switch (operation) {
      case "Add Student":
        await Main.#add_student();
        break;
      case "Add Instructor":
        await Main.#add_instructor();
        break;
      case "Add Course":
        await Main.#add_course();
        break;
      case "Exit":
        break;
    }
  }
  static async #view() {
    let operation = await Main.#prompt_type_list(
      "Which operation do you want to perform",
      ["View Student", "View Instructor", "View Course", "Exit"]
    );
    switch (operation) {
      case "View Student":
        console.table(Main.#students);
        break;
      case "View Instructor":
        console.table(Main.#instructors);
        break;
      case "View Course":
        console.table(Main.#courses);
        break;
      case "Exit":
        break;
    }
  }
  static async #edit() {
    let operation = await Main.#prompt_type_list(
      "Which operation do you want to perform",
      ["Edit Student", "Edit Instructor", "Edit Course", "Exit"]
    );
    switch (operation) {
      case "Edit Student":
        await Main.#edit_student();
        break;
      case "Edit Instructor":
        await Main.#edit_instructor();
        break;
      case "Edit Course":
        await Main.#edit_course();
        break;
      case "Exit":
        break;
    }
  }
  static async #delete() {
    let operation = await Main.#prompt_type_list(
      "Which operation do you want to perform",
      ["Delete Student", "Delete Instructor", "Delete Course", "Exit"]
    );
    switch (operation) {
      case "Delete Student":
        await Main.#delete_student();
        break;
      case "Delete Instructor":
        await Main.#delete_instructor();
        break;
      case "Delete Course":
        await Main.#delete_course();
        break;
      case "Exit":
        break;
    }
  }
  static async #payment_balance() {
    let operation = await Main.#prompt_type_list(
      "Which operation do you want to perform",
      ["Pay Student's tution fee", "Add student balance", "Exit"]
    );
    switch (operation) {
      case "Pay Student's tution fee":
        await Main.#pay_tution_fee();
        break;
      case "Add student balance":
        await Main.#add_student_balance();
        break;
      case "Exit":
        break;
    }
  }
  static async #enrollement_assignment() {
    let operation = await Main.#prompt_type_list(
      "Which operation do you want to perform",
      ["Enroll Student in a course", "Assign Instructor to course", "Exit"]
    );
    switch (operation) {
      case "Enroll Student in a course":
        await Main.#enroll_student_in_course();
        break;
      case "Assign Instructor to course":
        await Main.#assign_instructor_to_course();
        break;
      case "Exit":
        break;
    }
  }
  static async main() {
    let rainbow_title = new Animate_Banner();
    await rainbow_title.rainbow_title();
    let bool = true;
    while (bool) {
      let operation = await Main.#prompt_type_list(
        "Which operation do you want to perform!",
        [
          "Add",
          "Edit",
          "View",
          "Delete",
          "Enrolement & Assignment",
          "Payment & Balance",
          "Exit",
        ]
      );
      switch (operation) {
        case "Add":
          await Main.#add();
          break;
        case "Edit":
          await Main.#edit();
          break;
        case "View":
          await Main.#view();
          break;
        case "Delete":
          await Main.#delete();
          break;
        case "Enrolement & Assignment":
          await Main.#enrollement_assignment();
          break;
        case "Payment & Balance":
          await Main.#payment_balance();
          break;
        case "Exit":
          console.log(chalk.bgRed("Exiting..."));
          process.exit();
      }
      bool = await Main.#prompt_type_confirm(
        "Do you want to move on main menu again!"
      );
    }
  }
}

Main.main();