import { useState, useEffect } from 'react';
import { formatAmount, formatDate } from '../../helpers/utils';

function InvoiceList(props) {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    const response = await fetch('/api/invoices');
    const data = await response.json();
    if (response.ok) {
      setInvoices(JSON.parse(data));
      setError(false);
    } else {
      setError(data.message);
    }
    setIsLoading(false);
  }, []);

  const handleBack = () => {
    props.setLinkId('');
  };

  return (
    <div className="container mt-3 mx-auto">
        <button onClick={handleBack} className="text-fintocBlue">Atrás</button>
        <h2 className="text-2xl font-semibold leading-tight">Documentos tributaros de la cuenta de la cuenta</h2>
        {error && (
          <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p class="font-bold">Error</p>
            <p>{error || 'Se produjo un error'}</p>
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
                    >Fecha</th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Empresa</th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Tipo</th>
                    <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Monto neto</th>
                    <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >IVA</th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Monto total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!isLoading && invoices
                    .filter((inv) => !inv.institution_invoice.is_services_invoice)
                    .map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{formatDate(invoice.date)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{invoice.receiver?.name || invoice.issuer?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">{invoice.receiver ? 'Venta' : 'Compra'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">$ {formatAmount(invoice.net_amount)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">$ {formatAmount(invoice.institution_invoice.vat_amount)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">$ {formatAmount(invoice.total_amount)}</td>
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

export default InvoiceList;
