import { useState, useEffect } from 'react';
import './MovementList.css';
import { formatAmount, formatDate } from '../../helpers/utils';

function MovementList(props) {
  const [movements, setMovements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    const response = await fetch(`/api/accounts/${props.accountId}/movements?linkId=${props.linkId}`);
    const data = await response.json();
    if (response.ok) {
      setMovements(data);
      setError(false);
    } else {
      setError(data.message);
    }
    setIsLoading(false);
  }, []);

  const handleBack = () => {
    props.setAccountId('');
  };

  return (
    <div className="MovementList">
        <button onClick={handleBack}>Atrás</button>
        <h2>Movimientos de la cuenta</h2>
        {isLoading && <p>Cargando...</p>}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && !error
          && (
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
          )}
      </div>
  );
}

export default MovementList;
