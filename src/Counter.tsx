import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((prevState) => prevState + 1)}>
        Count {count}
      </button>
    </div>
  );
};

export default Counter;
