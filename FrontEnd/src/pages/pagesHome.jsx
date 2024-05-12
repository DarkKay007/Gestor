import { Link } from "./components/Links"
import { FaQuestionCircle } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import  "../styles/sidebar.css"
export default function HomePage () {
    return(
    <>
        <div className="presentation-page">
            <header>
                <h1>Bienvenido a nuestra página KuroGestor </h1>
                <nav>
                   
                        <Link to={'/about'      }><FaQuestionCircle />Acerca De Nosotros</Link>
                        <Link to={"/login"      }><RiLoginBoxFill />Sing-In   </Link>
                        <Link to={"/dashboard"  }><MdDashboard />dashboard </Link>
                    
                </nav>
            </header>
            <main>
                <section className="main-section">
                    <h2>¡Descubre lo que ofrecemos!</h2>
                    <p>Gestor de proyectos creado con NodeJs y React+Vite</p>
                </section>
                {/* Agrega más secciones según sea necesario */}
            </main>
        </div>
</>
    )
}