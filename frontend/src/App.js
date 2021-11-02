import { useState } from 'react';
import logo from './imagotipo.svg';
import ConnectLink from './Components/ConnectLink/ConnectLink';
import InvoiceList from './Components/InvoiceList/InvoiceList';

function App() {
  const [linkId, setLinkId] = useState('');
  return (
    <div className="container relative bg-white mx-auto">
      <header className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <a href="http://www.fintoc.com" target="_blank">
          <img src={logo} alt="logo" className="pl-3"/>
        </a>
      </header>
      {!linkId && <ConnectLink setLinkId={setLinkId} />}
      {linkId
        && <InvoiceList linkId={linkId} setLinkId={setLinkId} />}
    </div>
  );
}

export default App;
