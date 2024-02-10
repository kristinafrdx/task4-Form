import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [err, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const dat = {
      login,
      password,
    }
    const response = await axios.post('http://localhost:3000/login', dat);
    if (response.data.message === 'true') {
      navigate('/table')
    } else {
      setError(true)
    }
  }

  const handleLogin = (event) => {
    setLogin(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="login-container bg-white p-4 rounded shadow-lg" style={{ width: '500px', height: '500px' }}>
        <h2 className="text-center mb-4 fs-5 mt-5 upper">Log in</h2>
        <form className="p-4 pt-2" onSubmit={handleSubmit} >
          <div className="form-group mb-2">
            <label htmlFor="username" className="fw-bold mb-2">Enter login:</label>
            <input type="text" className="form-control w-100 pt-2" autoFocus id="username" placeholder="siginur@mail.ru" value={login} onChange={handleLogin} required />
            <label htmlFor="password" className="fw-bold mb-2 mt-2">Enter password:</label>
            <input type="password" className="form-control w-100 pt-2" id="password" placeholder="qwerty12345" value={password} onChange={handlePassword} required/>
          </div>
          {err && <p className="text-danger">Incorrect username or password</p>}
        <div className="d-flex justify-content-between mt-4 flex-row gap-2">
          <button type="submit" className="btn btn-primary w-100">Sign in</button>
          <button type="button" onClick={() => navigate('/registration')} className="btn btn-primary w-100">Sign Up</button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
