import React from 'react';
import { Button } from "flowbite-react";
import { Link } from 'react-router-dom';
export default function Page404() {
  return (
    <div className="contentPage404">
      <div className="page-404">
        <h1>This is fine... But... 404</h1>
        <img
          src="https://midu.dev/images/this-is-fine-404.gif"
          alt="This is fine"
        />
        <p>Lo siento, la página que estás buscando no se pudo encontrar.</p>
        <div className="Button404">
          <Button outline gradientDuoTone="pinkToOrange">
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
