class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  //Шаблон запроса
  _sendRequest(path, parameters) {
    return fetch(`${this._url}/${path}`, parameters).then((res) => {
      return res.json();
    });
  }

  getSavedMovies(token) {
    return this._sendRequest(`movies`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  changeUserInfo(token, formValues) {
    return this._sendRequest(`users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formValues.name,
        email: formValues.email,
      }),
    });
  }

  saveMovie(
    token,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId
  ) {
    return this._sendRequest(`movies`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
      }),
    });
  }

  deleteMovie(token, movieId) {
    return this._sendRequest(`movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
}

export const mainApi = new MainApi({
  baseUrl: "https://movies.maratb.nomoredomains.monster",
});
