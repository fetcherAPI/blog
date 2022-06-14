class RoutService {
  get mainRoute() {
    return `/`;
  }

  get articlesRoute() {
    return `/articles`;
  }

  get articleRoute() {
    return `/articles/:slug`;
  }

  get signInRoute() {
    return `/sign-in`;
  }

  get signUpRoute() {
    return `/sign-up`;
  }
  get profileRouter() {
    return `/profile`;
  }

  get createArticleRout() {
    return `/create-article`;
  }
}

export default new RoutService();
