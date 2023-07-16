import image from "../assets/img/expertc404.png";
import "../assets/css/404.css";
const Page404 = () => {
    return (
        <main className="container flex flex--center flex--column">
            <img className="error-image" src={image} alt="Error404" />
            <p className="notfound-text">Esta pagina no existe</p>
        </main>
    );
};

export default Page404;
