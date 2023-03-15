import TransactionsAllDay from './TransactionsAllDay';
import TransactionsLastFiveMin from './TransactionsLastFiveMin';
import TransactionsMinByMin from './TransactionsMinByMin';

function Transactions() {
  return (
    <div>
      <TransactionsAllDay />
      <TransactionsLastFiveMin />
      <TransactionsMinByMin />
    </div>
  );
}

export default Transactions;
