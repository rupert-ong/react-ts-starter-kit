import { useEffect } from "react";

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
    test().then((response) => console.log(response));
  }, []);
  return <h1>React TypeScript Starter Kit</h1>;
};

export default App;
