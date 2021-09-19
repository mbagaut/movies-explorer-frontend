import React from "react";

function FormInput(props) {
  const {
    field,
    labelName,
    minLength,
    maxLength,
    inputName,
    type,
    required,
    setAuthorizationErrorMessage,
  } = props;
  const { errorMessage, isDirty, isValid, onBlur, onChange } = field;

  const checkErrorsOnChange = (e) => {
    onChange(e);
    if (setAuthorizationErrorMessage) {
      setAuthorizationErrorMessage("");
    }
  };

  return (
    <div className="form-input">
      <label className="form-input__field">
        {labelName}
        <input
          className={`form-input__input ${
            !isValid && isDirty && "form-input__input_error"
          }`}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          name={inputName}
          type={type}
          onBlur={onBlur}
          onChange={checkErrorsOnChange}
        />
        <span className="form-input__error">{isDirty && errorMessage}</span>
      </label>
    </div>
  );
}

export default FormInput;
