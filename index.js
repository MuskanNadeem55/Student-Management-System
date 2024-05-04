#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.yellowBright.bold("\n============================================="));
console.log(chalk.yellowBright.bold("        ***Student Management System***          "));
console.log(chalk.yellowBright.bold("=============================================\n"));
const generatedRandomNumber = Math.floor(10000 + Math.random() * 90000);
const answers = await inquirer.prompt([
    {
        name: "student",
        type: "input",
        message: chalk.cyan("Enter the student's name:"),
        validate: function (value) {
            return value.trim() !== "" ? true : chalk.red("Please enter a valid name.");
        }
    },
    {
        name: "age",
        type: "input",
        message: chalk.cyan("Enter the student's age: "),
        validate: function (value) {
            return value >= 10 && value <= 30 ? true : chalk.red("Please enter a valid age: ");
        }
    }
]);
let gradeLevelChoices = [];
if (answers.age <= 15) {
    gradeLevelChoices = ["7th Grade", "8th Grade", "9th Grade"];
}
else if (answers.age >= 15 && answers.age <= 20) {
    gradeLevelChoices = ["Matriculation", "Intermediate"];
}
else {
    gradeLevelChoices = ["Undergraduate Student"];
}
const grade = await inquirer.prompt([
    {
        name: "gradeLevel",
        type: "list",
        message: chalk.cyan("Enter the student's grade level:"),
        choices: gradeLevelChoices
    }
]);
console.log("Selected grade level:", grade.gradeLevel);
function getCourseChoices(gradeLevel) {
    switch (gradeLevel) {
        case "":
        case "7th Grade":
        case "8th Grade":
        case "9th Grade":
            return ["Mathematics", "Pakitan Studies", "English", "Science", "Islamiat"];
        case "10th Grade":
        case "11th Grade":
        case "12th Grade":
            return ["Intermediate Math", "Chemistry", "Physics", "History", "Functional English"];
        case "Undergraduate Student":
            return ["Python Programming", "C++", "SQL", "Java", "React.js"];
        default:
            return ["Default Course 1", "Default Course 2", "Default Course 3"];
    }
}
const selectedCourses = await inquirer.prompt([
    {
        name: "selectedCourses",
        type: "checkbox",
        message: chalk.cyan("Select preferred courses:"),
        choices: getCourseChoices(grade.gradeLevel),
        validate: function (selectedCourses) {
            return selectedCourses.length > 0 ? true : chalk.red("Please select at least one course.");
        }
    }
]);
function getFees(courseChoices) {
    let fees = 0;
    for (const course of courseChoices) {
        switch (course) {
            case "Mathematics":
            case "Pakitan Studies":
            case "English":
            case "Science":
            case "Islamiat":
                fees += 10000;
                break;
            case "Intermediate Math":
            case "Chemistry":
            case "Physics":
            case "History":
            case "Functional English":
                fees += 15000;
                break;
            case "Python Programming":
            case "C++":
            case "SQL":
            case "Java":
            case "React.js":
                fees += 20000;
                break;
            default:
                fees += 0;
        }
    }
    return fees;
}
const totalFees = getFees(selectedCourses.selectedCourses);
console.log(chalk.yellowBright.bold("\nStudent Information:"));
console.log(chalk.white(`ID: ${generatedRandomNumber}`));
console.log(chalk.white(`Name: ${answers.student}`));
console.log(chalk.white(`Age: ${answers.age}`));
console.log(chalk.white(`Grade Level: ${chalk.green(grade.gradeLevel)}`));
console.log(chalk.white(`Selected Courses: ${selectedCourses.selectedCourses.join(", ")}`));
console.log(chalk.yellowBright.bold("\nTotal Fees for Selected Courses:"));
console.log(chalk.green(`RS ${totalFees}`));
const paymentType = await inquirer.prompt([
    {
        name: "paymentType",
        type: "list",
        message: chalk.cyan("Select the payment method:"),
        choices: ["Cash", "Bank Transfer"]
    }
]);
let amountPaid = 0;
if (paymentType.paymentType === "Cash") {
    const paymentAmount = await inquirer.prompt([
        {
            name: "amount",
            type: "input",
            message: chalk.cyan("Enter the amount paid:"),
            validate: function (value) {
                if (value >= 0) {
                    return true;
                }
                return chalk.red("Please enter a valid amount.");
            }
        }
    ]);
    amountPaid = Number(paymentAmount.amount);
}
else if (paymentType.paymentType === "Bank Transfer") {
    const bankDetails = await inquirer.prompt([
        {
            name: "accountName",
            type: "input",
            message: chalk.cyan("Enter the account name:")
        },
        {
            name: "accountNumber",
            type: "input",
            message: chalk.cyan("Enter the account number:")
        },
        {
            name: "bankName",
            type: "list",
            message: chalk.cyan("Select the bank:"),
            choices: ["MCB Bank", "HBL Bank", "UBL Bank"]
        },
        {
            name: "amount",
            type: "input",
            message: chalk.cyan("Enter the amount paid:"),
            validate: function (value) {
                if (value >= 0) {
                    return true;
                }
                return chalk.red("Please enter a valid amount.");
            }
        }
    ]);
    amountPaid = Number(bankDetails.amount);
}
;
if (amountPaid < totalFees) {
    console.log(chalk.red(`\nRemaining Amount to be Paid: RS ${totalFees - amountPaid}`));
}
else if (amountPaid === totalFees) {
    console.log(chalk.green("Payment completed. Thank you!"));
    console.log(chalk.green("You are now enrolled!"));
}
else if (amountPaid > totalFees) {
    console.log(chalk.blue(`Change due: RS ${amountPaid - totalFees}`));
    console.log(chalk.green("Payment completed. Thank you!"));
    console.log(chalk.green("You are now enrolled!"));
}
const ans = await inquirer.prompt({
    name: "information",
    type: "list",
    message: chalk.cyan("What would you like to do next?"),
    choices: ["View Status", "Exit"]
});
if (ans.information === "View Status") {
    console.log(chalk.yellow.bold("\n============================================="));
    console.log(chalk.yellow.bold("             ***Student Information***             "));
    console.log(chalk.yellow.bold("=============================================\n"));
    console.log(chalk.green(`ID: ${generatedRandomNumber}`));
    console.log(chalk.green(`Name: ${answers.student}`));
    console.log(chalk.green(`Age: ${answers.age}`));
    console.log(chalk.green(`Grade Level: ${chalk.green(grade.gradeLevel)}`));
    console.log(chalk.green(`Selected Courses: ${selectedCourses.selectedCourses.join(", ")}`));
    console.log(chalk.yellowBright.bold("\nTotal Fees for Selected Courses:"));
    console.log(chalk.green(`RS ${totalFees}`));
    console.log(chalk.green(`Amout Paid: ${amountPaid}`));
}
else if (ans.information === "Exit") {
    console.log(chalk.yellow("Thank you for using the Student Management System!"));
}
