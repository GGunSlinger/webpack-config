import React, { useState } from "react";
import style from "../styles/index.module.scss";
import image from "../images/Screenshot.png";

function App(): JSX.Element {
  const [count, setCount] = useState(1);

  console.log(count);

  return (
    <div className={style.main}>
      <h1>{count}</h1>
      <img src={image} alt="" width="250" />
      <button onClick={() => setCount((value) => value + 1)}>click</button>
    </div>
  );
}

export default App;
