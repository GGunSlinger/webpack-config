import React, { useState } from "react";
import "../styles/index.scss";
import image from "../images/Screenshot.png";

function App(): JSX.Element {
  const [count, setCount] = useState(1);

  return (
    <div>
      <h1>{count}</h1>
      <img src={image} alt="" width="250" />
      <button onClick={() => setCount((value) => value + 1)}>click</button>
    </div>
  );
}

export default App;
