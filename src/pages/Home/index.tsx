import Header from '../../components/Header'
import Table from '../../components/Table'
import './styles.css';
import '../../styles/input.css'
import '../../styles/button.css'
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { getItem } from '../../utils/storage';

function Home() {
  const token = getItem('token');
  const [username, setUsername] = useState('');
  const [value, setValue] = useState<any>(0)
  const [balance, setBalance] = useState(100);
  const [error, setError] = useState(false)
  const [load, setLoad] = useState(true)

  useEffect(() => {
    async function loadAccount() {
      const response = await api.get('/account', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      setBalance(response.data.balance)

    }
    loadAccount()

  }, [load, token]);

  async function handleNewTransfer(e: any) {
    e.preventDefault();
    setError(false)

    try {
      const response = await api.post('/transaction', {
        usernameCredited: username,
        value
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      console.log(response.data)

      if (response.status > 204) {
        return
      }
      setLoad(!load)

    } catch (error) {
      console.log(error)
      setError(true)

    }

  }

  return (
    <>
      <Header />
      <div className="container-home">
        <div className='square balance'>
          <h2>O seu balance atual é de:</h2>
          <h1>R$ {balance}</h1>
        </div>
        <Table
          load={load}
        />
        <div className='square transfer'>
          <h2>Área de Transferência</h2>
          <form>
            <label htmlFor='username'>Username de destino</label>
            <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor='value'>Valor</label>
            <input type='number' name='value' value={value} onChange={(e) => setValue(e.target.value)} />
            <button className='black-btn' onClick={(e) => handleNewTransfer(e)}>Enviar</button>
            {error && <h5>O usuário não foi encontrado</h5>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
