import { getCookie } from "react-use-cookie";

class FetchApiService {
  constructor() {
    this.baseAPI = "https://kata.academy:8021/api";
    this.artilesPerPage = 10;
    this.userToken = getCookie("Token");
  }

  async sendRequest(url, value, token) {
    console.log(this.userToken);
    const header = new Headers({
      "Content-Type": "application/json;charset=utf-8",
    });

    // if (token) header.append("Authorization", token);

    const sendData = value
      ? {
          method: "post",
          headers: header,
          body: JSON.stringify(value),
        }
      : {};
    try {
      const res = await fetch(url, sendData);
      console.log("res", res);
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
    console.log(data, this.usetToken);
    return this.sendRequest(`${this.baseAPI}/users/login`, {
      user: data,
    });
  }

  getCurrentUser() {
    return this.sendRequest(
      `${this.baseAPI}/user`,
      { name: "zha" },
      this.userToken
    );
  }
}

export default new FetchApiService();
