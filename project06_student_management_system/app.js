#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import validator from "validator";
import animation from "chalk-animation";
const print = (...args) => {
    console.log(...args);
};
const table = (...args) => {
    console.table(...args);
};
var ContinueTimingOrToMoveForward;
(function (ContinueTimingOrToMoveForward) {
    ContinueTimingOrToMoveForward["I"] = "Input another timing";
    ContinueTimingOrToMoveForward["II"] = "Move forward";
})(ContinueTimingOrToMoveForward || (ContinueTimingOrToMoveForward = {}));
var StudentEnum;
(function (StudentEnum) {
    StudentEnum["I"] = "Add Student";
    StudentEnum["II"] = "View Student";
    StudentEnum["III"] = "Edit Student";
    StudentEnum["IV"] = "Delete Student";
    StudentEnum["V"] = "Enroll In Course";
    StudentEnum["VI"] = "Pay Tution Fee";
    StudentEnum["VII"] = "Add Balance";
    StudentEnum["VIII"] = "Main Menu";
})(StudentEnum || (StudentEnum = {}));
var InstructorEnum;
(function (InstructorEnum) {
    InstructorEnum["I"] = "Add Instructor";
    InstructorEnum["II"] = "View Instructor";
    InstructorEnum["III"] = "Edit Instructor";
    InstructorEnum["IV"] = "Delete Instructor";
    InstructorEnum["V"] = "Assign A Course";
    InstructorEnum["VI"] = "Main Menu";
})(InstructorEnum || (InstructorEnum = {}));
var CourseEnum;
(function (CourseEnum) {
    CourseEnum["I"] = "Add Course";
    CourseEnum["II"] = "View Course";
    CourseEnum["III"] = "Edit Course";
    CourseEnum["IV"] = "Delete Course";
    CourseEnum["V"] = "Main Menu";
})(CourseEnum || (CourseEnum = {}));
var DepartmentEnum;
(function (DepartmentEnum) {
    DepartmentEnum["I"] = "Add Department";
    DepartmentEnum["II"] = "Edit Department";
    DepartmentEnum["III"] = "View Department";
    DepartmentEnum["IV"] = "Delete Department";
    DepartmentEnum["V"] = "Add Course";
    DepartmentEnum["VI"] = "Delete Courses";
    DepartmentEnum["VII"] = "Main Menu";
})(DepartmentEnum || (DepartmentEnum = {}));
var MainEnum;
(function (MainEnum) {
    MainEnum["I"] = "Student";
    MainEnum["II"] = "Instructor";
    MainEnum["III"] = "Course";
    MainEnum["IV"] = "Department";
    MainEnum["V"] = "Exit";
})(MainEnum || (MainEnum = {}));
class AnimateBanner {
    static banner = "TypeScript And NodeJs Projects\n\nProject #06: Student Management System\n\nDeveloped by MUHAMMED SAAD \n\n";
    static sleep(ms) {
        return new Promise((res) => setTimeout(res, ms));
    }
    static async rainbowTitle() {
        let addRainbowTitle = animation.rainbow(AnimateBanner.banner);
        await AnimateBanner.sleep(1000);
        addRainbowTitle.stop();
    }
}
class Array {
    static students = [];
    static instructors = [];
    static courses = [];
    static department = [];
}
class Prompt {
    static async promptTypeInput(message, validate) {
        let { prompt } = await inquirer.prompt({
            name: "prompt",
            type: "input",
            message,
            validate
        });
        return prompt;
    }
    static async promptTypeConfirm(message) {
        let { prompt } = await inquirer.prompt({
            name: "prompt",
            type: "confirm",
            message,
        });
        return prompt;
    }
    static async promptTypeList(message, choices) {
        let { prompt } = await inquirer.prompt({
            name: "prompt",
            type: "list",
            message,
            choices,
        });
        return prompt;
    }
    static async promptTypeCheckbox(message, choices, validate) {
        let { prompt } = await inquirer.prompt({
            name: "prompt",
            type: "checkbox",
            message,
            choices,
            validate
        });
        return prompt;
    }
    static async promptOfEmail(message, error) {
        return await Prompt.promptTypeInput(message, (prompt) => {
            if (validator.isEmail(prompt)) {
                return true;
            }
            else {
                return (chalk.bold.redBright)(error);
            }
        });
    }
    static async promptOfMobileNo(message, error) {
        return await Prompt.promptTypeInput(message, (prompt) => {
            if (validator.isMobilePhone(prompt)) {
                return true;
            }
            else {
                return (chalk.bold.redBright)(error);
            }
        });
    }
    static async promptOfGender(message) {
        return await Prompt.promptTypeList(message, ["Male", "Female"]);
    }
    static async promptOfAddress(message, error) {
        return await Prompt.promptTypeInput(message, (prompt) => {
            if (prompt.trim() !== "") {
                return true;
            }
            else {
                return (chalk.bold.redBright)(error);
            }
        });
    }
    static async promptOfNumber(message, error) {
        return Number(await Prompt.promptTypeInput(message, (prompt) => {
            if (isNaN(Number(prompt))) {
                return (chalk.bold.redBright)(error);
            }
            else {
                return true;
            }
        }));
    }
    static async promptOfTiming(message, error) {
        return await Prompt.promptTypeInput(message, (prompt) => {
            if (/^(0[1-9]|1[0-2]):[0-5][0-9] [AP]M$/.test(prompt)) {
                return true;
            }
            else {
                return (chalk.bold.redBright)(error);
            }
        });
    }
    static async promptOfName(message, error) {
        return await Prompt.promptTypeInput(message, (prompt) => {
            if (prompt.trim() !== "") {
                return true;
            }
            else {
                return (chalk.bold.redBright)(error);
            }
        });
    }
    static async promptOfContinueTimingOrToMoveForward(message) {
        return await Prompt.promptTypeList(message, Object.values(ContinueTimingOrToMoveForward));
    }
    static async promptOfRollNoOrID(message, error, int) {
        let prompt = await Prompt.promptTypeInput(message, (prompt) => {
            if (new RegExp(`^\\d{${int}}$`).test(prompt)) {
                return true;
            }
            else {
                return (chalk.bold.redBright)(error);
            }
        });
        return prompt;
    }
}
class Person {
    "First Name";
    "Last Name";
    "Age";
    "Gender";
    "Phone no";
    "Email";
    constructor(firstName, lastName, age, gender, mobileNo, email) {
        this["Age"] = age;
        this["Email"] = email;
        this["Gender"] = gender;
        this["Phone no"] = mobileNo;
        this["First Name"] = firstName;
        this["Last Name"] = lastName;
    }
    IDOrRollNo(num, number) {
        return `${number}`.padStart(num, `0`);
    }
}
class Student extends Person {
    "Roll no.";
    "Enrolled Courses" = [];
    "Balance" = 0;
    "Tution Fee" = 0;
    "Status" = this["Tution Fee"] !== 0
        ? `You have to pay ${this["Tution Fee"]} rupees!`
        : `You have not any amount to pay!`;
    "Address";
    enrollCourses(courses) {
        this["Enrolled Courses"].push(...courses);
    }
    payTutionFee() {
        this["Balance"] -= this["Tution Fee"];
        this["Status"] = "Fees is paid!";
    }
    tutionFee(obj) {
        obj.forEach((element) => {
            this["Tution Fee"] += element["Tution Fee"];
        });
    }
    balance(amount) {
        this["Balance"] += amount;
    }
    constructor(firstName, lastName, age, gender, address, mobileNo, email) {
        super(firstName, lastName, age, gender, mobileNo, email);
        this["Address"] = address;
    }
    static async addStudent() {
        let firstName = await Prompt.promptOfName("Please input student's first name:", "Enter valid student's first name!");
        let lastName = await Prompt.promptOfName("Please input student's last name:", "Enter valid student's last name!");
        let age = await Prompt.promptOfNumber("Please input student's age:", "Enter valid student's age!");
        let gender = await Prompt.promptOfGender("Please input student's gender:");
        let address = await Prompt.promptOfAddress("Please input student's address:", "Enter valid student's address!");
        let mobileNo = await Prompt.promptOfMobileNo("Please input student's mobile no:", "Enter valid student's mobile no!");
        let email = await Prompt.promptOfEmail("Please input student's email:", "Enter valid student's email!");
        let student = new Student(firstName, lastName, age, gender, address, mobileNo, email);
        Array.students.push(student);
        let index = Array.students.indexOf(student);
        let rollno = Array.students[index].IDOrRollNo(5, (index + 1));
        Array.students[index]["Roll no."] = rollno;
        print((chalk.yellowBright.bold)("Student is added successfully!"));
        table(Array.students[index]);
    }
    static async editStudent() {
        if (Array.students.length > 0) {
            table(Array.students);
            let running = true;
            while (running) {
                let rollno = await Prompt.promptOfRollNoOrID('Please input the roll number of the student you wish to edit:', 'Enter a valid roll number!', 5);
                let index = Array.students.findIndex((student) => student["Roll no."] === rollno);
                if (index !== -1) {
                    Array.students[index]["First Name"] = await Prompt.promptOfName("Please input student's first name:", "Enter valid student's first name!");
                    Array.students[index]["Last Name"] = await Prompt.promptOfName("Please input student's last name:", "Enter valid student's last name!");
                    Array.students[index]["Age"] = await Prompt.promptOfNumber("Please input student's age:", "Enter valid student's age!");
                    Array.students[index]["Gender"] = await Prompt.promptOfGender("Please input student's gender:");
                    Array.students[index]["Address"] = await Prompt.promptOfAddress("Please input student's address:", "Enter valid student's address!");
                    Array.students[index]["Phone no"] = await Prompt.promptOfMobileNo("Please input student's mobile no:", "Enter valid student's mobile no!");
                    Array.students[index]["Email"] = await Prompt.promptOfEmail("Please input student's email:", "Enter valid student's email!");
                    print((chalk.yellowBright.bold)('Student is edited successfully!'));
                    table(Array.students[index]);
                    break;
                }
                else {
                    print((chalk.bold.redBright)("The Roll no. you have provide can't be found!"));
                    running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to menu?");
                }
            }
        }
        else {
            print((chalk.bold.redBright)("There is no student to edit!"));
        }
    }
    static async deleteStudent() {
        if (Array.students.length > 0) {
            table(Array.students);
            let running = true;
            while (running) {
                let rollno = await Prompt.promptOfRollNoOrID('Please input the roll number of the student you wish to delete:', 'Enter a valid roll number!', 5);
                let index = Array.students.findIndex((student) => student["Roll no."] === rollno);
                if (index !== -1) {
                    let student = Array.students.splice(index, 1);
                    for (let inx in Array.students) {
                        Array.students[index]["Roll no."] = Array.students[index].IDOrRollNo(5, parseInt(inx) + 1);
                    }
                    table(student);
                    break;
                }
                else {
                    print((chalk.bold.redBright)("The roll number you have provide can't be found!"));
                    running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to menu?");
                }
            }
        }
        else {
            print((chalk.bold.redBright)("There is no student to delete!"));
        }
    }
    static async viewStudent() {
        if (Array.students.length > 0) {
            table(Array.students);
        }
        else {
            print((chalk.bold.redBright)("There is no student to view!"));
        }
    }
    static async addStudentBalance() {
        if (Array.students.length > 0) {
            table(Array.students);
            let running = true;
            while (running) {
                let rollno = await Prompt.promptOfRollNoOrID('Please input the roll number of the student you wish to add balance:', 'Enter a valid roll number!', 5);
                let index = Array.students.findIndex((student) => student["Roll no."] === rollno);
                if (index !== -1) {
                    let balance = await Prompt.promptOfNumber("Please input amount:", "Enter valid amount!");
                    Array.students[index].balance(balance);
                    table(Array.students[index]);
                    running = await Prompt.promptTypeConfirm('Do you want to continue or navigate to the menu?');
                }
                else {
                    print((chalk.bold.redBright)("The roll number you have provide can't be found!"));
                    running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to menu?");
                }
            }
        }
        else {
            print((chalk.bold.redBright)("There is no student to add balance!"));
        }
    }
    static async payTutionFee() {
        if (Array.students.length > 0) {
            let students = Array.students.filter(students => students["Enrolled Courses"].length > 0);
            if (students.length > 0) {
                table(students);
                let running = true;
                while (running) {
                    let rollno = await Prompt.promptOfRollNoOrID('Please input the roll number of the student you wish to pay tution fee:', 'Enter a valid roll number!', 5);
                    let index = Array.students.findIndex((student) => student["Roll no."] === rollno);
                    if (index !== -1) {
                        if (Array.students[index]["Tution Fee"] <= Array.students[index].Balance) {
                            Array.students[index].payTutionFee();
                            print(chalk.red("Fees was paid successfully!"));
                            print(`Tution Fee: ${Array.students[index]["Tution Fee"]}`);
                            print(`Balance: ${Array.students[index]["Balance"]}`);
                            print(`Status: ${Array.students[index]["Status"]}`);
                        }
                        else {
                            print((chalk.bold.redBright)("You don't have enough balance to pay tution fee!"));
                        }
                        break;
                    }
                    else {
                        print((chalk.bold.redBright)(`The roll number you provide can't be found.`));
                        running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to main menu?");
                    }
                }
            }
            else {
                print((chalk.bold.redBright)("The student was not enrolled in any course yet!"));
            }
        }
        else {
            print((chalk.bold.redBright)("There are no students yet!"));
        }
    }
    static async enrollStudentInACourse() {
        if (Array.courses.length > 0) {
            if (Array.students.length > 0) {
                table(Array.students);
                let running = true;
                while (running) {
                    let rollno = await Prompt.promptOfRollNoOrID('Please input the roll number of the student you wish to enroll in course:', 'Enter a valid roll number!', 5);
                    let index = Array.students.findIndex((student) => student["Roll no."] === rollno);
                    if (index !== -1) {
                        let courseName = await Prompt.promptTypeCheckbox('Please select the course do you want to assign to the instructor:', Array.courses.map(course => course.Name), (prompt) => {
                            if (prompt.length > 0) {
                                return true;
                            }
                            else {
                                return (chalk.bold.redBright)('Please select at least one course!');
                            }
                        });
                        let courses = courseName.map(course => Array.courses.find(courseObj => courseObj.Name === course));
                        Array.students[index].tutionFee(courses);
                        Array.students[index].enrollCourses(courses);
                        for (let course of courses) {
                            Array.courses[Array.courses.indexOf(course)].addStudent(Array.students[index]);
                        }
                        table(courses);
                        print((chalk.yellowBright.bold)('Student was enrolled in the above courses successfully.'));
                        table(Array.students[index]);
                        break;
                    }
                    else {
                        print((chalk.bold.redBright)("The roll number you have provide can't be found!"));
                        running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to main menu?");
                    }
                }
            }
            else {
                print((chalk.bold.redBright)('There are no students to enroll in a course!'));
            }
        }
        else {
            print((chalk.bold.redBright)('There are no course to enroll a student!'));
        }
    }
    static async main() {
        let operation = await Prompt.promptTypeList("Which operation do you want to perform", Object.values(StudentEnum));
        switch (operation) {
            case StudentEnum.I:
                await Student.addStudent();
                break;
            case StudentEnum.II:
                await Student.viewStudent();
                break;
            case StudentEnum.III:
                await Student.editStudent();
                break;
            case StudentEnum.IV:
                await Student.deleteStudent();
                break;
            case StudentEnum.V:
                await Student.enrollStudentInACourse();
                break;
            case StudentEnum.VI:
                await Student.payTutionFee();
                break;
            case StudentEnum.VII:
                await Student.addStudentBalance();
                break;
        }
    }
}
class Instructor extends Person {
    "ID";
    "Salary";
    "Courses Assigned" = [];
    assignCourses(courses) {
        this["Courses Assigned"].push(...courses);
    }
    constructor(firstName, lastName, age, salary, gender, mobileNo, email) {
        super(firstName, lastName, age, gender, mobileNo, email);
        this["Salary"] = salary;
    }
    static async addInstructor() {
        let firstName = await Prompt.promptOfName("Please input instructor's first name:", "Enter valid instructor's first name!");
        let lastName = await Prompt.promptOfName("Please input instructor's last name:", "Enter valid instructor's last name!");
        let age = await Prompt.promptOfNumber("Please input instructor's age:", "Enter valid instructor's age!");
        let gender = await Prompt.promptOfGender("Please input instructor's gender:");
        let salary = await Prompt.promptOfNumber("Please input instructor's salary:", "Enter valid instructor's salary!");
        let mobileNo = await Prompt.promptOfMobileNo("Please input instructor's mobile no:", "Enter valid instructor's mobile no!");
        let email = await Prompt.promptOfEmail("Please input instructor's email:", "Enter valid instructor's email!");
        let instructor = new Instructor(firstName, lastName, age, salary, gender, mobileNo, email);
        Array.instructors.push(instructor);
        let index = Array.instructors.indexOf(instructor);
        let ID = Array.instructors[index].IDOrRollNo(3, (index + 1));
        Array.instructors[index]["ID"] = ID;
        print((chalk.yellowBright.bold)("Instructor is added successfully!"));
        table(Array.instructors[index]);
    }
    static async editInstructor() {
        if (Array.instructors.length > 0) {
            table(Array.instructors);
            let running = true;
            while (running) {
                let ID = await Prompt.promptOfRollNoOrID('Please input the ID of the instructor you wish to edit:', 'Enter a valid ID!', 3);
                let index = Array.instructors.findIndex((instructor) => instructor["ID"] === ID);
                if (index !== -1) {
                    Array.instructors[index]["First Name"] = await Prompt.promptOfName("Please input instructor's first name:", "Enter valid instructor's first name!");
                    Array.instructors[index]["Last Name"] = await Prompt.promptOfName("Please input instructor's last name:", "Enter valid instructor's last name!");
                    Array.instructors[index]["Age"] = await Prompt.promptOfNumber("Please input instructor's age:", "Enter valid instructor's age!");
                    Array.instructors[index]["Gender"] = await Prompt.promptOfGender("Please input instructor's gender:");
                    Array.instructors[index]["Salary"] = await Prompt.promptOfNumber("Please input instructor's salary:", "Enter valid instructor's salary!");
                    Array.instructors[index]["Phone no"] = await Prompt.promptOfMobileNo("Please input instructor's mobile no:", "Enter valid instructor's mobile no!");
                    Array.instructors[index]["Email"] = await Prompt.promptOfEmail("Please input instructor's email:", "Enter valid instructor's email!");
                    print((chalk.yellowBright.bold)('Instructor is edited successfully!'));
                    table(Array.instructors[index]);
                    break;
                }
                else {
                    print((chalk.bold.redBright)("The ID. you have provide can't be found!"));
                    running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to menu?");
                }
            }
        }
        else {
            print((chalk.bold.redBright)("There is no instructor to edit!"));
        }
    }
    static async deleteInstructor() {
        if (Array.instructors.length > 0) {
            table(Array.instructors);
            let running = true;
            while (running) {
                let ID = await Prompt.promptOfRollNoOrID('Please input the ID of the instructor you wish to delete:', 'Enter a valid ID!', 3);
                let index = Array.instructors.findIndex((instructor) => instructor["ID"] === ID);
                if (index !== -1) {
                    let instructor = Array.instructors.splice(index, 1);
                    for (let inx in Array.instructors) {
                        Array.instructors[index]["ID"] = Array.instructors[index].IDOrRollNo(3, parseInt(inx) + 1);
                    }
                    table(instructor);
                    break;
                }
                else {
                    print((chalk.bold.redBright)("The ID you have provide can't be found!"));
                    running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to menu?");
                }
            }
        }
        else {
            print((chalk.bold.redBright)("There is no instructor to delete!"));
        }
    }
    static async viewInstructor() {
        if (Array.instructors.length > 0) {
            table(Array.instructors);
        }
        else {
            print((chalk.bold.redBright)("There is no instructor to view!"));
        }
    }
    static async assignInstructorToCourse() {
        if (Array.courses.length > 0) {
            if (Array.instructors.length > 0) {
                table(Array.instructors);
                let running = true;
                while (running) {
                    let ID = await Prompt.promptOfRollNoOrID('Please input the ID. of the instructor you wish to assign a course:', 'Enter a valid ID!', 3);
                    let index = Array.instructors.findIndex((instructor) => instructor["ID"] === ID);
                    if (index !== -1) {
                        let courseName = await Prompt.promptTypeCheckbox('Please select the course do you want to assign to the instructor:', Array.courses.map(course => course.Name), (prompt) => {
                            if (prompt.length > 0) {
                                return true;
                            }
                            else {
                                return (chalk.bold.redBright)('Please select at least one course!');
                            }
                        });
                        let courses = courseName.map(course => Array.courses.find(courseObj => courseObj.Name === course));
                        Array.instructors[index].assignCourses(courses);
                        for (let course of courses) {
                            Array.courses[Array.courses.indexOf(course)].assignInstructor(Array.instructors[index]);
                        }
                        table(courses);
                        print((chalk.yellowBright.bold)('Instructor was assigned to the above courses successfully.'));
                        table(Array.instructors[index]);
                        break;
                    }
                    else {
                        print((chalk.bold.redBright)("The ID you have provide can't be found!"));
                        running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to main menu?");
                    }
                }
            }
            else {
                print((chalk.bold.redBright)('There are no Instructor to assign a course!'));
            }
        }
        else {
            print((chalk.bold.redBright)('There are no course to assign a Instructor!'));
        }
    }
    static async main() {
        let operation = await Prompt.promptTypeList("Which operation do you want to perform", Object.values(InstructorEnum));
        switch (operation) {
            case InstructorEnum.I:
                await Instructor.addInstructor();
                break;
            case InstructorEnum.II:
                await Instructor.viewInstructor();
                break;
            case InstructorEnum.III:
                await Instructor.editInstructor();
                break;
            case InstructorEnum.IV:
                await Instructor.deleteInstructor();
                break;
            case InstructorEnum.V:
                await Instructor.assignInstructorToCourse();
                break;
        }
    }
}
class Courses {
    "ID";
    "Name";
    "Enrolled Student" = [];
    "Assigned Instructor" = [];
    "Timings" = [];
    ;
    "Tution Fee";
    "Department" = "no Department";
    MakeID(num) {
        return `${num}`.padStart(2, `0`);
    }
    constructor(name, timing, tutionFee) {
        this["Name"] = name;
        this["Timings"] = timing;
        this["Tution Fee"] = tutionFee;
    }
    addStudent(student) {
        this["Enrolled Student"].push(student);
    }
    assignInstructor(instructer) {
        this["Assigned Instructor"].push(instructer);
    }
    static async addCourse() {
        let name = await Prompt.promptOfName("Please input course' name:", "Enter valid course' name!");
        let timings = [];
        Loop: while (true) {
            print(`\nTiming no:`);
            let timingFrom = await Prompt.promptOfTiming("From (hh:mm AM|PM):", "Enter valid course' timing!");
            let timingTo = await Prompt.promptOfTiming("To (hh:mm AM|PM):", "Enter valid course' timing!");
            let continueTimingOrToMoveForward = await Prompt.promptOfContinueTimingOrToMoveForward('Which operation do you want to perform:');
            timings.push(`From: ${timingFrom} To: ${timingTo}`);
            switch (continueTimingOrToMoveForward) {
                case ContinueTimingOrToMoveForward.II:
                    break Loop;
            }
        }
        let fees = await Prompt.promptOfNumber("Please input course' fee:", "Enter valid course' fee!");
        let course = new Courses(name, timings, fees);
        Array.courses.push(course);
        let index = Array.courses.indexOf(course);
        let ID = Array.courses[index].MakeID(index + 1);
        Array.courses[index]["ID"] = ID;
        print((chalk.yellowBright.bold)('Course is added successfully!'));
        table(Array.courses[index]);
    }
    static async editCourse() {
        if (Array.courses.length > 0) {
            table(Array.courses);
            let running = true;
            while (running) {
                let ID = await Prompt.promptOfRollNoOrID('Please input the ID of the course you wish to edit:', 'Enter a valid ID!', 2);
                let index = Array.courses.findIndex((course) => course["ID"] === ID);
                if (index !== -1) {
                    let name = await Prompt.promptOfName("Please input course' name:", "Enter valid course' name!");
                    let timings = [];
                    Loop: while (true) {
                        print(`\nTiming no:`);
                        let timingFrom = await Prompt.promptOfTiming("From (hh:mm AM|PM):", "Enter valid course' timing!");
                        let timingTo = await Prompt.promptOfTiming("To (hh:mm AM|PM):", "Enter valid course' timing!");
                        let continueTimingOrToMoveForward = await Prompt.promptOfContinueTimingOrToMoveForward('Which operation do you want to perform:');
                        timings.push(`From: ${timingFrom} To: ${timingTo}`);
                        switch (continueTimingOrToMoveForward) {
                            case ContinueTimingOrToMoveForward.II:
                                break Loop;
                        }
                    }
                    let fees = await Prompt.promptOfNumber("Please input course' fee:", "Enter valid course' fee!");
                    Array.courses[index]["Name"] = name;
                    Array.courses[index]["Timings"] = timings;
                    Array.courses[index]["Tution Fee"] = fees;
                    print((chalk.yellowBright.bold)('Course is edited successfully!'));
                    table(Array.courses[index]);
                    break;
                }
                else {
                    print((chalk.bold.redBright)("The ID. you have provide can't be found!"));
                    running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to menu?");
                }
            }
        }
        else {
            print((chalk.bold.redBright)("There is no course to edit!"));
        }
    }
    static async deleteCourse() {
        if (Array.courses.length > 0) {
            table(Array.courses);
            let running = true;
            while (running) {
                let ID = await Prompt.promptOfRollNoOrID('Please input the ID. of the course you wish to delete:', 'Enter a valid ID.!', 2);
                let index = Array.courses.findIndex((course) => course["ID"] === ID);
                if (index !== -1) {
                    let course = Array.courses.splice(index, 1);
                    for (let inx in Array.courses) {
                        Array.courses[index]["ID"] = Array.courses[index].MakeID(parseInt(inx) + 1);
                    }
                    table(course);
                    break;
                }
                else {
                    print((chalk.bold.redBright)("The ID you have provide can't be found!"));
                    running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to menu?");
                }
            }
        }
        else {
            print((chalk.bold.redBright)("There is no course to delete!"));
        }
    }
    static async viewCourse() {
        if (Array.courses.length > 0) {
            table(Array.courses);
        }
        else {
            print((chalk.bold.redBright)("There is no course to view!"));
        }
    }
    static async main() {
        let operation = await Prompt.promptTypeList("Which operation do you want to perform", Object.values(CourseEnum));
        switch (operation) {
            case CourseEnum.I:
                await Courses.addCourse();
                break;
            case CourseEnum.II:
                await Courses.viewCourse();
                break;
            case CourseEnum.III:
                await Courses.editCourse();
                break;
            case CourseEnum.IV:
                await Courses.deleteCourse();
                break;
        }
    }
}
class Department {
    Name;
    courses = [];
    constructor(Name) {
        this.Name = Name;
    }
    static async addCourses() {
        if (Array.courses.length > 0) {
            if (Array.department.length > 0) {
                table(Array.department);
                let departmentName = await Prompt.promptTypeList('Please select the department you wish to add a course:', Array.department.map(department => department.Name));
                let index = Array.department.findIndex((department) => department["Name"] === departmentName);
                if (index !== -1) {
                    let courseName = await Prompt.promptTypeCheckbox('Please select the course do you want to add in the department:', Array.courses.map(course => course.Name), (prompt) => {
                        if (prompt.length > 0) {
                            return true;
                        }
                        else {
                            return (chalk.bold.redBright)('Please select at least one course!');
                        }
                    });
                    let courses = courseName.map(course => Array.courses.find(courseObj => courseObj.Name === course));
                    Array.department[index].courses.push(...courses);
                    for (let course of courses) {
                        Array.courses[Array.courses.indexOf(course)].Department = (Array.department[index]);
                    }
                    table(courses);
                    print((chalk.yellowBright.bold)('This course is added in the department successfully!'));
                    table(Array.department[index]);
                }
            }
            else {
                print((chalk.bold.redBright)('There are no department to add course!'));
            }
        }
        else {
            print((chalk.bold.redBright)('There are no course to assign a Instructor!'));
        }
    }
    static async addDepartment() {
        let name = await Prompt.promptOfName("Please input department' name:", "Enter valid department' name!");
        Array.department.push(new Department(name));
        print((chalk.yellowBright.bold)('Department is added successfully!'));
        table(Array.department[Array.department.length - 1]);
    }
    static async editDepartment() {
        if (Array.department.length > 0) {
            let departmentName = await Prompt.promptTypeList('Please select the department you wish to edit:', Array.department.map(department => department.Name));
            let index = Array.department.findIndex((department) => department["Name"] === departmentName);
            Array.department[index].Name = await Prompt.promptOfName("Please input department' name:", "Enter valid department' name!");
            print((chalk.yellowBright.bold)('Department is edited successfully!'));
            table(Array.department[index]);
        }
        else {
            print((chalk.bold.redBright)("There is no department to edit!"));
        }
    }
    static async deleteDepartment() {
        if (Array.department.length > 0) {
            let departmentName = await Prompt.promptTypeList('Please select the department you wish to delete:', Array.department.map(department => department.Name));
            let index = Array.department.findIndex((department) => department["Name"] === departmentName);
            let department = Array.department.splice(index, 1);
            print((chalk.yellowBright.bold)('Department is deleted successfully!'));
            table(department);
        }
        else {
            print((chalk.bold.redBright)("There is no department to delete!"));
        }
    }
    static async deleteCourses() {
        if (Array.department.length > 0) {
            if (Array.department.map(val => val.courses.length).filter(val => val !== 0).length > 0) {
                let departmentName = await Prompt.promptTypeList("Please select the department you wish to delete that's course:", Array.department.map(department => department.Name));
                let index = Array.department.findIndex((department) => department["Name"] === departmentName);
                let courseName = await Prompt.promptTypeCheckbox('Please select the course do you want to delete in the department:', Array.department[index].courses.map(course => course.Name), (prompt) => {
                    if (prompt.length > 0) {
                        return true;
                    }
                    else {
                        return (chalk.bold.redBright)('Please select at least one course!');
                    }
                });
                let courses = courseName.map(course => Array.courses.find(courseObj => courseObj.Name === course));
                for (let course of courses) {
                    Array.courses[Array.courses.indexOf(course)].Department = 'no Department';
                    ;
                }
            }
            else {
                print((chalk.bold.redBright)("There is no course added in department to delete!"));
            }
        }
        else {
            print((chalk.bold.redBright)("There is no department to delete any course added in it!"));
        }
    }
    static async viewDepartment() {
        if (Array.department.length > 0) {
            table(Array.department);
        }
        else {
            print((chalk.bold.redBright)("There is no department to view!"));
        }
    }
    static async main() {
        let operation = await Prompt.promptTypeList("Which operation do you want to perform", Object.values(DepartmentEnum));
        switch (operation) {
            case DepartmentEnum.I:
                await Department.addDepartment();
                break;
            case DepartmentEnum.II:
                await Department.editDepartment();
                break;
            case DepartmentEnum.III:
                await Department.viewDepartment();
                break;
            case DepartmentEnum.IV:
                await Department.deleteDepartment();
                break;
            case DepartmentEnum.V:
                await Department.addCourses();
                break;
            case DepartmentEnum.VI:
                await Department.deleteCourses();
                break;
        }
    }
}
class StudentManagementSystem {
    static async main() {
        await AnimateBanner.rainbowTitle();
        while (true) {
            let operation = await Prompt.promptTypeList("Which operation do you want to perform", Object.values(MainEnum));
            switch (operation) {
                case MainEnum.I:
                    await Student.main();
                    break;
                case MainEnum.II:
                    await Instructor.main();
                    break;
                case MainEnum.III:
                    await Courses.main();
                    break;
                case MainEnum.IV:
                    await Department.main();
                    break;
                default:
                    print((chalk.bold.redBright)("Exiting..."));
                    process.exit();
            }
        }
    }
}
StudentManagementSystem.main();
