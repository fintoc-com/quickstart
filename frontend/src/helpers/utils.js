import moment from 'moment';

export function formatDate(date) {
  return moment(date, 'YYYY-MM-DDTHH:mm:ss.sssZ').format('DD-MMM-YYYY');
}

export function formatAmount(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
