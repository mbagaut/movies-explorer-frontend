import React from "react";
import { useFormWithValidation } from "../../utils/useFormWithValidation";
import AuthorizationForm from "../authorizationForm/AuthorizationForm";
import FormInput from "../formInput/FormInput";
import Authorization from "../authorization/Authorization";

function Register(props) {
  const {
    handleRegister,
    authorizationErrorMessage,
    setAuthorizationErrorMessage,
  } = props;

  const nameField = useFormWithValidation();
  const emailField = useFormWithValidation();
  const passwordField = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(nameField.value, emailField.value, passwordField.value);
  };

  return (
    <Authorization
      authorizationTitle="Добро пожаловать!"
      linkHighlightedText="Войти"
      linkText="Уже зарегистрированы?"
      linkAddress="/sign-in"
      hasLogo={true}
    >
      <AuthorizationForm
        formName="registration"
        submitButtonText="Зарегистрироваться"
        isFormValid={
          nameField.isValid && emailField.isValid && passwordField.isValid
        }
        handleSubmit={handleSubmit}
        authorizationErrorMessage={authorizationErrorMessage}
      >
        <FormInput
          field={nameField}
          labelName="Имя"
          minLength="2"
          inputName="name"
          type="text"
          required={true}
          pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
          setAuthorizationErrorMessage={setAuthorizationErrorMessage}
        />

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

export default Register;
