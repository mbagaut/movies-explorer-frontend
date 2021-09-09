import { useState, useCallback } from "react";

export const useFormWithValidation = () => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const onChange = useCallback((evt) => {
    setValue(evt.target.value);
    setErrorMessage(evt.target.validationMessage);
    setIsValid(evt.target.validity.valid);
  }, []);

  const onBlur = useCallback((evt) => {
    setIsDirty(true);
  }, []);

  return {
    value,
    setValue,
    errorMessage,
    setErrorMessage,
    isValid,
    setIsValid,
    onChange,
    onBlur,
    isDirty,
  };
};
