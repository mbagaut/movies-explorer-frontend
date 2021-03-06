import React from "react";
import { useFormWithValidation } from "../../utils/useFormWithValidation";
import AuthorizationForm from "../authorizationForm/AuthorizationForm";
import FormInput from "../formInput/FormInput";
import Authorization from "../authorization/Authorization";

function Login(props) {
  const {
    handleLogin,
    authorizationErrorMessage,
    setAuthorizationErrorMessage,
  } = props;

  const emailField = useFormWithValidation();
  const passwordField = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(emailField.value, passwordField.value);
  };

  return (
    <Authorization
      authorizationTitle="Рады видеть!"
      linkHighlightedText="Регистрация"
      linkText="Ещё не зарегистрированы?"
      linkAddress="/sign-up"
      hasLogo={true}
    >
      <AuthorizationForm
        formName="login"
        submitButtonText="Войти"
        isFormValid={emailField.isValid && passwordField.isValid}
        handleSubmit={handleSubmit}
        authorizationErrorMessage={authorizationErrorMessage}
      >
        <FormInput
          field={emailField}
          labelName="E-mail"
          minLength="2"
          inputName="email"
          type="email"
          required={true}
          setAuthorizationErrorMessage={setAuthorizationErrorMessage}
        />

        <FormInput
          field={passwordField}
          labelName="Пароль"
          minLength="2"
          inputName="password"
          type="password"
          required={true}
          setAuthorizationErrorMessage={setAuthorizationErrorMessage}
        />
      </AuthorizationForm>
    </Authorization>
  );
}

export default Login;
