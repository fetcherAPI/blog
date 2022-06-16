import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import { Articles } from "./Articles/index";
import RouteService from "../services/routeService";
import SingUp from "../pages/sign/signUp";
import SingIn from "../pages/sign/singIn";
import Profile from "../pages/profile/Profile";
import CreateArticle from "../pages/article/createArticle";
import ArticleDetails from "./Articles/ArticleDetails";
import { useSelector } from "react-redux";
import UpdateArticle from "../pages/article/updateArticle";

function App() {
  const isAuth = useSelector((state) => state.authSlice.isAuth);

  return (
    <div className='App'>
      <Header />
      {isAuth ? (
        <Routes>
          <Route path={RouteService.mainRoute} element={<Articles />} />
          <Route
            path={RouteService.articlesRoute}
            element={<Articles />}
            exact
          />
          <Route
            path={RouteService.articleRoute}
            element={<ArticleDetails />}
            exact
          />
          <Route path={RouteService.signUpRoute} element={<SingUp />} />

          <Route path={RouteService.profileRouter} element={<Profile />} />
          <Route
            path={RouteService.createArticleRout}
            element={<CreateArticle />}
          />
          <Route
            path={`articles/:slug/articles/:slug/edit/`}
            element={<UpdateArticle />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route
            path={RouteService.articlesRoute}
            element={<Articles />}
            exact
          />
          <Route
            path={RouteService.articleRoute}
            element={<ArticleDetails />}
          />
          <Route path={RouteService.mainRoute} element={<Articles />} />
          <Route path={RouteService.signInRoute} element={<SingIn />} />
          <Route path={RouteService.signUpRoute} element={<SingUp />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
