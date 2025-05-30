// functions:
// **display every entered button on display
// **when clicking on C delete the last entered character
// ** clicking on AC delete everything
// ** clicking on the equal sign displays the result

const numberButtons = document.querySelectorAll('.button.number');
const operatorButtons = document.querySelectorAll('.button.operator');
const allClearButton = document.querySelector('.allClear');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const display = document.querySelector('.display');
const dotButton = document.querySelector('#dot'); 

function clearLastChar() {
    const currentContent = display.textContent;
    if (currentContent.length > 0) {
        display.textContent = currentContent.slice(0, -1);
    }
}

function clearAll() {
    display.textContent = "";
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;
        if (display.textContent === "0") {
            if (buttonValue === "0") return;
            display.textContent = buttonValue;
        } else {
            display.textContent += buttonValue;
        }
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const currentText = display.textContent;
        const pressedOperator = button.textContent;
        const lastChar = currentText.slice(-1);
        const allOperators = ['+', '-', '*', '/', '%'];

        if (currentText === "") {
            if (pressedOperator === '-') { // allow leading minus
                display.textContent += pressedOperator;
            }
            return;
        }

        if (allOperators.includes(lastChar)) {
            if (pressedOperator === '-' && lastChar !== '-') { // allow negative after operator 5*-
                display.textContent += pressedOperator;
            } else if (pressedOperator !== '-') { // replace last operator
                if (currentText.length > 1 && allOperators.includes(currentText.slice(-2, -1)) && lastChar === '-') {
                    display.textContent = currentText.slice(0, -2) + pressedOperator;
                } else {
                    display.textContent = currentText.slice(0, -1) + pressedOperator;
                }
            }
        } else {
            display.textContent += pressedOperator;
        }
    });
});

dotButton.addEventListener('click', () => {
    const currentText = display.textContent;
    const lastChar = currentText.slice(-1);

    if (lastChar === '.') return; // prevent double dots 

    const parts = currentText.split(/([+\-*/%])/);
    const currentNumberSegment = parts.length > 0 ? parts[parts.length - 1] : "";

    if (currentNumberSegment.includes('.')) return; // prevent multiple dots in one number 

    if (currentText === "" || ['+', '-', '*', '/', '%'].includes(lastChar)) {
        display.textContent += "0."; // add "0." if starting with dot or after operator
    } else {
        display.textContent += ".";
    }
});

// ** clicking on the equal sign displays the result
function calculateResult() {
    const expression = display.textContent;

    if (!expression.trim()) {
        return;
    }

    const basicRegex = /\d+(\.\d+)?|[+\-*/%]/g;
    let rawTokens = expression.match(basicRegex);

    if (!rawTokens) {
        display.textContent = "Error";
        return;
    }

    // Handle negative numbers 
    let tokens = [];
    for (let i = 0; i < rawTokens.length; i++) {
        if (rawTokens[i] === '-' &&
            (i === 0 || ['+', '-', '*', '/', '%'].includes(rawTokens[i - 1])) &&
            rawTokens[i + 1] && !isNaN(parseFloat(rawTokens[i + 1]))
        ) {
            tokens.push("-" + rawTokens[i + 1]);
            i++;
        } else {
            tokens.push(rawTokens[i]);
        }
    }

    if (tokens.length === 0) {
        display.textContent = "Error"; return;
    }
    // Basic error check
    if (['+', '-', '*', '/', '%'].includes(tokens[tokens.length - 1]) && tokens[tokens.length -1].length === 1) {
        display.textContent = "Error"; return;
    }
    if (tokens.length === 1 && isNaN(parseFloat(tokens[0]))) {
        display.textContent = "Error"; return;
    }

    // Calculate *, /, % first
    const highPrecedenceOps = ['*', '/', '%'];
    for (const op of highPrecedenceOps) {
        while (tokens.includes(op)) {
            const opIndex = tokens.indexOf(op);
            if (opIndex === 0 || opIndex === tokens.length - 1 || isNaN(parseFloat(tokens[opIndex-1])) || isNaN(parseFloat(tokens[opIndex+1]))) {
                display.textContent = "Error"; return;
            }
            const num1 = parseFloat(tokens[opIndex - 1]);
            const num2 = parseFloat(tokens[opIndex + 1]);
            let result;
            if (op === '*') result = num1 * num2;
            else if (op === '/') {
                if (num2 === 0) { display.textContent = "Error: Div by 0"; return; }
                result = num1 / num2;
            } else if (op === '%') {
                if (num2 === 0) { display.textContent = "Error: Mod by 0"; return; }
                result = num1 % num2;
            }
            tokens.splice(opIndex - 1, 3, result.toString());
        }
    }

    // Calculate +,- 
    while (tokens.length > 1) {
        if (tokens.length < 3 || isNaN(parseFloat(tokens[0])) || !['+', '-'].includes(tokens[1]) || isNaN(parseFloat(tokens[2]))){
            if (tokens.length === 1 && !isNaN(parseFloat(tokens[0]))) break;
            display.textContent = "Error"; return;
        }
        const num1 = parseFloat(tokens[0]);
        const operator = tokens[1];
        const num2 = parseFloat(tokens[2]);
        let result;
        if (operator === '+') result = num1 + num2;
        else if (operator === '-') result = num1 - num2;
        
        tokens.splice(0, 3, result.toString());
    }

    if (tokens.length === 1 && !isNaN(parseFloat(tokens[0]))) {
        let finalNum = parseFloat(tokens[0]);
        // avoid long decimals
        display.textContent = Number(finalNum.toFixed(7)).toString();
    } else {
        display.textContent = "Error";
    }
}

clearButton.addEventListener('click', clearLastChar);
allClearButton.addEventListener('click', clearAll);
equalButton.addEventListener('click', calculateResult);

clearAll(); 