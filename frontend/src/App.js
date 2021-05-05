import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AccountList from './Components/AccountList/AccountList';
import ConnectLink from './Components/ConnectLink/ConnectLink';
// import useScript from './hooks/useScript';

function App() {
  // const [ count, setCount ] = useState(0)
  // useScript("https://js.fintoc.com/v1/");
  // useEffect(() => {

  //   window.Fintoc.create({});
  // },[])
  const [linkId, setLinkId] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {!linkId && <ConnectLink setLinkId={setLinkId}/>}
      {linkId && <AccountList />}
    </div>
  );
}

export default App;
