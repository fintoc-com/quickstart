import { useState, useEffect } from 'react';
import './MovementList.css';
import { formatAmount, formatDate } from '../../helpers/utils';

function MovementList(props) {
  const [movements, setMovements] = useState([]);
  useEffect(() => {
    fetch(`/api/accounts/${props.accountId}/movements?linkId=${props.linkId}`)
      .then((res) => res.json())
      .then((data) => {
        setMovements(data);
      });
  }, []);

  const handleBack = () => {
    props.setAccountId('');
  };

  return (
    <div className="MovementList">
        <button onClick={handleBack}>Atrás</button>
        <h2>Movimientos de la cuenta</h2>
        <table>
          <thead>
            <tr>
              <td>Fecha contable</td>
              <td>Monto</td>
              <td>Descripción</td>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.id}>
                <td>{formatDate(movement.postDate)}</td>
                <td>{movement.currency} {formatAmount(movement.amount)}</td>
                <td>{movement.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default MovementList;
