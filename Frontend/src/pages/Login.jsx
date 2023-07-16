import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import s from "../assets/css/componentes/Form.module.css";
import { Validations } from "../assets/validations";
import axios from "axios";
import { access, defActualUser } from "../redux/actions/actions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const entry = useSelector((state) => state.access);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });

    setErrors(
      Validations({
        ...userData,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { email, password } = userData;
    axios(
      `http://localhost:3001/loginUser?email=${email}&password=${password}`
    ).then(({ data }) => {
      if (!data.status) return alert("El usuario no exise");
      dispatch(defActualUser(data.userFind));
      dispatch(access());
      navigate("/");
      console.log(entry);
    });
  }

  return (
    <form className={s.p} onSubmit={handleSubmit}>
      <label className={s.labelX}>Email: </label>
      <input
        className={s.input}
        type="text"
        name="email"
        onChange={handleChange}
      />
      <br />
      {errors.email ? <span className={s.errors}>{errors.email}</span> : null}

      <br />
      <br />

      <label className={s.labelX}>Password: </label>
      <input
        className={s.input}
        type="text"
        name="password"
        onChange={handleChange}
      />
      <br />
      {errors.password ? (
        <span className={s.errors}>{errors.password}</span>
      ) : null}

      <br />
      <br />

      <button
        className={s.button}
        type="submit"
        disabled={
          !userData.email ||
          !userData.password ||
          errors.email ||
          errors.password
        }
      >
        Ingresar
      </button>
    </form>
  );
};

export default Login;
