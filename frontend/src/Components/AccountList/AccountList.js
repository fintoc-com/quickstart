import { useState, useEffect } from 'react';
import './AccountList.css';

function AccountList(props) {
  const [accounts, setAccounts] = useState([]);
  useEffect(async () => {
    // When component mounts
    const response = await fetch(`/api/accounts/${props.linkId}`);
    const data = await response.json();
    setAccounts(data);
  }, []);

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
          {this.state.accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.name}</td>
              <td>{account.holderName}</td>
              <td>{account.balance.available}</td>
              <td>{account.balance.current}</td>
              <td>
                <button>Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountList;
