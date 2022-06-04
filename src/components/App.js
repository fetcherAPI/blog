import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import { Articles, Article } from "./Articles/index";
import RouteService from "../services/routeService";
import SingUp from "../pages/sign/signUp";
import SingIn from "../pages/sign/singIn";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path={RouteService.mainRoute} element={<Articles />} />
        <Route path={RouteService.articlesRoute} element={<Articles />} exact />
        <Route path={RouteService.articleRoute} element={<Article />} />
        <Route path={RouteService.signUpRoute} element={<SingUp />} />
        <Route path={RouteService.signInRoute} element={<SingIn />} />
      </Routes>
    </div>
  );
}

export default App;
