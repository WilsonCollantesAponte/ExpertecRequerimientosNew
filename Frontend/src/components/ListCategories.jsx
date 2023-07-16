// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { buscar } from "../api/api";
import "../assets/css/blog.css";
import data from "../data";

const ListCategories = () => {
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //     buscar(`/categorias`, setCategories);
  // }, []);

  const { categorias } = data;

  return (
    <div>
      {/* <button
        className={`category-list__category category-list__category--Alta`}
      >
        Alta
      </button>

      <button
        className={`category-list__category category-list__category--Media`}
      >
        Media
      </button>

      <h1>Vattesl</h1> */}

      <ul className="category-list container flex">
        {categorias.map((category) => (
          <Link to={`/categoria/${category.id}`} key={category.id}>
            <li
              className={`category-list__category category-list__category--${category.id}`}
            >
              {category.nombre}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ListCategories;
