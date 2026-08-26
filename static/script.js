let current = "0";
let firstNumber = null;
let operator = null;
let waitingForNumber = false;

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");
const historyBox = document.getElementById("history");

function updateDisplay() {
    currentDisplay.textContent = current;
}

function formatNumber(value) {
    const number = Number(value);
    if (Number.isInteger(number)) {
        return String(number);
    }
    return String(Number(number.toFixed(10)));
}

function operatorSymbol(value) {
    return {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        "%": "%"
    }[value] || value;
}

function enterNumber(value) {
    if (waitingForNumber) {
        current = value;
        waitingForNumber = false;
    } else if (value === "." && current.includes(".")) {
        return;
    } else if (current === "0" && value !== ".") {
        current = value;
    } else if (current.length < 15) {
        current += value;
    }

    updateDisplay();
}

function chooseOperator(nextOperator) {
    const value = Number(current);

    if (operator !== null && !waitingForNumber) {
        calculate(false);
    }

    firstNumber = Number(current);
    operator = nextOperator;
    waitingForNumber = true;

    previousDisplay.textContent =
        `${formatNumber(firstNumber)} ${operatorSymbol(operator)}`;
}

function calculate(showHistory = true) {
    if (operator === null || firstNumber === null) {
        return;
    }

    const secondNumber = Number(current);
    let result;

    if (operator === "+") result = firstNumber + secondNumber;
    if (operator === "-") result = firstNumber - secondNumber;
    if (operator === "*") result = firstNumber * secondNumber;

    if (operator === "/") {
        if (secondNumber === 0) {
            current = "Error";
            previousDisplay.textContent = "Cannot divide by zero";
            operator = null;
            firstNumber = null;
            waitingForNumber = true;
            updateDisplay();
            return;
        }
        result = firstNumber / secondNumber;
    }

    if (operator === "%") {
        result = firstNumber % secondNumber;
    }

    const left = formatNumber(firstNumber);
    const right = formatNumber(secondNumber);
    const answer = formatNumber(result);

    if (showHistory) {
        addHistory(
            `${left} ${operatorSymbol(operator)} ${right}`,
            answer
        );
    }

    previousDisplay.textContent =
        `${left} ${operatorSymbol(operator)} ${right} =`;

    current = answer;
    firstNumber = null;
    operator = null;
    waitingForNumber = true;
    updateDisplay();
}

function clearCalculator() {
    current = "0";
    firstNumber = null;
    operator = null;
    waitingForNumber = false;
    previousDisplay.textContent = "Ready";
    updateDisplay();
}

function backspace() {
    if (waitingForNumber || current === "Error") return;

    current = current.length > 1
        ? current.slice(0, -1)
        : "0";

    updateDisplay();
}

function addHistory(calculation, answer) {
    const empty = historyBox.querySelector(".empty");
    if (empty) empty.remove();

    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
        <div class="calculation">${calculation}</div>
        <div class="answer">= ${answer}</div>
    `;

    historyBox.prepend(item);

    while (historyBox.children.length > 8) {
        historyBox.removeChild(historyBox.lastChild);
    }
}

document.querySelectorAll(".keypad button").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (value !== undefined) {
            if ("+-*/%".includes(value)) {
                chooseOperator(value);
            } else {
                enterNumber(value);
            }
        }

        if (action === "clear") clearCalculator();
        if (action === "backspace") backspace();
        if (action === "calculate") calculate(true);
    });
});

document.addEventListener("keydown", event => {
    const key = event.key;

    if (/^[0-9.]$/.test(key)) {
        enterNumber(key);
    } else if ("+-*/%".includes(key)) {
        chooseOperator(key);
    } else if (key === "Enter" || key === "=") {
        calculate(true);
    } else if (key === "Backspace") {
        backspace();
    } else if (key === "Escape") {
        clearCalculator();
    }
});

document.getElementById("clearHistory").addEventListener("click", () => {
    historyBox.innerHTML =
        '<p class="empty">Your calculations will appear here.</p>';
});

updateDisplay();
