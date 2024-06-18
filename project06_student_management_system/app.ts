#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import validator from "validator";
import animation from "chalk-animation";

const print = (...args: any[]) =>
    {
        console.log(...args);
    }
const table = (...args: any[]) =>
{
    console.table(...args);
}

type str = string;
type int = number;
type Validate = (prompt: any) => any;

enum ContinueTimingOrToMoveForward { I = "Input another timing", II = "Move forward" }
enum StudentEnum {I = "Add Student", II = "View Student", III = "Edit Student", IV = "Delete Student", V = "Enroll In Course", VI = "Pay Tution Fee", VII = "Add Balance", VIII = "Main Menu"}
enum InstructorEnum {I = "Add Instructor", II = "View Instructor", III = "Edit Instructor", IV = "Delete Instructor", V = "Assign A Course", VI = "Main Menu"}
enum CourseEnum {I = "Add Course", II = "View Course", III = "Edit Course", IV = "Delete Course", V = "Main Menu"}
enum DepartmentEnum { I = "Add Department", II = "Edit Department", III = "View Department", IV = "Delete Department", V = "Add Course", VI = "Delete Courses", VII = "Main Menu"}
enum MainEnum {I = "Student", II = "Instructor", III = "Course", IV = "Department", V = "Exit"}

class AnimateBanner 
{
    private static banner: str = "TypeScript And NodeJs Projects\n\nProject #06: Student Management System\n\nDeveloped by MUHAMMED SAAD \n\n";
    public static sleep(ms: int): Promise<void> 
    {
    return new Promise((res) => setTimeout(res, ms));
    }
    public static async rainbowTitle(): Promise<void> 
    {
        let addRainbowTitle = animation.rainbow(AnimateBanner.banner);
        await AnimateBanner.sleep(1000);
        addRainbowTitle.stop();
    }
}   

class Array
{
    public static students: Student[] = [];
    public static instructors: Instructor[] = [];
    public static courses: Courses[] = [];
    public static department: Department[] = [];
}

class Prompt
{
    public static async promptTypeInput(message: str, validate: Validate) 
    {
        let { prompt } = await inquirer.prompt
        (
            {
                name: "prompt",
                type: "input",
                message,
                validate
            }
        );
        return prompt;
    }
    public static async promptTypeConfirm(message: str) 
    {
        let { prompt } = await inquirer.prompt
        (
            {
                name: "prompt",
                type: "confirm",
                message,
            }
        );
        return prompt;
    }
    public static async promptTypeList(message: str, choices: str[]) 
    {
        let { prompt } = await inquirer.prompt
        (
            {
                name: "prompt",
                type: "list",
                message,
                choices,
            }
        );
        return prompt;
    }
    public static async promptTypeCheckbox(message: str, choices: str[], validate: (prompt: str[]) => any) 
    {
        let { prompt } = await inquirer.prompt
        (
            {
                name: "prompt",
                type: "checkbox",
                message,
                choices,
                validate
            }
        );
        return prompt;
    }
    public static async promptOfEmail(message: str, error: str)
    {
        return await Prompt.promptTypeInput
        (
            message,
            (prompt) =>
            {
                if(validator.isEmail(prompt))
                {
                    return true;
                }
                else
                {
                    return (chalk.bold.redBright)(error);
                }
            }
        )
    }
    public static async promptOfMobileNo(message: str, error: str)
    {
        return await Prompt.promptTypeInput
        (
            message,
            (prompt) =>
            {
                if(validator.isMobilePhone(prompt))
                {
                    return true;
                }
                else
                {
                    return (chalk.bold.redBright)(error);
                }
            }
        )
    }
    public static async promptOfGender(message: str)
    {
        return await Prompt.promptTypeList
        (
            message,
            ["Male", "Female"]
        )
    }
    public static async promptOfAddress(message: str, error: str)
    {
        return await Prompt.promptTypeInput
        (
            message,
            (prompt) => 
            {
                if(prompt.trim() !== "")
                {
                    return true;
                }
                else
                {
                    return (chalk.bold.redBright)(error);
                }
            }
        )
    }
    
