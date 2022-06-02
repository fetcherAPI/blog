import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import { Articles, Article } from "./Articles/index";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path={"/"} element={<Articles />} />
        <Route path={"/articles"} element={<Articles />} />
        <Route path={"/articles/:slug"} element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;
