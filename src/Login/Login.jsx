/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [UserData, setUserData] = useState({
    nameUser: '',
    pass: '',
  });

  function isGuid(value) {
    const regex = /[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}/i;
    const match = regex.exec(value);
    return match != null;
  }

  const handleInputChange = (event) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setUserData({
      ...UserData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitEvent = (event) => {
    fetch(`https://localhost:5001/Auth/Login?user=${UserData.nameUser}&Password=${UserData.pass}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 401) {
            alert('Nombre de usuario o contraseña invalido.');
          } else if (isGuid(result)) {
            localStorage.setItem('ingControl', result);
            window.location.reload(false);
          } else {
            alert('Error intente de nuevo.');
          }
        },
        (error) => {
          alert('Nombre de usuario o contraseña invalido.');
          console.log(error);
        },
      );
    event.preventDefault();
  };

  return (
    <div className='account-container'>
      <div className='content clearfix'>
        {/* action='#' method='post' */}
        <form onSubmit={handleSubmitEvent}>
          <h1>Login</h1>
          <div className='login-fields'>
            <p>Proporcione sus datos</p>
            <div className='field'>
              <label htmlFor='password'>Nombre de Usuario</label>
              <input type='text' id='username' name='nameUser' placeholder='Nombre de Usuario' onChange={handleInputChange} className='login username-field' />
            </div>
            <div className='field'>
              <label htmlFor='password'>Contraseña:</label>
              <input type='password' id='password' name='pass' placeholder='Contraseña' onChange={handleInputChange} className='login password-field' />
            </div>
          </div>
          <div className='login-actions'>
            <button type='submit' className='button btn btn-success btn-large'>Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
