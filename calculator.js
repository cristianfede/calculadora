class Calculator{
    constructor(operand1Element, operand2Element, historyElement){
        this.operand1Element = operand1Element;
        this.operand2Element = operand2Element;
        this.historyElement = historyElement;
        this.clear();

    }

    clear() {
        this.operand1 = 0;
        this.operand2 = 0;
        this.operator = '';
        this.updateUI();
    }

    updateUI(){
        this.operand1Element.innerHTML = this.operand1 + this.operator;
        this.operand2Element.innerHTML = this.operand2;
    }

    appendNumber(number){
        if(number === "." && this.operand2.toString() .includes('.')) return;
        this.operand2 = this.operand2 === 0 
                        ? number 
                        : this.operand2.toString() + number;
        this.updateUI();
    }

    delete(){
        if(this.operand2 === 0) return;
        this.operand2 = +this.operand2.toString().slice(0, -1) || 0;
        this.updateUI();
    }

    operation(operator) {
        if(this.operator){
            this.calc(); //calculardo el resultado 
        }
        // asignamos el nuevo operador a nuetra variable interna
        this.operator = operator;
        this.operand1 = +this.operand2 === 0 
                        ? this.operand1 
                        : this.operand2;
        this.operand2 = 0;
        this.updateUI();
    }

    calc(){
        let result;
        switch(this.operator){
            case "+":
                result = +this.operand1 + +this.operand2;
            break;
            case "-":
                result = +this.operand1 - +this.operand2;
            break;
            case "*":
                result = +this.operand1 * +this.operand2;
            break;
            case "/":
                result = +this.operand1 / +this.operand2;
            break;
            default:
                return;
        }
        // reseteamos el operador 
        this.logHistory(this.operand1, this.operator, this.operand2, result);
        this.operand1 = result;
        this.operator = "";
        this.operand2 = 0;
        this.updateUI();
    }

    logHistory(operand1, operator, operand2, result) {
        const historyEntry = document.createElement('div');
        historyEntry.textContent = `${operand1} ${operator} ${operand2} = ${result}`;
        this.historyElement.appendChild(historyEntry);
    }
    
}

const operand1Element = document.querySelector("[data-operand-1]")
const operand2Element = document.querySelector("[data-operand-2]")
const historyElement = document.getElementById("history");
const clearButton = document.querySelector("[data-clear]")
const deleteButton = document.querySelector("[data-delete]");
const equalButton  = document.querySelector("[data-equals]");
const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");

//nueva calculadora pasando los 3 lementos que queremos actualizar en la pantalla de usuario
const calculator = new Calculator(operand1Element, operand2Element, historyElement);

clearButton.addEventListener("click", () =>{
    calculator.clear();
})

numberButton.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerHTML);
    })
})

deleteButton.addEventListener('click', () =>{
    calculator.delete();
})

operationButton.forEach(button =>{
    button.addEventListener("click", () =>{
        calculator.operation(button.innerHTML);
    })
})

equalButton.addEventListener("click", () =>{
    calculator.calc();
})