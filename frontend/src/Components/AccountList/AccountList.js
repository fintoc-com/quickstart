import { useState, useEffect } from 'react';
import { formatAmount } from '../../helpers/utils';

function AccountList(props) {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    const response = await fetch(`/api/accounts?linkId=${props.linkId}`);
    const data = await response.json();
    if (response.ok) {
      setAccounts(data);
      setError(false);
    } else {
      setError(data.message);
    }
    setIsLoading(false);
  }, []);

  const handleButtonClick = (event) => {
    props.setAccountId(event.target.getAttribute('account-id'));
  };

  const handleReconnect = () => {
    props.setLinkId('');
  };

  return (
    <div className="container mt-3 mx-auto">
      <h2 className="text-2xl font-semibold leading-tight">Balance de tus cuentas</h2>
      {error && (
          <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p class="font-bold">Error</p>
            <p>{error || 'Se produjo un error'}</p>
            <button onClick={handleReconnect} className="bg-transparent hover:bg-red-800 font-semibold hover:text-white mt-2 py-2 px-4 border border-red-500 hover:border-transparent rounded">Reconectar</button>
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
                  >Tipo de cuenta</th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >Nombre</th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >Saldo disponible</th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >Saldo contable</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Ver movimientos</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!isLoading && accounts.map((account) => (
                  <tr key={account.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{account.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{account.holderName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{account.currency} {formatAmount(account.balance.available)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{account.currency} {formatAmount(account.balance.current)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={handleButtonClick} account-id={account.id} className="text-fintocBlue hover:text-darkBlue">
                        Ver movimientos
                      </button>
                    </td>
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

export default AccountList;
