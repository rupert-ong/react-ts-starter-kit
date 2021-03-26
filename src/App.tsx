import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    function test() {
      return new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(true), 1000);
      });
    }

    test().then((response) => console.log(response));
  }, []);
  return <h1>React TypeScript Starter Kit</h1>;
};

export default App;
