import React from "react";

function AuthorizationForm(props) {
  const {
    handleSubmit,
    children,
    isFormValid,
    submitButtonText,
    authorizationErrorMessage,
  } = props;

  return (
    <form className="authorization-form" onSubmit={handleSubmit}>
      <fieldset className="authorization-form__fieldset">{children}</fieldset>
      <span className="authorization-form__error">
        {isFormValid && authorizationErrorMessage}
      </span>
      <button
        type="submit"
        className="authorization-form__button"
        disabled={!isFormValid}
      >
        {submitButtonText}
      </button>
    </form>
  );
}

export default AuthorizationForm;
