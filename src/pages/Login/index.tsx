import React from 'react';
import './styles.css';
import '../../styles/input.css'
import '../../styles/button.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import api from '../../services/api';
import { setItem, getItem } from '../../utils/storage'

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)

  useEffect(() => {
    const token = getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  async function handleLogin(e: any) {
    e.preventDefault();
    setError(false)


    try {
      if (!username || !password) {
        return
      }

      const response = await api.post('/login', {
        username,
        password
      });

      console.log(response.data)
      if (response.status > 204) {
        return
      }


      const { token, user } = response.data;
      setItem('token', token);
      setItem('userId', user.id);
      setItem('username', user.username);
      navigate('/home')

    } catch (error) {
      setError(true)
      console.log('erro')
      console.log(error)

    }
  }

  return (
    <div className="container-login">
      <h1>Olá! Seja bem-vindo!</h1>
      <h3>Faça o login com a sua conta abaixo</h3>
      <div className='form'>
        <form onSubmit={handleLogin}>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor='password'>Senha</label>
          <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
          <button className='green-btn'>Entrar</button>
          <p>Ainda não tem uma conta? <span onClick={() => navigate('/signup')} >Faça seu cadastro aqui</span></p>
        </form>
        {error && <h5>O usuário ou a senha estão incorretos</h5>}
      </div>

    </div>
  );
}

export default Login;
