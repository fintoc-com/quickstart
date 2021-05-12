import { useEffect, useState } from 'react';
import useScript from 'react-script-hook';

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
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center">
          <span className="block">List@ para probar fintoc?</span>
          <span className="block text-fintocBlue">Conecta tu cuenta para comenzar</span>
      </h2>
      <div className="mt-8">
        <div className="flex justify-center">
          <button
            onClick={openWidget}
            className="align-middle px-12 py-5 border border-transparent text-base font-medium rounded-md text-white bg-fintocBlue hover:shadow-2xl"
          >
            Conectar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectLink;
