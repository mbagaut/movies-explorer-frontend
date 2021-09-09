import React from "react";
import { useFormWithValidation } from "../../utils/useFormWithValidation";
import AuthorizationForm from "../authorizationForm/AuthorizationForm";
import FormInput from "../formInput/FormInput";
import Authorization from "../authorization/Authorization";

function Register(props) {
  const { handleLogin } = props;

  const nameField = useFormWithValidation();
  const emailField = useFormWithValidation();
  const passwordField = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(nameField.value, emailField.value, passwordField.value);
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
      >
        <FormInput
          field={nameField}
          labelName="Имя"
          minlength="2"
          inputName="name"
          type="text"
          required="true"
        />

        <FormInput
          field={emailField}
          labelName="E-mail"
          minlength="2"
          inputName="email"
          type="text"
          required="true"
        />

        <FormInput
          field={passwordField}
          labelName="Пароль"
          minlength="2"
          inputName="password"
          type="password"
          required="true"
        />
      </AuthorizationForm>
    </Authorization>
  );
}

export default Register;
