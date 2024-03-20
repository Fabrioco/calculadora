import { useState } from "react";

const Calculator = () => {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const multiplers = ["+", "-", "*", "/"];

  const [currentValue, setCurrentValue] = useState("0");
  const [pendingValue, setPendingValue] = useState(null);
  const [pendingOperation, setPendingOperation] = useState(null);
  const [completeOperation, setCompleteOperation] = useState("");

  const handleAdd = (num) => {
    setCurrentValue((antValor) => {
      if (antValor === "0") {
        return num;
      } else {
        return antValor + num;
      }
    });
    setCompleteOperation((antOperação) => antOperação + num);
  };

  const handleOperação = (mult) => {
    setCompleteOperation(currentValue + " " + mult);
    setPendingOperation(mult);
    setPendingValue(currentValue);
    setCurrentValue("");
  };

  const handleCalcular = () => {
    if (!pendingOperation || !pendingValue) {
      return;
    }
    const num1 = parseFloat(pendingValue);
    const num2 = parseFloat(currentValue);

    let resultado;

    switch (pendingOperation) {
      case "+":
        resultado = num1 + num2;
        break;
      case "-":
        resultado = num1 - num2;
        break;
      case "*":
        resultado = num1 * num2;
        break;
      case "/":
        if (num2 !== 0) {
          resultado = num1 / num2;
        } else {
          setCurrentValue("Error");
          setCompleteOperation("Error");
          setPendingOperation(null);
          setPendingValue(null);
          return;
        }
        break;

      default:
        break;
    }
    setCompleteOperation(
      pendingValue +
        " " +
        pendingOperation +
        " " +
        currentValue +
        " = " +
        resultado
    );
    setCurrentValue(resultado.toString());
    setPendingOperation(null);
    setPendingValue(null);
  };

  const handleClear = () => {
    setCurrentValue("0");
    setPendingOperation(null);
    setPendingValue(null);
    setCompleteOperation("");
  };

  return (
    <div className="calculator-container">
      <div className="show__numbers">
        <p>{completeOperation}</p>
        <p>{currentValue}</p>
      </div>
      <div className="calculator__btns">
        <button onClick={handleClear}>AC</button>
        {numbers.map((num) => (
          <button onClick={() => handleAdd(num)} key={num}>
            {num}
          </button>
        ))}
        {multiplers.map((mult) => (
          <button onClick={() => handleOperação(mult)} key={mult}>
            {mult}
          </button>
        ))}
        <button onClick={handleCalcular}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
