import { getCookie } from "react-use-cookie";

class FetchApiService {
  constructor() {
    this.baseAPI = "https://kata.academy:8021/api";
    this.artilesPerPage = 10;
    this.userToken = getCookie("Token");
  }

  async sendRequest(url, value, token) {
    console.log(this.userToken);
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
    console.log(data, this.userToken);
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
    return this.sendRequest(`${this.baseAPI}/users/login`, {
      user: data,
    });
  }

  getCurrentUser() {
    return this.sendRequest(`${this.baseAPI}/user`, null, this.userToken);
  }
}

export default new FetchApiService();
