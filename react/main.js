import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Calculator from './calculator/src/Calculator.js';
import TicTacToe from './tic-tac-toe/src/TicTacToe.js';

function App() {
  const [currentApp, setCurrentApp] = useState(null);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setCurrentApp('calculator')}>Calculator</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setCurrentApp('tic')}>Tic Tac Toe</button>
      </div>

      <div className="border p-4 rounded shadow">
        {currentApp === 'calculator' && <Calculator />}
        {currentApp === 'tic' && <TicTacToe />}
        {!currentApp && <p>Válassz egy alkalmazást a fenti menüből.</p>}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
