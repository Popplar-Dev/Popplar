import { useEffect } from 'react';
import './App.css';

import Map from './pages/Map'

function App() {

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
