class FetchApiService {
  constructor() {
    this.baseAPI = "https://api.realworld.io/api";

    this.artilesPerPage = 5;
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
}

export default FetchApiService;
