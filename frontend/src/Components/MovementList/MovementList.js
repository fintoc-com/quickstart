import { useState, useEffect } from 'react';
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
    <div className="container mt-3 mx-auto">
        <button onClick={handleBack} className="text-fintocBlue">Atrás</button>
        <h2 className="text-2xl font-semibold leading-tight">Movimientos de la cuenta</h2>
        {error && (
          <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p class="font-bold">Error</p>
            <p>{error || 'Se produjo un error'}</p>
          </div>
        )}
        {!error
          && (
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-3">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Fecha contable</th>
                    <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Monto</th>
                    <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Descripción</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!isLoading && movements.map((movement) => (
                    <tr key={movement.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{formatDate(movement.postDate)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{movement.currency} {formatAmount(movement.amount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{movement.description}</td>
                    </tr>
                  ))}
                  {isLoading && (
                    <tr className="animate-pulse">
                      <td className="h-4 bg-gray-200 mt-3 mb-6"></td>
                      <td className="h-4 bg-gray-200 mt-3 mb-6"></td>
                      <td className="h-4 bg-gray-200 mt-3 mb-6"></td>
                      <td className="h-4 bg-gray-200 mt-3 mb-6"></td>
                      <td className="h-4 bg-gray-200 mt-3 mb-6"></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
      </div>
  );
}

export default MovementList;
