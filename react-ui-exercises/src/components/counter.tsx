import React, { useState } from 'react'


const Counter = () => {
  const [count, setCount] = useState(0);


  return (
    <>
        <h2>Counter</h2>
        <button onClick={() => setCount(count => count + 1)}>
            {count}
        </button>
    </>
  )
}

export default Counter
