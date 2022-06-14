import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import { Articles } from "./Articles/index";
import RouteService from "../services/routeService";
import SingUp from "../pages/sign/signUp";
import SingIn from "../pages/sign/singIn";
import Profile from "../pages/profile/Profile";
import CreateArticle from "../pages/article/createArticle";
import ArticleDetails from "./Articles/ArticleDetails";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path={RouteService.mainRoute} element={<Articles />} />
        <Route path={RouteService.articlesRoute} element={<Articles />} exact />
        <Route path={RouteService.articleRoute} element={<ArticleDetails />} />
        <Route path={RouteService.signUpRoute} element={<SingUp />} />
        <Route path={RouteService.signInRoute} element={<SingIn />} />
        <Route path={RouteService.profileRouter} element={<Profile />} />
        <Route
          path={RouteService.createArticleRout}
          element={<CreateArticle />}
        />
      </Routes>
    </div>
  );
}

export default App;
