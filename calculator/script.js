// Get calculator display elements
const previousOperandElement = document.getElementById("previousOperand");
const currentOperandElement = document.getElementById("currentOperand");

// Calculator variables
let currentOperand = "0";
let previousOperand = "";
let operation = null;
let shouldResetScreen = false;


// Update calculator display
function updateDisplay() {
    currentOperandElement.textContent = currentOperand;

    if (operation && previousOperand) {
        previousOperandElement.textContent =
            `${previousOperand} ${operation}`;
    } else {
        previousOperandElement.textContent = "";
    }
}


// Add numbers to display
function appendNumber(number) {

    // Start a new number after an operation
    if (shouldResetScreen) {

        if (number === ".") {
            currentOperand = "0.";
        } else {
            currentOperand = number;
        }

        shouldResetScreen = false;

        updateDisplay();

        return;
    }


    // Prevent multiple decimal points
    if (number === "." && currentOperand.includes(".")) {
        return;
    }


    // Replace starting zero
    if (currentOperand === "0" && number !== ".") {
        currentOperand = number;
    } else {
        currentOperand += number;
    }


    updateDisplay();
}


// Choose an operator
function chooseOperation(selectedOperation) {

    // Calculate previous operation first
    if (operation && !shouldResetScreen) {
        calculate();
    }


    previousOperand = currentOperand;

    operation = selectedOperation;

    shouldResetScreen = true;

    updateDisplay();
}


// Perform calculation
function calculate() {

    // Stop if calculation is incomplete
    if (!operation || !previousOperand || shouldResetScreen) {
        return;
    }


    const previous = parseFloat(previousOperand);

    const current = parseFloat(currentOperand);


    if (Number.isNaN(previous) || Number.isNaN(current)) {
        return;
    }


    let result;


    // Check selected operation
    switch (operation) {

        case "+":
            result = previous + current;
            break;


        case "-":
            result = previous - current;
            break;


        case "×":
            result = previous * current;
            break;


        case "÷":

            // Prevent division by zero
            if (current === 0) {

                currentOperand = "Cannot divide by 0";

                previousOperand = "";

                operation = null;

                shouldResetScreen = true;

                updateDisplay();

                return;
            }

            result = previous / current;

            break;


        default:
            return;
    }


    // Display result
    currentOperand = formatResult(result);

    previousOperand = "";

    operation = null;

    shouldResetScreen = true;

    updateDisplay();
}


// Format long decimal results
function formatResult(number) {

    if (!Number.isFinite(number)) {
        return "Error";
    }

    return parseFloat(number.toFixed(10)).toString();
}


// Clear calculator
function clearCalculator() {

    currentOperand = "0";

    previousOperand = "";

    operation = null;

    shouldResetScreen = false;

    updateDisplay();
}


// Delete last number
function deleteNumber() {

    if (shouldResetScreen) {
        return;
    }


    if (
        currentOperand.length <= 1 ||
        currentOperand === "0"
    ) {

        currentOperand = "0";

    } else {

        currentOperand =
            currentOperand.slice(0, -1);
    }


    updateDisplay();
}


// NUMBER BUTTONS

document.querySelectorAll("[data-number]").forEach((button) => {

    button.addEventListener("click", () => {

        appendNumber(button.dataset.number);

    });

});


// OPERATOR BUTTONS

document.querySelectorAll("[data-operator]").forEach((button) => {

    button.addEventListener("click", () => {

        chooseOperation(button.dataset.operator);

    });

});


// EQUAL BUTTON

document
    .querySelector('[data-action="equals"]')
    .addEventListener("click", calculate);


// CLEAR BUTTON

document
    .querySelector('[data-action="clear"]')
    .addEventListener("click", clearCalculator);


// DELETE BUTTON

document
    .querySelector('[data-action="delete"]')
    .addEventListener("click", deleteNumber);


// KEYBOARD SUPPORT

document.addEventListener("keydown", (event) => {

    const key = event.key;


    // Numbers and decimal
    if (/^[0-9.]$/.test(key)) {

        appendNumber(key);

    }


    // Addition
    else if (key === "+") {

        chooseOperation("+");

    }


    // Subtraction
    else if (key === "-") {

        chooseOperation("-");

    }


    // Multiplication
    else if (key === "*") {

        chooseOperation("×");

    }


    // Division
    else if (key === "/") {

        event.preventDefault();

        chooseOperation("÷");

    }


    // Enter or equals
    else if (
        key === "Enter" ||
        key === "="
    ) {

        calculate();

    }


    // Backspace
    else if (key === "Backspace") {

        deleteNumber();

    }


    // Escape clears calculator
    else if (key === "Escape") {

        clearCalculator();

    }

});


// Display calculator when page loads
updateDisplay();