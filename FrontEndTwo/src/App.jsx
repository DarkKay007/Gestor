import routes from "./routes/path"
import { Router } from "./routes/routes"
import React from 'react';

const App = () => {

  return (
    <>
    
  <Router routes={routes}  />
    </>
  )
}

export default App