    public static async promptOfNumber(message: str, error: str)
    {
        return Number
        (
            await Prompt.promptTypeInput
            (
                message,
                (prompt) =>
                {
                    if(isNaN(Number(prompt)))
                    {
                        return (chalk.bold.redBright)(error);
                    }
                    else
                    {
                        return true;
                    }
                }
            )
        )
    }
    public static async promptOfTiming(message: str, error: str)
    {
        return await Prompt.promptTypeInput
        (
            message,
            (prompt) =>
            {
                if(/^(0[1-9]|1[0-2]):[0-5][0-9] [AP]M$/.test(prompt))
                {
                    return true;
                }
                else
                {
                    return (chalk.bold.redBright)(error);
                }
            }
        )
    }
    public static async promptOfName(message: str, error: str)
    {
        return  await Prompt.promptTypeInput
        (
            message,
            (prompt) =>
            {
                if(prompt.trim() !== "")
                {
                    return true;
                }
                else
                {
                    return (chalk.bold.redBright)(error);
                }
            }
        )
    }
    public static async promptOfContinueTimingOrToMoveForward(message: str)
    {
        return  await Prompt.promptTypeList
        (
            message,
            Object.values(ContinueTimingOrToMoveForward)
        )
    }
    public static async promptOfRollNoOrID(message: str, error: str, int: int)
    {
        
        let prompt = await Prompt.promptTypeInput
        (
            message,
            (prompt) => 
            {
                if(new RegExp(`^\\d{${int}}$`).test(prompt))
                {
                    return true;
                }
                else
                {
                    return (chalk.bold.redBright)(error)
                }
            }
        );
        return prompt;
    }
}

class Person
{
    public "First Name": str;
    public "Last Name": str;
    public "Age": int;
    public "Gender": str;
    public "Phone no": str;
    public "Email": str;
    constructor
    (
      firstName: str,
      lastName: str,
      age: int,
      gender: str,
      mobileNo: str,
      email: str
    ) 
    {
      this["Age"] = age;
      this["Email"] = email;
      this["Gender"] = gender;
      this["Phone no"] = mobileNo;
      this["First Name"] = firstName;
      this["Last Name"] = lastName;
    }
    public IDOrRollNo(num: int, number: int) 
    {
        return `${number}`.padStart(num, `0`);
    }
}

