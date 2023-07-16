import m from "../assets/css/componentes/User.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const { type } = useParams();

  useEffect(() => {
    if (type === "Desarrolladores")
      axios(`http://localhost:3001/allDev`).then(({ data }) => setUsers(data));

    if (type === "Clientes")
      axios(`http://localhost:3001/allClients`).then(({ data }) =>
        setUsers(data)
      );
  }, [type]);

  function handleSearch(event) {
    const { value, name } = event.target;

    if (type === "Clientes" && name === "buttonSearch") {
      axios(`http://localhost:3001/allClients?name=${search}`).then(
        ({ data }) => {
          // console.log(data);
          const { customersFound } = data;
          setUsers(customersFound);
        }
      );
    }
    if (type === "Desarrolladores" && name === "buttonSearch") {
      axios(`http://localhost:3001/allDev?name=${search}`).then(({ data }) => {
        console.log(data);
        const { devsFind } = data;
        setUsers(devsFind);
      });
    }

    setSearch(value);
  }

  return (
    <div className={m.mainDiv}>
      <div className={m.search}>
        <input type="search" value={search} onChange={handleSearch} />
        <button
          className={m.buttonSearch}
          value={search}
          name="buttonSearch"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>

      <section className="posts container">
        {users?.map((users) => {
          const { id, nombres, apellidos } = users;
          return (
            <Link to={`/UsersDetail/${id}`} className={`post__card`} key={id}>
              <article>
                <h3 className="post-card__title">{nombres}</h3>
                <p className="post-card__meta">{apellidos}</p>
              </article>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
