let runningTotal = 0;
let buffer = "0";
let previousOperator;
let already_calculated = false;
const screen = document.querySelector(".screen");

document.querySelector(".buttons").addEventListener("click", function (event) {
  buttonClick(event.target.innerText);
});

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
}

function handleNumber(value) {
  already_calculated = concatenatedCalculation(already_calculated);
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
  rerender();
}

function handleSymbol(value) {
  if (value === "<-") {
    if (buffer.length > 1) {
      buffer = buffer.substring(0, buffer.length - 1);
    } else {
      buffer = "0";
    }
  } else if (value === "C") {
    buffer = "0";
    runningTotal = 0;
    previousOperator = undefined;
  } else if (value !== "=" && previousOperator === undefined) {
    previousOperator = value;
    runningTotal = parseInt(buffer);
    buffer = "0";
  } else if (value !== "=" && previousOperator !== undefined) {
    runningTotal = calculator(previousOperator, buffer, runningTotal);
    previousOperator = value;
    buffer = runningTotal;
    already_calculated = true;
  }

  if (value === "=" && previousOperator !== undefined) {
    runningTotal = calculator(previousOperator, buffer, runningTotal);
    buffer = runningTotal;
    previousOperator = undefined;
  }
  rerender();
}

function calculator(previousOperator, buffer, runningTotal) {
  if (previousOperator == "+") {
    runningTotal += parseInt(buffer);
  } else if (previousOperator == "-") {
    runningTotal -= parseInt(buffer);
  } else if (previousOperator == "*") {
    runningTotal *= parseInt(buffer);
  } else if (previousOperator == "/") {
    runningTotal /= parseInt(buffer);
  }
  return runningTotal;
}

function concatenatedCalculation(already_calculated) {
  //para los calculos concatenados donde no se usa el =
  //Ej: 1+2 (cuando se escribe eso y se vuelve a presionar un signo dif al =, muestra el resultado de la op anterior)
  if (already_calculated) {
    buffer = "0";
  }
  return false;
}
function rerender() {
  screen.innerText = buffer;
}
