import React from 'react';
import './styles.css';
import '../../styles/input.css'
import '../../styles/button.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getItem } from '../../utils/storage'
import { format } from 'date-fns'
import api from '../../services/api';

function Table({ load }: any) {
  interface Transaction {
    transaction_id: number,
    transaction_createdAt: string,
    transaction_value: number
    transaction_creditedAccountId: number | string | null
    transaction_debitedAccountId: number | string | null
  }

  const [allTransactions, setAllTransactions] = useState<any[]>([]);
  const [credit, setCredit] = useState(false);
  const [debit, setDebit] = useState(false);
  const token = getItem('token');
  const userId = getItem('userId')
  const username = getItem('username');


  useEffect(() => {
    loadTransactions()

  }, [load]);

  async function loadTransactions() {

    const response = await api.get(`/transaction/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

    setAllTransactions(response.data.sort((a: Transaction, b: Transaction) => b.transaction_id - a.transaction_id));

  }

  function handleCreditTransactions() {
    let filteredTransactions = []
    for (let transaction of allTransactions) {
      if (transaction.transaction_creditedAccountId === Number(userId)) {
        filteredTransactions.push(transaction);
      }
    }
    setAllTransactions([...filteredTransactions])

  }

  function handleDebitTransactions() {
    let filteredTransactions = []
    for (let transaction of allTransactions) {
      if (transaction.transaction_debitedAccountId === Number(userId)) {
        filteredTransactions.push(transaction);
      }
    }
    setAllTransactions([...filteredTransactions])
  }

  return (
    <div className="container-table">
      <div className='table-title'>
        <h1>Transações realizadas</h1>
        <div className='filter'>
          <h4 onClick={() => handleCreditTransactions()}>Credito</h4>
          <h4 onClick={() => handleDebitTransactions()}>Debito</h4>
          <h4 onClick={() => loadTransactions()}>Limpar Filtros</h4>
        </div>
      </div>
      <div className='table-subtitle'>
        <h2>Valor</h2>
        <h2>Data</h2>
        <h2>Conta Creditada</h2>
        <h2>Conta Debitada</h2>
      </div>
      {allTransactions.map((transaction: Transaction) => (
        <div key={transaction.transaction_id} className='transfer-list'>
          <p>R$ {transaction.transaction_value}</p>
          <p>{format(new Date(transaction.transaction_createdAt), "dd/MM/yyyy")}</p>
          <p>{transaction.transaction_creditedAccountId === Number(userId) ? username : transaction.transaction_creditedAccountId}</p>
          <p>{transaction.transaction_debitedAccountId === Number(userId) ? username : transaction.transaction_debitedAccountId}</p>
        </div>
      ))}
    </div>
  );
}

export default Table;
