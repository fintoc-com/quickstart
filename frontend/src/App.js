import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AccountList from './Components/AccountList/AccountList';
import ConnectLink from './Components/ConnectLink/ConnectLink';
import MovementList from './Components/MovementList/MovementList';

function App() {
  const [linkId, setLinkId] = useState('');
  const [accountId, setAccountId] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {!linkId && <ConnectLink setLinkId={setLinkId} />}
      {linkId && !accountId && <AccountList linkId={linkId} setAccountId={setAccountId} />}
      {linkId && accountId
        && <MovementList linkId={linkId} accountId={accountId} setAccountId={setAccountId} />}

    </div>
  );
}

export default App;
