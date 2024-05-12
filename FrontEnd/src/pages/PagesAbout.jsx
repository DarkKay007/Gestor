import { Link } from "./components/Links"
import { FaHome } from "react-icons/fa";
export default function AboutPage () {
    return(
    <>
         <div className="about-page">
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
                    <h2>Nuestra Historia</h2>
                    <p>Breve descripción sobre la historia de la empresa o proyecto.</p>
                </section>
                {/* Agrega más secciones según sea necesario */}
            </main>
            <footer>
                <p>Derechos de autor &copy; 2024 - Todos los derechos reservados</p>
            </footer>
        </div>
    </>
    )
}