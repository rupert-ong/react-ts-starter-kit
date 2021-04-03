import { useState } from 'react';
import styles from './counter.module.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        className={styles.button}
        onClick={() => setCount((prevState) => prevState + 1)}
      >
        Count {count}
      </button>
    </div>
  );
};

export default Counter;