class Student extends Person 
{
    public "Roll no.": str;
    public "Enrolled Courses": Courses[] = [];
    public "Balance": int = 0;
    public "Tution Fee": int = 0;
    public "Status": str =
    this["Tution Fee"] !== 0
    ? `You have to pay ${this["Tution Fee"]} rupees!`
    : `You have not any amount to pay!`;
    public "Address": str;
    public enrollCourses(courses: Courses[]) 
    {
        this["Enrolled Courses"].push(...courses);
    }
    public payTutionFee() 
    {
        this["Balance"] -= this["Tution Fee"];
        this["Status"] = "Fees is paid!";
    }
    public tutionFee(obj: Courses[]) 
    {
        obj.forEach
        (
            (element) => 
                {
                    this["Tution Fee"] += element["Tution Fee"];
                }
        );
    }
    public balance(amount: int) 
    {
        this["Balance"] += amount;
    }
    constructor
    (
        firstName: str,
        lastName: str,
        age: int,
        gender: str,
        address: str,
        mobileNo: str,
        email: str
    ) 
    {
        super(firstName, lastName, age, gender, mobileNo, email);
        this["Address"] = address;
    }
    public static async addStudent()
    {
        let firstName: str = await Prompt.promptOfName("Please input student's first name:", "Enter valid student's first name!");
        let lastName: str = await Prompt.promptOfName("Please input student's last name:", "Enter valid student's last name!");
        let age: int = await Prompt.promptOfNumber("Please input student's age:", "Enter valid student's age!");
        let gender: str = await Prompt.promptOfGender("Please input student's gender:");
        let address: str = await Prompt.promptOfAddress("Please input student's address:", "Enter valid student's address!");
        let mobileNo: str = await Prompt.promptOfMobileNo("Please input student's mobile no:", "Enter valid student's mobile no!");
        let email: str = await Prompt.promptOfEmail("Please input student's email:", "Enter valid student's email!");
        let student: Student = new Student
        (
            firstName,
            lastName,
            age,
            gender,
            address,
            mobileNo,
            email
        )
        Array.students.push(student);
        let index = Array.students.indexOf(student);
        let rollno = Array.students[index].IDOrRollNo(5, (index + 1));
        Array.students[index]["Roll no."] = rollno;
        print((chalk.yellowBright.bold)("Student is added successfully!"));
        table(Array.students[index]);
    }
    public static async editStudent()
    {
        if(Array.students.length > 0)
        {
            table(Array.students)
            let running: boolean = true;
            while (running) 
            {
                let rollno: str = await Prompt.promptOfRollNoOrID
                (
                    'Please input the roll number of the student you wish to edit:',
                    'Enter a valid roll number!',
                    5
                );
                let index: int = Array.students.findIndex
                (
                    (student) => student["Roll no."] === rollno
                )
                if(index !== -1)
                {
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
                else
                {
                    print((chalk.bold.redBright)("The Roll no. you have provide can't be found!"));
                    running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to menu?")
                }
            }
        }
        else
        {
            print((chalk.bold.redBright)("There is no student to edit!"));
        }
    }
    public static async deleteStudent()
    {
        if(Array.students.length > 0)
        {
            table(Array.students);
            let running = true;
            while(running)
            {
                let rollno: str = await Prompt.promptOfRollNoOrID
                (
                    'Please input the roll number of the student you wish to delete:',
                    'Enter a valid roll number!',
                    5
                )
                let index: int = Array.students.findIndex
                (
                    (student) => student["Roll no."] === rollno
                )
                if(index !== -1)
                {
                    let student = Array.students.splice(index, 1);
                    for(let inx in Array.students)
                    {
                        Array.students[index]["Roll no."] = Array.students[index].IDOrRollNo(5, parseInt(inx) + 1);
                    }
                    table(student);
                    break;
                }
                else
                {
                    print((chalk.bold.redBright)("The roll number you have provide can't be found!"));
                    running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to menu?")
                }
            }
        }
        else
        {
            print((chalk.bold.redBright)("There is no student to delete!"));
        }
    }
    public static async viewStudent()
    {
        if(Array.students.length > 0)
        {
            table(Array.students);
        }
        else
        {
            print((chalk.bold.redBright)("There is no student to view!"));
        }
    }
    public static async addStudentBalance()
    {
        if(Array.students.length > 0)
        {
            table(Array.students);
            let running = true;
            while(running)
            {
                let rollno = await Prompt.promptOfRollNoOrID
                (
                    'Please input the roll number of the student you wish to add balance:',
                    'Enter a valid roll number!',
                    5
                )
                let index = Array.students.findIndex(
                    (student) => student["Roll no."] === rollno
                );
                if(index !== -1)
                {
                    let balance = await Prompt.promptOfNumber("Please input amount:", "Enter valid amount!");
                    Array.students[index].balance(balance);
                    table(Array.students[index]);
                    running = await Prompt.promptTypeConfirm('Do you want to continue or navigate to the menu?')
                }
                else
                {
                    print((chalk.bold.redBright)("The roll number you have provide can't be found!"));
                    running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to menu?")
                }
            }
        }
        else
        {
            print((chalk.bold.redBright)("There is no student to add balance!"));
        }
    }
    public static async payTutionFee() 
    {
        if(Array.students.length > 0)
        {
            let students = Array.students.filter(students => students["Enrolled Courses"].length > 0);
            if(students.length > 0)
            {
                table(students);
                let running = true;
                while(running)
                {
                    let rollno = await Prompt.promptOfRollNoOrID
                    (
                        'Please input the roll number of the student you wish to pay tution fee:',
                        'Enter a valid roll number!',
                        5
                    )    
                    let index = Array.students.findIndex(
                        (student) => student["Roll no."] === rollno
                    );
                    if(index !== -1)
                    {
                        if(Array.students[index]["Tution Fee"] <= Array.students[index].Balance)
                        {
                            Array.students[index].payTutionFee();
                            print(chalk.red("Fees was paid successfully!"));
                            print(`Tution Fee: ${Array.students[index]["Tution Fee"]}`);
                            print(`Balance: ${Array.students[index]["Balance"]}`);
                            print(`Status: ${Array.students[index]["Status"]}`);            
                        }
                        else
                        {
                            print((chalk.bold.redBright)("You don't have enough balance to pay tution fee!"));
                        }
                        break;
                    }
                    else
                    {
                        print((chalk.bold.redBright)(`The roll number you provide can't be found.`));
                        running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to main menu?")
                    }
                }
            }
            else
            {
                print((chalk.bold.redBright)("The student was not enrolled in any course yet!"));
            }
        }
        else
        {
            print((chalk.bold.redBright)("There are no students yet!"));
        }
    }
    public static async enrollStudentInACourse()
    {
        if(Array.courses.length > 0)
        {
            if(Array.students.length > 0)
            {
                table(Array.students);
                let running = true;
                while(running)
                {
                    let rollno = await Prompt.promptOfRollNoOrID
                    (
                        'Please input the roll number of the student you wish to enroll in course:',
                        'Enter a valid roll number!',
                        5
                    )
                    let index: int = Array.students.findIndex
                    (
                        (student) => student["Roll no."] === rollno
                    )
                    if(index !== -1)
                    {
                        let courseName: str[] = await Prompt.promptTypeCheckbox('Please select the course do you want to assign to the instructor:', Array.courses.map(course => course.Name), 
                            (prompt) => {
                                if(prompt.length > 0)
                                {
                                    return true;
                                }
                                else
                                {
                                    return (chalk.bold.redBright)('Please select at least one course!');
                                }
                            }
                        );
                        let courses: Courses[] = courseName.map
                        (
                            course => Array.courses.find(courseObj => courseObj.Name === course)
                        );
                        Array.students[index].tutionFee(courses);        
                        Array.students[index].enrollCourses(courses);
                        for(let course of courses)
                        {
                            Array.courses[Array.courses.indexOf(course)].addStudent(Array.students[index])
                        }
                        table(courses);
                        print((chalk.yellowBright.bold)('Student was enrolled in the above courses successfully.'));
                        table(Array.students[index]);
                        break;
                    }
                    else
                    {
                        print((chalk.bold.redBright)("The roll number you have provide can't be found!"));
                        running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to main menu?");
                    }
                }
            }
            else
            {
                print((chalk.bold.redBright)('There are no students to enroll in a course!'));
            }
        }
        else
        {
            print((chalk.bold.redBright)('There are no course to enroll a student!'));
        }
    }
    public static async main()
    {
        let operation = await Prompt.promptTypeList
        (
            "Which operation do you want to perform",
            Object.values(StudentEnum)
        );
        switch (operation) 
        {
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

class Instructor extends Person 
{
    public "ID": str;
    public "Salary": int;
    public "Courses Assigned": Courses[] = [];
    public assignCourses(courses: Courses[]) 
    {
        this["Courses Assigned"].push(...courses);
    }
    constructor
    (
        firstName: str,
        lastName: str,
        age: int,
        salary: int,
        gender: str,
        mobileNo: str,
        email: str
    ) 
    {
        super(firstName, lastName, age, gender, mobileNo, email);
        this["Salary"] = salary;
    }
    public static async addInstructor()
    {
        let firstName: str = await Prompt.promptOfName("Please input instructor's first name:", "Enter valid instructor's first name!");
        let lastName: str = await Prompt.promptOfName("Please input instructor's last name:", "Enter valid instructor's last name!");
        let age: int = await Prompt.promptOfNumber("Please input instructor's age:", "Enter valid instructor's age!");
        let gender: str = await Prompt.promptOfGender("Please input instructor's gender:");
        let salary: int = await Prompt.promptOfNumber("Please input instructor's salary:", "Enter valid instructor's salary!");
        let mobileNo: str = await Prompt.promptOfMobileNo("Please input instructor's mobile no:", "Enter valid instructor's mobile no!");
        let email: str = await Prompt.promptOfEmail("Please input instructor's email:", "Enter valid instructor's email!");
        let instructor: Instructor = new Instructor
        (
            firstName,
            lastName,
            age,
            salary,
            gender,
            mobileNo,
            email
        )
        Array.instructors.push(instructor);
        let index = Array.instructors.indexOf(instructor);
        let ID = Array.instructors[index].IDOrRollNo(3, (index + 1));
        Array.instructors[index]["ID"] = ID;
        print((chalk.yellowBright.bold)("Instructor is added successfully!"));
        table(Array.instructors[index]);
    }
    public static async editInstructor()
    {
        if(Array.instructors.length > 0)
        {
            
            table(Array.instructors);
            let running: boolean = true;
            while (running)
            {
                let ID = await Prompt.promptOfRollNoOrID
                (
                    'Please input the ID of the instructor you wish to edit:',
                    'Enter a valid ID!',
                    3
                )
                let index: int = Array.instructors.findIndex
                (
                    (instructor) => instructor["ID"] === ID
                );
                if(index !== -1)
                {
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
                else
                {
                    print((chalk.bold.redBright)("The ID. you have provide can't be found!"));
                    running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to menu?")
                }
            }
        }
        else
        {
            print((chalk.bold.redBright)("There is no instructor to edit!"));
        }
    }
    public static async deleteInstructor()
    {
        if(Array.instructors.length > 0)
        {
            table(Array.instructors);
            let running = true;
            while(running)
            {
                let ID = await Prompt.promptOfRollNoOrID
                (
                    'Please input the ID of the instructor you wish to delete:',
                    'Enter a valid ID!',
                    3
                );
                let index: int = Array.instructors.findIndex
                (
                    (instructor) => instructor["ID"] === ID
                )
                if(index !== -1)
                {
                    let instructor = Array.instructors.splice(index, 1);
                    for(let inx in Array.instructors)
                    {
                        Array.instructors[index]["ID"] = Array.instructors[index].IDOrRollNo(3, parseInt(inx) + 1);
                    }
                    table(instructor);
                    break;
                }
                else
                {
                    print((chalk.bold.redBright)("The ID you have provide can't be found!"));
                    running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to menu?")
                }
            }
        }
        else
        {
            print((chalk.bold.redBright)("There is no instructor to delete!"));
        }
    }
    public static async viewInstructor()
    {
        if(Array.instructors.length > 0)
            {
                table(Array.instructors);
            }
            else
            {
                print((chalk.bold.redBright)("There is no instructor to view!"));
            }
    }
    public static async assignInstructorToCourse()
    {
        if(Array.courses.length > 0)
        {
            if(Array.instructors.length > 0)
            {
                table(Array.instructors);
                let running = true;
                while(running)
                {
                    let ID = await Prompt.promptOfRollNoOrID
                    (
                        'Please input the ID. of the instructor you wish to assign a course:',
                        'Enter a valid ID!',
                        3
                    )
                    let index: int = Array.instructors.findIndex
                    (
                        (instructor) => instructor["ID"] === ID
                    )
                    if(index !== -1)
                    {
                        let courseName: str[] = await Prompt.promptTypeCheckbox('Please select the course do you want to assign to the instructor:', Array.courses.map(course => course.Name), 
                            (prompt) => {
                                if(prompt.length > 0)
                                {
                                    return true;
                                }
                                else
                                {
                                    return (chalk.bold.redBright)('Please select at least one course!');
                                }
                            }
                        );
                        let courses = courseName.map
                        (
                            course => Array.courses.find(courseObj => courseObj.Name === course)
                        ) as Courses[];
                        Array.instructors[index].assignCourses(courses);
                        for(let course of courses)
                        {
                            Array.courses[Array.courses.indexOf(course)].assignInstructor(Array.instructors[index])
                        }
                        table(courses);
                        print((chalk.yellowBright.bold)('Instructor was assigned to the above courses successfully.'));
                        table(Array.instructors[index]);
                        break;
                    }
                    else
                    {
                        print((chalk.bold.redBright)("The ID you have provide can't be found!"));
                        running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to main menu?");
                    }
                }
            }
            else
            {
                print((chalk.bold.redBright)('There are no Instructor to assign a course!'));
            }
        }
        else
        {
            print((chalk.bold.redBright)('There are no course to assign a Instructor!'));
        }
    }
    public static async main()
    {
        let operation = await Prompt.promptTypeList
        (
            "Which operation do you want to perform",
            Object.values(InstructorEnum)
        );
        switch (operation) 
        {
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

class Courses 
{
    public "ID": str;
    public "Name": str;
    public "Enrolled Student": Student[] = [];
    public "Assigned Instructor": Instructor[] = [];
    public "Timings": str[] = [];;
    public "Tution Fee": int;
    public "Department": Department | string = "no Department";
    public MakeID(num: int) 
    {
        return `${num}`.padStart(2, `0`);
    }
    constructor
    (
        name: str,
        timing: str[],
        tutionFee: int
    ) 
    {
        this["Name"] = name;
        this["Timings"] = timing;
        this["Tution Fee"] = tutionFee;
    }
    public addStudent(student: Student) {
        this["Enrolled Student"].push(student);
    }
    public assignInstructor(instructer: Instructor) {
        this["Assigned Instructor"].push(instructer);
    }
    public static async addCourse()
    {
        let name: str = await Prompt.promptOfName("Please input course' name:", "Enter valid course' name!");
        let timings: string[] = [];
        Loop:   while (true) 
                {
                    print(`\nTiming no:`)
                    let timingFrom: str = await Prompt.promptOfTiming("From (hh:mm AM|PM):", "Enter valid course' timing!");
                    let timingTo: str = await Prompt.promptOfTiming("To (hh:mm AM|PM):", "Enter valid course' timing!");
                    let continueTimingOrToMoveForward: str = await Prompt.promptOfContinueTimingOrToMoveForward('Which operation do you want to perform:')
                    timings.push(`From: ${timingFrom} To: ${timingTo}`);
                    switch (continueTimingOrToMoveForward) 
                    {
                        case ContinueTimingOrToMoveForward.II:
                        break Loop;
                    }
                }
        let fees: int = await Prompt.promptOfNumber("Please input course' fee:", "Enter valid course' fee!");
        let course: Courses = new Courses
        (
            name,
            timings,
            fees
        )
        Array.courses.push(course);
        let index = Array.courses.indexOf(course);
        let ID = Array.courses[index].MakeID(index + 1);
        Array.courses[index]["ID"] = ID;
        print((chalk.yellowBright.bold)('Course is added successfully!'));
        table(Array.courses[index]);
    }
    public static async editCourse()
    {
        if(Array.courses.length > 0)
        {
            table(Array.courses);
            let running: boolean = true;
            while (running)
            {
                let ID = await Prompt.promptOfRollNoOrID
                (
                    'Please input the ID of the course you wish to edit:',
                    'Enter a valid ID!',
                    2
                )
                let index: int = Array.courses.findIndex
                (
                    (course) => course["ID"] === ID
                );
                if(index !== -1)
                {
                    let name: str = await Prompt.promptOfName("Please input course' name:", "Enter valid course' name!");
                    let timings: string[] = [];
                    Loop:   while (true) 
                            {
                                print(`\nTiming no:`)
                                let timingFrom: str = await Prompt.promptOfTiming("From (hh:mm AM|PM):", "Enter valid course' timing!");
                                let timingTo: str = await Prompt.promptOfTiming("To (hh:mm AM|PM):", "Enter valid course' timing!");
                                let continueTimingOrToMoveForward: str = await Prompt.promptOfContinueTimingOrToMoveForward('Which operation do you want to perform:')
                                timings.push(`From: ${timingFrom} To: ${timingTo}`);
                                switch (continueTimingOrToMoveForward) 
                                {
                                    case ContinueTimingOrToMoveForward.II:
                                    break Loop;
                                }
                            }
                    let fees: int = await Prompt.promptOfNumber("Please input course' fee:", "Enter valid course' fee!");
                    Array.courses[index]["Name"] = name;
                    Array.courses[index]["Timings"] = timings;
                    Array.courses[index]["Tution Fee"] = fees;
                    print((chalk.yellowBright.bold)('Course is edited successfully!'));
                    table(Array.courses[index]);
                    break;
                }
                else
                {
                    print((chalk.bold.redBright)("The ID. you have provide can't be found!"));
                    running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to menu?")
                }
            }
        }
        else
        {
            print((chalk.bold.redBright)("There is no course to edit!"));
        }
    }
    public static async deleteCourse()
    {
        if(Array.courses.length > 0)
        {
            table(Array.courses);
            let running = true;
            while(running)
            {
                let ID = await Prompt.promptOfRollNoOrID
                (
                    'Please input the ID. of the course you wish to delete:',
                    'Enter a valid ID.!',
                    2
                )
                let index: int = Array.courses.findIndex
                (
                    (course) => course["ID"] === ID
                )
                if(index !== -1)
                {
                    let course = Array.courses.splice(index, 1);
                    for(let inx in Array.courses)
                    {
                        Array.courses[index]["ID"] = Array.courses[index].MakeID(parseInt(inx) + 1);
                    }
                    table(course);
                    break;
                }
                else
                {
                    print((chalk.bold.redBright)("The ID you have provide can't be found!"));
                    running = await Prompt.promptTypeConfirm("Do you want to continue or navigate to menu?")
                }
            }
        }
        else
        {
            print((chalk.bold.redBright)("There is no course to delete!"));
        }
    }
    public static async viewCourse()
    {
        if(Array.courses.length > 0)
        {
            table(Array.courses);
        }
        else
        {
            print((chalk.bold.redBright)("There is no course to view!"));
        }
    }
    public static async main()
    {
        let operation = await Prompt.promptTypeList
        (
            "Which operation do you want to perform",
            Object.values(CourseEnum)
        );
        switch (operation) 
        {
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

class Department
{
    public courses: Courses[] = [];
    constructor(public Name: str){}
    public static async addCourses()
    {
        if(Array.courses.length > 0)
        {
            if(Array.department.length > 0)
            {
                table(Array.department);
                let departmentName = await Prompt.promptTypeList
                (
                    'Please select the department you wish to add a course:',
                    Array.department.map(department => department.Name)
                )
                let index: int = Array.department.findIndex
                (
                    (department) => department["Name"] === departmentName
                )
                if(index !== -1)
                {
                    let courseName: str[] = await Prompt.promptTypeCheckbox('Please select the course do you want to add in the department:', Array.courses.map(course => course.Name), 
                        (prompt) => {
                            if(prompt.length > 0)
                            {
                                return true;
                            }
                            else
                            {
                                return (chalk.bold.redBright)('Please select at least one course!');
                            }
                        }
                    );
                    let courses = courseName.map
                    (
                        course => Array.courses.find(courseObj => courseObj.Name === course)
                    );
                    Array.department[index].courses.push(...courses);
                    for(let course of courses)
                    {
                        Array.courses[Array.courses.indexOf(course)].Department = (Array.department[index])
                    }
                    table(courses);
                    print((chalk.yellowBright.bold)('This course is added in the department successfully!'));
                    table(Array.department[index]);
                }
            }
            else
            {
                print((chalk.bold.redBright)('There are no department to add course!'));
            }
        }
        else
        {
            print((chalk.bold.redBright)('There are no course to assign a Instructor!'));
        }    
    }
    public static async addDepartment()
    {
        let name: str = await Prompt.promptOfName("Please input department' name:", "Enter valid department' name!");
        Array.department.push(new Department(name));
        print((chalk.yellowBright.bold)('Department is added successfully!'));
        table(Array.department[Array.department.length - 1]);
    }
    public static async editDepartment()
    {
        if(Array.department.length > 0)
        {
            let departmentName: str = await Prompt.promptTypeList
            (
                'Please select the department you wish to edit:',
                Array.department.map(department => department.Name)
            )
            let index = Array.department.findIndex
            (
                (department) => department["Name"] === departmentName
            )
            Array.department[index].Name = await Prompt.promptOfName("Please input department' name:", "Enter valid department' name!");
            print((chalk.yellowBright.bold)('Department is edited successfully!'));
            table(Array.department[index]);
        }
        else
        {
            print((chalk.bold.redBright)("There is no department to edit!"));
        }
    }
    public static async deleteDepartment()
    {
        if(Array.department.length > 0)
        {
            let departmentName: str = await Prompt.promptTypeList
            (
                'Please select the department you wish to delete:',
                Array.department.map(department => department.Name)
            )
            let index = Array.department.findIndex
            (
                (department) => department["Name"] === departmentName
            )
            let department = Array.department.splice(index, 1);
            print((chalk.yellowBright.bold)('Department is deleted successfully!'));
            table(department);
        }
        else
        {
            print((chalk.bold.redBright)("There is no department to delete!"));
        }
    }
    public static async deleteCourses()
    {
        if(Array.department.length > 0)
        {
            if(Array.department.map(val => val.courses.length).filter(val => val !== 0).length > 0)
            {
                let departmentName: str = await Prompt.promptTypeList
                (
                    "Please select the department you wish to delete that's course:",
                    Array.department.map(department => department.Name)
                )
                let index = Array.department.findIndex
                (
                    (department) => department["Name"] === departmentName
                )
                let courseName: str[] = await Prompt.promptTypeCheckbox('Please select the course do you want to delete in the department:', Array.department[index].courses.map(course => course.Name), 
                    (prompt) => {
                        if(prompt.length > 0)
                        {
                            return true;
                        }
                        else
                        {
                            return (chalk.bold.redBright)('Please select at least one course!');
                        }
                    }
                );
                let courses = courseName.map
                (
                    course => Array.courses.find(courseObj => courseObj.Name === course)
                );
                for(let course of courses)
                {
                    Array.courses[Array.courses.indexOf(course)].Department = 'no Department';;
                }
            }
            else
            {
                print((chalk.bold.redBright)("There is no course added in department to delete!"));
            }
        }
        else
        {
            print((chalk.bold.redBright)("There is no department to delete any course added in it!"));
        }
    }
    public static async viewDepartment()
    {
        if(Array.department.length > 0)
        {
            table(Array.department);
        }
        else
        {
            print((chalk.bold.redBright)("There is no department to view!"));
        }
    }
    public static async main()
    {
        let operation = await Prompt.promptTypeList
        (
            "Which operation do you want to perform",
            Object.values(DepartmentEnum)
        );
        switch (operation) 
        {
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

class StudentManagementSystem
{
    public static async main()
    {
        await AnimateBanner.rainbowTitle();
        while(true)
        {
            let operation = await Prompt.promptTypeList
            (
                "Which operation do you want to perform",
                Object.values(MainEnum)
            );
            switch (operation) 
            {
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