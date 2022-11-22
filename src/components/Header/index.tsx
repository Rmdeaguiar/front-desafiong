import React from 'react';
import './styles.css';
import '../../styles/input.css'
import '../../styles/button.css'
import { getItem, clear } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Exit from '../../assets/exit-icon.svg'

function Header() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(getItem('username'));

  function exitLogin() {
    setUsername('');
    clear();
    navigate('/')
  }

  return (
    <div className="container-header">
      <div className='header-welcome'>
        <h1>Olá, {username}!</h1>
        <h2>Seja bem vindo ao NG App!</h2>
      </div>

      <img src={Exit} alt='exit' onClick={() => exitLogin()} />
    </div>
  );
}

export default Header;
