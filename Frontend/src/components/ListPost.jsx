import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { typeFilter } from "../redux/actions/actions";
import m from "../assets/css/componentes/ListPost.module.css";

const ListPost = () => {
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState("");
  const [posts, setPosts] = useState([]);
  const [postsSupport, setPostsSupport] = useState([]);

  const { actualUser, typeFilterVal } = useSelector((state) => state);
  const { administrador, desarrollador, cliente, id } = actualUser;

  useEffect(() => {
    if (!administrador) {
      axios(`http://localhost:3001/user?id=${id}`).then(({ data }) => {
        if (typeFilterVal !== "ninguno") {
          setPostsSupport(data.Requirements);
          const filterBy = data.Requirements.filter(
            (val) => val.prioridad === typeFilterVal
          );
          setPosts(filterBy);
        } else {
          setPostsSupport(data.Requirements);
          setPosts(data.Requirements);
        }
      });
    } else {
      axios(`http://localhost:3001/requirement`).then(({ data }) => {
        if (typeFilterVal !== "ninguno") {
          setPostsSupport(data);
          const filterBy = data.filter(
            (val) => val.prioridad === typeFilterVal
          );
          setPosts(filterBy);
        } else {
          setPostsSupport(data);
          setPosts(data);
        }
      });
    }
  }, [toggle]);

  function handleToggle(event) {
    const id = event.target.value;

    axios.put(`http://localhost:3001/requirement`, { id }).then(() => {
      setToggle(id + Date.now());
    });
  }

  function handleToggleAdmin(event) {
    const id = event.target.value;

    axios.put(`http://localhost:3001/requirementAdmin`, { id }).then(() => {
      setToggle(id + Date.now());
    });
  }

  function handleFilter(event) {
    const { name } = event.target;
    dispatch(typeFilter(name));
    const filterBy = postsSupport.filter((val) => val.prioridad === name);

    setPosts(filterBy);
  }

  // console.log(posts);
  console.log(typeFilterVal, toggle);

  return (
    <div className="posts container">
      <ul
        // className="category-list container flex"
        className={m.ulMain}
      >
        <button
          className={`category-list__category category-list__category--Alta`}
          name="Alta"
          onClick={handleFilter}
        >
          Alta
        </button>
        <button
          className={`category-list__category category-list__category--Media`}
          name="Media"
          onClick={handleFilter}
        >
          Media
        </button>
      </ul>

      {posts?.map((post) => {
        const {
          id,
          title,
          descripcion,
          prioridad,
          estadoFinalAdmin,
          estadoFinalDev,
        } = post;
        return (
          <div className={`post__card post-card--${prioridad}`} key={id}>
            <Link to={`/posts/${id}`}>
              <article>
                <h3 className="post-card__title">{title}</h3>
                <p className={m.p}>{descripcion}</p>
              </article>
            </Link>

            {(administrador || desarrollador) && (
              <div>
                {estadoFinalDev ? (
                  <button value={id} onClick={handleToggle}>
                    Desarrollador ✅
                  </button>
                ) : (
                  <button value={id} onClick={handleToggle}>
                    Desarrollador ❌
                  </button>
                )}
              </div>
            )}

            {administrador && (
              <div>
                {estadoFinalAdmin ? (
                  <button value={id} onClick={handleToggleAdmin}>
                    Administrador ✅
                  </button>
                ) : (
                  <button value={id} onClick={handleToggleAdmin}>
                    Administrador ❌
                  </button>
                )}
              </div>
            )}

            {cliente && (
              <div>
                {estadoFinalAdmin && estadoFinalDev ? (
                  <div value={id}>Terminado ✅</div>
                ) : (
                  <div value={id}>Pendiente ❓</div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ListPost;
