import { getCookie } from "react-use-cookie";

class FetchApiService {
  constructor() {
    this.baseAPI = "https://kata.academy:8021/api";
    this.artilesPerPage = 10;
    this.userToken = getCookie("Token");
  }

  async sendRequest(url, value, token, method) {
    const headers = new Headers({
      "Content-Type": "application/json;charset=utf-8",
    });

    if (token) headers.append("Authorization", `Bearer ${token}`);

    const sendData = value
      ? {
          method: "post",
          headers: headers,
          body: JSON.stringify(value),
        }
      : {
          method: "get",
          headers: headers,
        };

    if (method) sendData.method = method;

    try {
      const res = await fetch(url, sendData);
      if (res.ok) {
        return await res.json();
      }
      throw new Error(res.status);
    } catch (error) {
      throw new Error(error);
    }
  }
  getArticles() {
    return this.sendRequest(
      `${this.baseAPI}/articles?limit=${this.artilesPerPage}`
    );
  }
  getArticle = (slug) => {
    return this.sendRequest(`${this.baseAPI}/articles/${slug}`);
  };

  createUser(data) {
    return this.sendRequest(
      `${this.baseAPI}/users`,
      {
        user: data,
      },
      undefined,
      "post"
    );
  }

  loginUser(data) {
    return this.sendRequest(
      `${this.baseAPI}/users/login`,
      {
        user: data,
      },
      "post"
    );
  }

  getCurrentUser(token) {
    return this.sendRequest(`${this.baseAPI}/user`, null, token);
  }

  updateUserData(data) {
    return this.sendRequest(
      `${this.baseAPI}/user`,
      { user: data },
      this.userToken,
      "put"
    );
  }

  createArticle(data, token) {
    return this.sendRequest(
      `${this.baseAPI}/articles`,
      {
        article: data,
      },
      token,
      "post"
    );
  }

  addToFovorite = (slug, token) => {
    return this.sendRequest(
      `${this.baseAPI}/articles/${slug}/favorite`,
      null,
      token,
      "post"
    );
  };

  removeFromFovorite(slug, token) {
    return this.sendRequest(
      `${this.baseAPI}/articles/${slug}/favorite`,
      null,
      token,
      "delete"
    );
  }

  updateArticle = (data, slug, token) => {
    return this.sendRequest(
      `${this.baseAPI}/articles/${slug}`,
      { article: data },
      token,
      "put"
    );
  };

  deleteArticle = (slug, token) => {
    return this.sendRequest(
      `${this.baseAPI}/articles/${slug}`,
      null,
      token,
      "delete"
    );
  };
}

export default new FetchApiService();
