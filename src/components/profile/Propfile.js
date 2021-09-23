import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

function Profile(props) {
  const {
    onUpdateUser,
    logout,
    buttonText,
    toggleProfileEditing,
    profileEditing,
    errorMessage,
    setErrorMessage,
  } = props;
  const { currentUser } = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nameIsNotChanged, setNameIsNotChanged] = React.useState(true);
  const [emailIsNotChanged, setEmailIsNotChanged] = React.useState(true);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setNameIsNotChanged(true);
    setEmailIsNotChanged(true);
  }, [currentUser]);

  React.useEffect(() => {
    if (nameIsNotChanged && emailIsNotChanged) {
      setErrorMessage("");
    }
  }, [handleChangeName, handleChangeEmail]);

  function handleChangeName(e) {
    setName(e.target.value);
    if (e.target.value === currentUser.name) {
      setNameIsNotChanged(true);
    } else {
      setNameIsNotChanged(false);
    }
    if (errorMessage) {
      setErrorMessage("");
    }
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    if (e.target.value === currentUser.email) {
      setEmailIsNotChanged(true);
    } else {
      setEmailIsNotChanged(false);
    }
    if (errorMessage) {
      setErrorMessage("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      email,
    });
  }

  return (
    <section className="profile">
      <div className="profile__inner">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>

        <form className="profile__form" method="POST" onSubmit={handleSubmit}>
          <fieldset className="profile__fieldset">
            <label className="profile__field">
              <span className="profile__label-name">Имя</span>
              <input
                className={`profile__input`}
                disabled={!profileEditing}
                value={name || ""}
                onChange={handleChangeName}
                minLength="2"
                type="text"
                required={true}
              />
            </label>
            <span className="profile__decor-line"></span>
            <label className="profile__field">
              <span className="profile__label-name">E-mail</span>
              <input
                className={`profile__input`}
                disabled={!profileEditing}
                value={email || ""}
                onChange={handleChangeEmail}
                minLength="2"
                type="email"
                required={true}
              />
            </label>
          </fieldset>

          {profileEditing && (
            <>
              <span className="profile__error">
                {errorMessage ? errorMessage : ""}
              </span>
              {nameIsNotChanged && emailIsNotChanged ? (
                <button
                  type="button"
                  onClick={toggleProfileEditing}
                  className={`profile__button profile__button_type_save`}
                >
                  Назад
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={nameIsNotChanged && emailIsNotChanged}
                  className={`profile__button profile__button_type_save`}
                >
                  {buttonText ? buttonText : "Сохранить"}
                </button>
              )}
            </>
          )}
        </form>
        {!profileEditing && (
          <>
            <button
              className="profile__button  profile__button_type_edit"
              onClick={toggleProfileEditing}
              type="button"
            >
              Редактировать
            </button>
            <Link
              className="profile__button profile__button_type_exit"
              to="/"
              onClick={logout}
            >
              Выйти из аккаунта
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

export default Profile;
