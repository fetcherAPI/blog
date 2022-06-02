class FetchApiService {
  constructor() {
    this.baseAPI = "https://kata.academy:8021/api";

    this.artilesPerPage = 20;
  }

  async sendRequest(url, value) {
    const sendData = value
      ? {
          method: "post",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            value,
          }),
        }
      : {};
    try {
      const res = await fetch(url, sendData);
      return await res.json();
    } catch (error) {
      throw new Error(`fjksdljdlkfjkl`);
    }
  }
  getArticles() {
    return this.sendRequest(
      `${this.baseAPI}/articles?limit=${this.artilesPerPage}`
    );
  }
  getArticle(slug) {
    return this.sendRequest(`${this.baseAPI}/articles/${slug}`);
  }
}

export default FetchApiService;
