const navEvent = 'pushState';

export function navigate(href) {
  window.history.pushState({}, '', href);
  // Crear un evento personalizado
  const navigationEvent = new Event(navEvent);
  window.dispatchEvent(navigationEvent);
}

export function Link({ to, target, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === 0;
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
    const isManageableEvent = target === undefined || target === '_self';
    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault(); // Prevenir la acción predeterminada del enlace
      navigate(to);
    }
  };

  return <a href={to} onClick={handleClick} target={target} {...props} />;
}
