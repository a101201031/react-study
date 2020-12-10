import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);
  const onIncrease = () => {
    // 최적화와 관련이 있다는데...
    setNumber((prevNum) => prevNum + 1);
  };
  const onDecrease = () => {
    setNumber((prevNum) => prevNum - 1);
  };
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
