import { useState, useEffect } from 'react';
import './AccountList.css';
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
    <div className="AccountList">
      <h2>Balance de tus cuentas</h2>
      {isLoading && <p>Cargando...</p>}
      {!isLoading && error && (
        <div>
          <p>{error}</p>
          <button onClick={handleReconnect}>Reconectar</button>
        </div>
      )}
      {!isLoading && !error
        && (
          <table>
            <thead>
              <tr>
                <td>Tipo de cuenta</td>
                <td>Nombre</td>
                <td>Saldo disponible</td>
                <td>Saldo contable</td>
                <td>Ver movimientos</td>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.name}</td>
                  <td>{account.holderName}</td>
                  <td>{account.currency} {formatAmount(account.balance.available)}</td>
                  <td>{account.currency} {formatAmount(account.balance.current)}</td>
                  <td>
                    <button onClick={handleButtonClick} account-id={account.id}>Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
}

export default AccountList;
