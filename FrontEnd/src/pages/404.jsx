import { Link } from "./components/Links";

export default function Page404() {
    return (
        <div className="page-404">
            <h1>This is fine... But... 404</h1>
            <img src="https://midu.dev/images/this-is-fine-404.gif" alt="This is fine" />
            <p>Lo siento, la página que estás buscando no se pudo encontrar.</p>
            <button><Link to="/">Volver al inicio</Link></button>
        </div>
    );
}
