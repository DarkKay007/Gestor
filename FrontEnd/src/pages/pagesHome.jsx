import { Link } from "./components/Links"
import { FaQuestionCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import  "../styles/sidebar.css"
export default function HomePage () {
    return(
    <>
        <div className="presentation-page">
            <div className="content-home">
            <div className="icoHome"></div>
            <header>
                <h1>Bienvenido a nuestra página KuroGestor </h1>
                <nav>
                   
                        <Link to={'/about'      }><FaQuestionCircle />Acerca De Nosotros</Link>
                        <Link to={"/dashboard"  }><MdDashboard />dashboard </Link>
                    
                </nav>
            </header>
            <main>
            </main>
            </div>
        </div>
</>
    )
}