import { useParams } from "react-router-dom";
// import "../assets/css/componentes/card.css";
import m from "../assets/css/Post.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Post = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [detailOther, setDetailOther] = useState({
    nameC: "",
    apellC: "",
    nameD: "",
    apellD: "",
  });

  const { administrador, desarrollador, cliente } = useSelector(
    ({ actualUser }) => actualUser
  );

  useEffect(() => {
    axios(`http://localhost:3001/requirement?id=${id}`).then(({ data }) => {
      setDetail(data);
      const [user1, user2] = data?.Users;

      if (user1?.desarrollador) {
        setDetailOther({
          nameD: user1?.nombres,
          apellD: user1?.apellidos,
          nameC: user2?.nombres,
          apellC: user2?.apellidos,
        });
      }
      if (user2?.desarrollador) {
        setDetailOther({
          nameD: user2?.nombres,
          apellD: user2?.apellidos,
          nameC: user1?.nombres,
          apellC: user1?.apellidos,
        });
      }
    });
  }, [id]);

  return (
    <main className="container flex flex--center">
      <div className="card post">
        <div className={m.div2}>
          <h1 className="post-card__title">{detail.title}</h1>
          <p className={m.p}>Descripcion: {detail.descripcion}</p>
          <p className={m.p}>
            Tipo de requerimiento: {detail.tipoRequerimiento}
          </p>
          <p className={m.p}>Plataforma: {detail.plataforma}</p>
          <p className={m.p}>Vista: {detail.vista}</p>
          <p className={m.p}>Interaccion: {detail.interaccion}</p>
          <p className={m.p}>Prioridad: {detail.prioridad}</p>
          <p className={m.p}>Email del cliente: {detail.emailCliente}</p>
          <p className={m.p}>Nombre(s) del cliente: {detailOther?.nameC}</p>
          <p className={m.p}>Apellidos(s) del cliente: {detailOther?.apellC}</p>

          {(administrador || desarrollador) && (
            <div>
              <p className={m.p}>
                Email del desarrollador: {detail.emailDesarrollador}
              </p>
              <p className={m.p}>
                Nombre(s) del desarrollador: {detailOther?.nameD}
              </p>
              <p className={m.p}>
                Apellidos(s) del desarrollador: {detailOther?.apellD}
              </p>
            </div>
          )}

          <p className={m.p}>Fecha de inicio: {detail.fechaInicio}</p>
          <p className={m.p}>fecha de fin: {detail.fechaFin}</p>
          <p className={m.p}>Tiempo estimado: {detail.tiempoEstimado}</p>

          {(administrador || desarrollador) && (
            <div>
              <p className={m.p}>
                {detail.estadoFinalDev ? (
                  <span>
                    El desarrollador ha terminado este requerimiento ✅
                  </span>
                ) : (
                  <span>
                    El desarrollador aún no ha terminado este requerimiento ❌
                  </span>
                )}
              </p>
              <p className={m.p}>
                {detail.estadoFinalAdmin ? (
                  <span>Aprobado por un administrador ✅</span>
                ) : (
                  <span>No ha sido aprobado por algún administrador ❌</span>
                )}
              </p>
            </div>
          )}

          {cliente && (
            <div>
              <p className={m.p}>
                {detail.estadoFinalAdmin && detail.estadoFinalDev ? (
                  <span>Terminado ✅</span>
                ) : (
                  <span>Pendiente ❓</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Post;
