function addSymbol(symbol){
    document.getElementById("screen").value += symbol;
}

function clearScreen(){
    document.getElementById("screen").value = "";
}

function operate(){
    let operation = document.getElementById("screen").value;
    let result = "";

    let operatorPos = getOperatorPosition(operation);

    if (operatorPos != null) {
        let operator = operation[operatorPos];
        let firstTerm = operation.slice(0, operatorPos);
        let secondTerm = operation.slice(operatorPos + 1, operation.length);

        if (validateTerm(firstTerm) == true && secondTerm != ""
            && validateTerm(secondTerm)){
                result = processOperation(operator, firstTerm, secondTerm);
            }
            else {
                result = "E";
            }
    }

    else {
        result = "E";
    }

    document.getElementById("screen").value = result;
}

function validateTerm(term){
    let termOk = true;

    for (let i = 0; i < term.length; i++){
        if (i == 0 && isNaN(term[i]) == true && term[i] != "+"
            && term[i] != "-"){
                termOk = false;
            }
            else if (i != 0 && isNaN(term[i]) == true){
                termOk = false;
            }
    }

    return termOk;
}

function processOperation(operator, firstTem, secondTerm){
    let res = null;

    switch(operator){
        case "+":
            res = parseInt(firstTem) + parseInt(secondTerm);
            break;
        case "-":
            res = parseInt(firstTem) - parseInt(secondTerm);
            break;
        case "*":
            res = parseInt(firstTem) * parseInt(secondTerm);
            break;
        case "/":
            if (parseInt(secondTerm) != 0) {
                res = parseInt(firstTem) / parseInt(secondTerm);
            }
            else {
                res = "E";
            }
            break;
    }

    return res;
}

function getOperatorPosition(operation){
    let operatorPos = null;

    for (let i = 0; i < operation.length && operatorPos == null; i++){
        if (isNaN(operation[i]) == false && operation[i+1] != undefined
        && isNaN(operation[i+1]) == true){
            operatorPos = i+1;
        }
    }
    return operatorPos;
}