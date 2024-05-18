import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const ProceedLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backendproyectointernet.azurewebsites.net/usuarios/login/', { username, password });
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
      navigate('/');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  if (!loggedIn) {
    return (
      <div>
      <div className="login-container">
        <h2>Login</h2>
        {error && <Toast style={{ backgroundColor: 'red', color: 'white', textAlign: 'center'}}>{error}</Toast>}
        <form onSubmit={ProceedLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
      <div style={{ height: '400px' }}></div>
      </div>
    );
  } else {
    return (
      <div>
      <div className="login-container">
        <h2>Salir de tu cuenta</h2>
        <center>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </center>
      </div>
      <div style={{ height: '500px' }}></div>
      </div>
    );
  }
}

export default Login;