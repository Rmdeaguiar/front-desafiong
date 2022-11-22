import React from 'react';
import './styles.css';
import '../../styles/input.css'
import '../../styles/button.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { verifyPassword } from '../../utils/verifyPassword';
import api from '../../services/api';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    username: {
      status: false,
      message: "",
    },
    password: {
      status: false,
      message: "",
    }
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    const newError = { ...error };

    newError.username.status = false;
    newError.password.status = false;

    if (!username || !password) {
      return
    }

    if (username.length < 3) {
      newError.username = {
        status: true,
        message: 'O seu username precisa ter no mínimo 3 caracteres'
      }
    }

    const passwordValid = verifyPassword(password)
    Object.entries(passwordValid).forEach((msg) => {
      if (msg[1]) {
        newError.password = {
          status: true,
          message: msg[1]
        };
        return setError(newError)
      }
    })
    try {
      if (!username || !password) {
        return;
      }

      const response = await api.post('/sign-up', {
        username,
        password
      })

      console.log(response)

      if (response.status > 204) {
        return
      }

      navigate('/')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container-signup">
      <h2>Faça o seu cadastro no formulário abaixo!</h2>
      <div className='form'>
        <form onSubmit={handleSubmit} >
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
          {error.username.status &&
            <div className='error'>
              <span>{error.username.message}</span>
            </div>
          }
          <label htmlFor='password'>Senha</label>
          <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          {error.password.status &&
            <div className='error'>
              <span>{error.password.message}</span>
            </div>
          }
          <button className='green-btn'>Cadastrar</button>
        </form>
        <p>Já tem uma conta? <span onClick={() => navigate('/')}>Faça seu login aqui</span></p>
      </div>

    </div>
  );
}

export default SignUp;
