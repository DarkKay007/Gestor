import { match } from 'path-to-regexp';
import { useState, useEffect } from "react";
import Page404 from "../404";

export function Router ({ routes = [], defaultComponent: DefaultComponent = Page404 }) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    
    useEffect(() => {  
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('pushState', onLocationChange);
        window.addEventListener('popstate', onLocationChange);
        
        return () => {
            window.removeEventListener('pushState', onLocationChange);
            window.removeEventListener('popstate', onLocationChange);
        };
    }, []);

    const matchedRoute = routes.find(({ path }) => {
        const matchUrl = match(path, { decode: decodeURIComponent });
        return matchUrl(currentPath);
    });

    const RenderComponent = matchedRoute ? matchedRoute.component : DefaultComponent;

    return <RenderComponent />;
}
