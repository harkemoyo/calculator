const calculatorDisplay = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');


let firstValue = 0;
let operatorValue = '';
let awaitingValue = false;


// event Listener func
function saveNumberValue(number){
//  replacing current  display  value if first value is enterd
    if(awaitingValue){
        calculatorDisplay.textContent = number;
        awaitingValue = false;
    }else{
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

// use operator func
function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    // preventing multiple operators
    if(operatorValue && awaitingValue) {
        operatorValue = operator;
        return;
    }
    // assing first value if no number
    if(!firstValue){
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    awaitingValue = true;
    operatorValue = operator;
    
    
}
//  calc first and the second value depending on the operator
const calculate = {
    '/': (firstNumber , secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber , secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber , secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber , secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber , secondNumber) => firstNumber = secondNumber,

};

// Decimal
function AddDecimal(){
    // if not a operator 
    if(awaitingValue) return; 
    // if no decimal add one
    if (!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

// Adding event Listeners to classes and Ids

inputBtn.forEach((input) =>{
    if(input.classList.length === 0){
        input.addEventListener('click', () => saveNumberValue(input.value));
    }else if (input.classList.contains('operator')){
        input.addEventListener('click', () => useOperator(input.value));

    }else if(input.classList.contains('decimal')){
        input.addEventListener('click', () => AddDecimal());

    }else if(input.classList.contains('equal-sign')){
        input.addEventListener('click', () => saveNumberValue(input.value));

    }
});

// Reset all calculator
function resetAll(){
     firstValue = 0;
     operatorValue = '';
     awaitingValue = false;
    calculatorDisplay.textContent = '0';
}

// Event Listener
clearBtn.addEventListener('click',resetAll);