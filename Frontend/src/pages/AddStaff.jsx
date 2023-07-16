import { useState } from "react";
import m from "../assets/css/componentes/AddStaff.module.css";
import axios from "axios";

export default function AddStaff() {
  const [data, setData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    empresa: "",
    password: "",
  });

  const [access, SetAccess] = useState("");

  function handleChanges(event) {
    const { name, value } = event.target;

    if (name === "nombres") setData({ ...data, [name]: value });
    if (name === "apellidos") setData({ ...data, [name]: value });
    if (name === "email") setData({ ...data, [name]: value });
    if (name === "telefono") setData({ ...data, [name]: value });
    if (name === "empresa") setData({ ...data, [name]: value });
    if (name === "password") setData({ ...data, [name]: value });
    if (name === "acceso") SetAccess(value);

    // setData({ ...data, [name]: value });  usar esta al terminar el desarrollo.
    // La anterior forma es para identificar erroes en específico
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (
      !data.nombres ||
      !data.apellidos ||
      !data.email ||
      !data.telefono ||
      !data.empresa ||
      !data.password ||
      !access
    ) {
      return alert("No deben haber campos vacios");
    }

    const toSend = { ...data, telefono: +data.telefono, [access]: true };

    axios(`http://localhost:3001/findUser?email=${data.email}`).then(
      ({ data }) => {
        if (!data.status) {
          axios
            .post("http://localhost:3001/newUser", toSend)
            .then(({ data }) => {
              alert("Nuevo registro guardado");
            });
        } else {
          alert("Este usuaio ya existe");
        }
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className={m.form}>
      <div className={m.mainDiv}>
        <label htmlFor="">Nombres</label>
        <input
          className={m.input}
          type="text"
          name="nombres"
          value={data.nombres}
          minLength="3"
          onChange={handleChanges}
        />

        <label htmlFor="">Apellidos</label>
        <input
          className={m.input}
          type="text"
          name="apellidos"
          value={data.apellidos}
          minLength="5"
          onChange={handleChanges}
        />

        <label htmlFor="">Email</label>
        <input
          className={m.input}
          type="email"
          name="email"
          value={data.email}
          onChange={handleChanges}
        />

        <label htmlFor="">Teléfono</label>
        <input
          className={m.input}
          type="number"
          name="telefono"
          value={data.telefono}
          minLength="6"
          onChange={handleChanges}
        />

        <label htmlFor="">Empresa</label>
        <input
          className={m.input}
          type="text"
          name="empresa"
          value={data.empresa}
          minLength="3"
          onChange={handleChanges}
        />

        <label htmlFor="">Password</label>
        <input
          className={m.input}
          type="text"
          name="password"
          value={data.password}
          minLength="5"
          onChange={handleChanges}
        />

        <div className={m.typeUsers}>
          <label>Administrador</label>
          <input
            className={m.radio}
            type="radio"
            name="acceso"
            value="administrador"
            onChange={handleChanges}
          />

          <label>Desarrollador</label>
          <input
            className={m.radio}
            type="radio"
            name="acceso"
            value="desarrollador"
            onChange={handleChanges}
          />

          <label>Cliente</label>
          <input
            className={m.radio}
            type="radio"
            name="acceso"
            value="cliente"
            onChange={handleChanges}
          />
        </div>

        <button className={m.button}>Send</button>
      </div>
    </form>
  );
}
