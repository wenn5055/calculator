const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const statuss = document.getElementById("status-indicator");

let afterEquals = false;
let exp = "";
let storedANS = "";
let isOn = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.textContent;
    if (value === "⏻") {
      if (isOn === true) isOn = false;
      else isOn = true;
      // Save original alignment
      const prevAlign = display.style.textAlign;
      statuss.textContent = "";
      // Center temporarily
      display.style.textAlign = "center";
      display.value = "WENNS CALC";
    
      // Restore after 2 seconds
      setTimeout(() => {
        display.value = "";
        display.style.textAlign = prevAlign;
        if (isOn === true) statuss.textContent = "[ON]";
        else statuss.textContent = "[OFF]";
      }, 2000);
    } else {
      if (isOn === true) {
        if (value === "=") {
          try {
            display.value = math.evaluate(exp);
            storedANS = display.value;
          } catch (err) {
            display.value = "Error";
          } finally {
            afterEquals = true;
          }
        } else if (value === "C") {
            display.value = "";
            exp = "";
            storedANS = "";
        } else {
          if (afterEquals === true) {
            afterEquals = false;
            if (isOperator(value)) {
                display.value = "ans";
                exp = storedANS;
            } else {
                display.value = "";
                exp = "";
            }
          }
          display.value += value;
          if (value === "x") value = "*";
          if (value === "÷") value = "/";
          if (value === "ans") value = storedANS;
          exp += value;
        }
      }
    }
  })
});


function isOperator(value) {
    return value === "+" || value === "-" || value === "x" || value === "÷";
}