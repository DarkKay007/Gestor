import routes from "./routes/path"
import { Router } from "./routes/routes"
import React from 'react';
function App() {

  return (
    <>
  <Router routes={routes}  />
    </>
  )
}

export default App
