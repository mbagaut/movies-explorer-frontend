class MoviesApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  //Шаблон запроса
  _sendRequest(path, parameters) {
    return fetch(`${this._url}/${path}`, parameters).then((res) =>
      res.ok ? res.json() : Promise.reject(res)
    );
  }

  getMoviesList() {
    return this._sendRequest(``, {
      method: "GET",
    });
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});
