import ListPost from "../components/ListPost";
import m from "../assets/css/componentes/Home.module.css";

const Home = () => {
  return (
    <main>
      <div className="container">
        <h2 className="title-page">Lista Requerimientos</h2>
      </div>

      <div className={m.main}>
        <ListPost />
      </div>
    </main>
  );
};

export default Home;
