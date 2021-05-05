import { useState, useEffect } from 'react';
import './AccountList.css';

function AccountList() {
  const [movements, setMovements] = useState([]);
  useEffect(async () => {
    // When component mounts
    const response = await fetch('/api/movements');
    const data = await response.json();
    setMovements(data);
  }, []);

  return (
    <div className="AccountList">
      <h2>Balance:</h2>
      <h2>Movimientos</h2>
      <ul>
        {movements.map((movement) => (
          <li key={movement.id}>{movement.type === 'outbound' ? '-' : ''}{movement.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default AccountList;
