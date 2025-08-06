document.querySelectorAll('input[name="theme"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        if (event.target.value === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });
});

const display = document.querySelector('#box-one-middle input[type="text"]');
const buttons = document.querySelectorAll('.box-three button, .box-two button, #box-one-bottom button');

let currentInput = '';
let previousInput = '';
let operator = '';
let lastResult = ''; 

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value) || value === '.') {
            currentInput += value;
            display.value = currentInput;
        } else if (value === 'AC') {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.value = '';
        } else if (value === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        } else if (value === 'ANS') {
            currentInput = lastResult;
            display.value = currentInput;
        } else if (value === '=') {
      
            if (previousInput && currentInput && operator) {
                const result = calculate(Number(previousInput), Number(currentInput), operator);
                display.value = `${previousInput} ${operator} ${currentInput} = ${result}`;
                lastResult = result.toString(); 
                currentInput = result.toString();
                previousInput = '';
                operator = '';
            }
        } else if (value === 'CONST') {
            currentInput = Math.PI.toString();
            display.value = currentInput;
        } else if (value === 'cotx') {
            if (currentInput) {
                const radians = (Number(currentInput) * Math.PI) / 180; 
                if (Math.tan(radians) === 0) {
                    display.value = 'cotx undefined'; 
                } else {
                    currentInput = (1 / Math.tan(radians)).toFixed(5).toString();
                    display.value = currentInput;
                }
            }
        } else if (value === 'acot') {
            if (currentInput) {
                const radians = Math.atan(1 / Number(currentInput));
                currentInput = (radians * (180 / Math.PI)).toFixed(5).toString(); 
                display.value = currentInput;
            }
        } else if (value === 'ON') {
            currentInput = '';
            previousInput = '';
            operator = '';
            lastResult = '';
            display.value = '';

            document.querySelector('.main-box').classList.add('reset-animation');
            setTimeout(() => {
                document.querySelector('.main-box').classList.remove('reset-animation');
            }, 300);
        } else if (value === 'x²') {
            if (currentInput) {
                currentInput = Math.pow(Number(currentInput), 2).toString();
                display.value = currentInput;
            }
        } else if (value === 'x³') {
            if (currentInput) {
                currentInput = Math.pow(Number(currentInput), 3).toString();
                display.value = currentInput;
            }
        } else if (value === 'log') {
          
            if (currentInput) {
                currentInput = Math.log10(Number(currentInput)).toFixed(5).toString();
                display.value = currentInput;
            }
        } else if (value === 'IN') {
           
            if (currentInput) {
                currentInput = Math.log(Number(currentInput)).toFixed(5).toString();
                display.value = currentInput;
            }
        } else if (value === 'EXP') {
            if (currentInput) {
                currentInput = Number(currentInput).toExponential(2).toString();
                display.value = currentInput;
            }
        } else if (value === 'e') {
            currentInput = Math.E.toString();
            display.value = currentInput;
        } else if (value === 'nPr' || value === 'nCr') {
            display.value = 'Feature not implemented';
        } else {
            
            if (currentInput) {
                if (previousInput && operator) {
                    const result = calculate(Number(previousInput), Number(currentInput), operator);
                    previousInput = result.toString();
                } else {
                    previousInput = currentInput;
                }
                currentInput = '';
                operator = value;
                display.value = `${previousInput} ${operator}`;
            }
        }
    });
});

function calculate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'X':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
        case '^':
            return Math.pow(num1, num2);
        default:
            return 'Invalid Operation';
    }
}


document.getElementById('year').textContent = new Date().getFullYear();