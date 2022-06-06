class FetchApiService {
  constructor() {
    this.baseAPI = "https://kata.academy:8021/api";
    this.artilesPerPage = 10;
  }

  async sendRequest(url, value) {
    const sendData = value
      ? {
          method: "post",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(value),
        }
      : {};
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
    console.log(data);
    return this.sendRequest(
      `${this.baseAPI}/users`,
      {
        user: data,
      },
      undefined,
      "post"
    );
  }
}

export default new FetchApiService();
