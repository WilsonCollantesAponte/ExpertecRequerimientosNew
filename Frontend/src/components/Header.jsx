import { Link, useNavigate } from "react-router-dom";
import image from "../assets/img/logo-expertec.png";
import "../assets/css/componentes/header.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/actions/actions";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { administrador, desarrollador, cliente } = useSelector(
    (state) => state.actualUser
  );

  function handleLogOut() {
    dispatch(logOut);
    navigate("/login");
  }

  return (
    <header className="header container">
      <div className="menu-hamburguer">
        <span className="menu-hamburguer__icon"></span>
      </div>

      <div className="header-container">
        <Link to="/" className="flex flex--center">
          <img className="header__logo" src={image} alt="expert" />
          <h1 className="header__title">EXPERTEC Requerimientos</h1>
        </Link>
      </div>

      <nav className="menu-header">
        <ul className="menu-items">
          {administrador && (
            <li>
              <Link
                className="menu-item menu-item--entrar"
                to={`/PostRequirement`}
              >
                Nuevo Requerimiento
              </Link>
            </li>
          )}
          {administrador && (
            <li>
              <Link className="menu-item menu-item--entrar" to={`/addStaff`}>
                Agregar persona
              </Link>
            </li>
          )}
          {administrador && (
            <li>
              <Link className="menu-item" to="/Users/Desarrolladores">
                Desarrolladores
              </Link>
            </li>
          )}
          {administrador && (
            <li>
              <Link className="menu-item" to="/Users/Clientes">
                Clientes
              </Link>
            </li>
          )}
          {(administrador || desarrollador || cliente) && (
            <li>
              <Link className="menu-item" to="/">
                Listas
              </Link>
            </li>
          )}
          {(administrador || desarrollador || cliente) && (
            <li>
              <Link className="menu-item" to="/sobre">
                Sobre
              </Link>
            </li>
          )}

          {(administrador || desarrollador || cliente) && (
            <li>
              <button className="menu-item" onClick={handleLogOut}>
                Salir
              </button>
            </li>
          )}
        </ul>
      </nav>

      <div className="menu-header-background"></div>
    </header>
  );
};

export default Header;
