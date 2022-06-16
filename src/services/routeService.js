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

  get updateArticleRout() {
    return `/articles/:slug/edit/`;
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
