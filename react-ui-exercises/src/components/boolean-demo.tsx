import React, { useState } from 'react';
import { useBoolean } from '../great-frontend-list';

export default function BooleanDemo() {
  const { value, setTrue, setFalse, toggle } = useBoolean(false);
  const [_, forceUpdate] = useState({});
  
  // Function to force re-render
  const triggerRerender = () => forceUpdate({});
  console.log("🚀 ~ BooleanDemo ~ value:", value)
  
  return (
    <div>
      <p>Current value: {value.toString()}</p>
      <button onClick={setTrue}>Set True</button>
      <button onClick={setFalse}>Set False</button>
      <button onClick={toggle}>Toggle</button>
      <button onClick={triggerRerender}>Trigger Rerender</button>
    </div>
  );
}
