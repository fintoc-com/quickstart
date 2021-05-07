import { useEffect, useState } from 'react';
import useScript from 'react-script-hook';
import './ConnectLink.css';

const widgetOptions = {
  publicKey: process.env.REACT_APP_PUBLIC_KEY,
  holderType: 'individual', // business or individual
  product: 'movements', // movements or suscription
  webhookUrl: process.env.REACT_APP_WEBHOOK_URL,
};

function ConnectLink(props) {
  const [isOpen, setIsOpen] = useState(true);
  const [loadingScript, errorScript] = useScript({ src: 'https://js.fintoc.com/v1/' });

  const handleSuccess = (params) => {
    props.setLinkId(params.id);
  };
  const openWidget = () => setIsOpen(true);
  const closeWidget = () => setIsOpen(false);
  useEffect(() => {
    if (!isOpen) return;
    if (loadingScript) return;
    if (errorScript || !window.Fintoc) return;
    const params = {
      ...widgetOptions,
      onSuccess: handleSuccess,
      onExit: closeWidget,
    };
    const widget = window.Fintoc.create(params);
    widget.open();
  }, [loadingScript, errorScript, isOpen]);

  return (
    <div>
      <h1 className='ConnectLink'>
        Conecta tu cuenta
      </h1>
      <button onClick={openWidget}>
        Conectar
      </button>
    </div>
  );
}

export default ConnectLink;
