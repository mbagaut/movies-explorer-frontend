import React from "react";
import { Link } from "react-router-dom";

function Profile(props) {
  const { onUpdateUser, logout } = props;
  //   const { currentUser } = React.useContext(CurrentUserContext);

  const userName = "Виталий";
  const userEmail = "pochta@yandex.ru";
  const [editingIsOn, setEditingIsOn] = React.useState(false);

  const enableEditing = () => {
    setEditingIsOn(true);
  };

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  //   React.useEffect(() => {
  //     setName(currentUser.name);
  //     setEmail(currentUser.email);
  //   }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
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
        <h1 className="profile__title">{`Привет, ${userName}!`}</h1>

        <form className="profile__form" method="POST" onSubmit={handleSubmit}>
          <fieldset className="profile__fieldset">
            <label className="profile__field">
              <span className="profile__label-name">Имя</span>
              <input
                className={`profile__input`}
                disabled={!editingIsOn}
                value={name || userName || ""}
                onChange={handleChangeName}
              />
            </label>
            <span className="profile__decor-line"></span>
            <label className="profile__field">
              <span className="profile__label-name">E-mail</span>
              <input
                className={`profile__input`}
                disabled={!editingIsOn}
                value={email || userEmail || ""}
                onChange={handleChangeEmail}
              />
            </label>
          </fieldset>

          {editingIsOn && (
            <>
              <span className="profile__error">
                При обновлении профиля произошла ошибка.
              </span>
              <button
                type="submit"
                className="profile__button profile__button_type_save"
              >
                Сохранить
              </button>
            </>
          )}
        </form>
        {!editingIsOn && (
          <>
            <button
              className="profile__button  profile__button_type_edit"
              onClick={enableEditing}
              type="button"
            >
              Редактировать
            </button>
            <Link
              className="profile__button profile__button_type_exit"
              to="/sign-in"
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
