import  {Link} from '../Links'
export default function HomePage () {
    return(
      <>
        <div className="presentation-page">
            <header>
                <h1>Bienvenido a nuestra página</h1>
                <nav>
                    <ul>
                       <li><Link to={'/about'}>Acerca De Nosotros</Link></li>
                       <Link to="/login">Sing-In</Link>
                        {/* Agrega más elementos de navegación según sea necesario */}
                    </ul>
                </nav>
            </header>
            <main>
                <section className="main-section">
                    <h2>¡Descubre lo que ofrecemos!</h2>
                    <p>Texto introductorio sobre los servicios o productos ofrecidos en la página de inicio.</p>
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