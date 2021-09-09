import React from "react";

function FormInput(props) {
  const { field, labelName, minlength, maxlength, inputName, type, required } =
    props;

  return (
    <div className="form-input">
      <label className="form-input__field">
        {labelName}
        <input
          className={`form-input__input ${
            !field.isValid && field.isDirty && "form-input__input_error"
          }`}
          required={required}
          minlength={minlength}
          maxlength={maxlength}
          name={inputName}
          type={type}
          onBlur={field.onBlur}
          {...field}
        />
        <span className="form-input__error">
          {field.isDirty && field.errorMessage}
        </span>
      </label>
    </div>
  );
}

export default FormInput;
