// EventComponent.jsx
import React from 'react';

const EventComponent = ({ event }) => {
    return (
        <div>
            <p>{event.title}</p>
            {/* Otros detalles del evento */}
        </div>
    );
};

export default EventComponent;
