import "./assets/css/base/base.css";
import "./assets/css/componentes/card.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Page404 from "./pages/Page404";
import Header from "./components/Header";
import Post from "./pages/Post";
import Categoria from "./pages/Categoria";
import Login from "./pages/Login";
import PostRequirement from "./pages/PostRequirement";
import AddStaff from "./pages/AddStaff";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const { acces } = useSelector((state) => state);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    !acces && navigate("/login");
  }, [acces]);

  console.log(pathname);

  return (
    <div className="App">
      {pathname !== "/login" && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/posts/:id" element={<Post />} /> //requerimientos
        <Route path="/categoria/:id/" element={<Categoria />} /> // prioridad
        <Route path="*" element={<Page404 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/PostRequirement" element={<PostRequirement />} />
        <Route path="/addStaff" element={<AddStaff />} />
        <Route path="/Users/:type" element={<Users />} />
        <Route path="/UsersDetail/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
}

export default App;
