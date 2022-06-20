import { useState } from "react";

const useInput = (validateValue, initialValue = "") => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    console.log(event.target.value);
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    console.log("TOUCHED");
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    isTouched,
    initialValue: initialValue,
  };
};

export default useInput;
