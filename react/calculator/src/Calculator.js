import React, { useState } from 'react';

export default function Calculator() {
  const [result, setResult] = useState(0);
  const [input, setInput] = useState('');

  const handleCalculate = () => {
    try {
      setResult(eval(input));
    } catch {
      setResult('Hiba');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Calculator</h2>
      <input
        className="border p-1 mr-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Pl: 1+2*3"
      />
      <button onClick={handleCalculate} className="bg-blue-500 text-white px-2 py-1 rounded">=</button>
      <p className="mt-2">Eredmény: {result}</p>
    </div>
  );
}
