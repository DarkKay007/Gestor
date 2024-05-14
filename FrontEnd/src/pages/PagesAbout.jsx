import { Link } from "./components/Links"
import { FaHome } from "react-icons/fa";
export default function AboutPage () {
    return(
    <>
         <div className="about-page">
         <div className="content-home">
            <header>
                <h1>Acerca de Nosotros</h1>
                <nav>
                    <ul>
                        <li><Link to="/"><FaHome />Home</Link></li>
                        {/* Agrega más elementos de navegación según sea necesario */}
                    </ul>
                </nav>
            </header>
            <main>
                <section className="about-section">
                    <h2>Descripción</h2>
                    <p>Proyecto para el proyecto final del sena</p>
                    <p>Realizado con React+Vite y nodeJs</p>
                </section>
                <br /><br />
                <br /><br />
            </main>
            <footer>
                <p>Derechos de autor &copy; 2024 - Todos los derechos reservados</p>
            </footer>
        </div>
        </div>
    </>
    )
}