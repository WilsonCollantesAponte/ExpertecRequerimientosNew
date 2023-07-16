import imagen from "../assets/img/equipo.jpg";
import "../assets/css/componentes/sobre.css";
const Sobre = () => {
    return (
        <main>
            <div className="container">
                <h2 className="title-page">Sobre Expertec</h2>
            </div>
            <section className="container flex flex--center flex--column">
                <article className="card">
                    Somos una empresa especializada en el desarrollo de
                    herramientas informáticas con amplia experiencia en sistemas
                    tributarios, contables y de facturación electrónica.
                </article>
                <img
                    className="equipo-image"
                    src={imagen}
                    alt="equipo de trabajo"
                />
            </section>
        </main>
    );
};

export default Sobre;
