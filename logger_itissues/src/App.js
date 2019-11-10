import React , { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
//Needs To Be Initialized
import M from 'materialize-css/dist/js/materialize.min.js';

function App() {
  useEffect( () => {
    M.AutoInit();
  })
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
