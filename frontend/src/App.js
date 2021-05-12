import { useState } from 'react';
import logo from './imagotipo.svg';
import AccountList from './Components/AccountList/AccountList';
import ConnectLink from './Components/ConnectLink/ConnectLink';
import MovementList from './Components/MovementList/MovementList';

function App() {
  const [linkId, setLinkId] = useState('');
  const [accountId, setAccountId] = useState('');
  return (
    <div className="container relative bg-white mx-auto">
      <header className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <a href="http://www.fintoc.com" target="_blank">
          <img src={logo} alt="logo" className="pl-3"/>
        </a>
      </header>
      {!linkId && <ConnectLink setLinkId={setLinkId} />}
      {linkId && !accountId
        && <AccountList linkId={linkId} setAccountId={setAccountId} setLinkId={setLinkId} />}
      {linkId && accountId
        && <MovementList linkId={linkId} accountId={accountId} setAccountId={setAccountId} />}

    </div>
  );
}

export default App;
