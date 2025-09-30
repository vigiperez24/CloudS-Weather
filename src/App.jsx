import { useState, useEffect } from "react";
import AOS from "aos"; //
import "aos/dist/aos.css"; //
import Collection from "./components/Collection";

import "./App.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      <div>
        <Collection />
      </div>
    </>
  );
}

export default App;
