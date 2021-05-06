import { useState, useEffect } from 'react';
import './AccountList.css';
import { formatAmount } from '../../helpers/utils';

function AccountList(props) {
  const [accounts, setAccounts] = useState([]);
  useEffect(async () => {
    // When component mounts
    const response = await fetch(`/api/accounts?linkId=${props.linkId}`);
    const data = await response.json();
    setAccounts(data);
  }, []);

  const handleButtonClick = (event) => {
    props.setAccountId(event.target.getAttribute('account-id'));
  };

  return (
    <div className="AccountList">
      <h2>Balance de tus cuentas</h2>
      <table>
        <thead>
          <tr>
            <td>Tipo de cuenta</td>
            <td>Holder name</td>
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
              <td>{formatAmount(account.balance.available)}</td>
              <td>{formatAmount(account.balance.current)}</td>
              <td>
                <button onClick={handleButtonClick} account-id={account.id}>Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountList;
