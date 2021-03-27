import "./style.css";
import { useEffect } from "react";
import Png from "./react-logo.png";
import Svg from "./react-logo.svg";
import Counter from "./Counter";

const obj = {
  name: "bob",
  age: 35,
};

const App = () => {
  useEffect(() => {
    function test() {
      return new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(true), 1000);
      });
    }

    console.log(Object.entries(obj));
    console.log(process.env.NAME);
    console.log(process.env.API_BASE_URL);
    console.log(process.env.ENV_ONLY);
    test().then((response) => console.log(response));
  }, []);
  return (
    <div id="app">
      <h1>React TypeScript Starter Kit - {process.env.NODE_ENV}</h1>
      <img src={Png} alt="React logo" width={300} />
      <img src={Svg} alt="React logo" width={300} />
      <Counter />
    </div>
  );
};

export default App;
