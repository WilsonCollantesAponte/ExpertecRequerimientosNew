import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/componentes/card.css";
import m from "../assets/css/componentes/UserDetail.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [securityDelete, setSecurityDelete] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios(`http://localhost:3001/user?id=${id}`).then(({ data }) => {
      setDetail(data);
    });
  }, [id]);

  function handleDelete() {
    const { id, email } = detail;

    if (!id || !email)
      return alert(
        `No se puede eliminar por que falta el 'email' o el 'identificador' del usuario`
      );

    console.log(id, email);
    axios
      .delete(`http://localhost:3001/user?id=${id}&email=${email}`)
      .then(({ data }) => {
        alert(`${data.email} ha sido borrado`);
        navigate("/");
      });
    // alert(`Eliminado`);
  }

  function handleSecurityDelete() {
    setSecurityDelete(!securityDelete);
  }

  console.log(detail);
  return (
    <div className={m.div2}>
      <main
        // className="container flex flex--center"
        className={m.main}
      >
        <div className={m.div2}>
          <div className={m.divD}>Detalle</div>
          <article className="card post">
            <h2 className={m.p}>Nombre(s): {detail.nombres}</h2>
            <p className={m.p}>Apellido: {detail.apellidos}</p>
            <p className={m.p}>Email: {detail.email}</p>
            <p className={m.p}>Teléfono: {detail.telefono}</p>
            <p className={m.p}>Empresa: {detail.empresa}</p>
            <p className={m.p}>Password: {detail.password}</p>
            {detail.desarrollador && (
              <p className={m.p}>categoria: Desarrollador</p>
            )}
            {detail.cliente && <p className={m.p}>categoria: Cliente</p>}
          </article>
        </div>

        {detail.id ? (
          <p className={m.pDelete}>
            {securityDelete ? (
              <button onClick={handleSecurityDelete} className={m.delete}>
                Eliminar usuario
              </button>
            ) : (
              <div className={m.secondDelete}>
                <p>
                  Esto eliminara también los requerimientos relacionados a él
                </p>

                <span>
                  <button onClick={handleDelete} className={m.confirmDelete}>
                    Eliminar
                  </button>
                  <button
                    onClick={handleSecurityDelete}
                    className={m.cancelDelete}
                  >
                    Cancelar
                  </button>
                </span>
              </div>
            )}
          </p>
        ) : null}
      </main>
    </div>
  );
}
