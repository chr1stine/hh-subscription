import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  async function validateCredentials() {
    const loginValue = loginRef.current.value;
    const passwordValue = passwordRef.current.value;
    
    if (loginValue === process.env.REACT_APP_CLIENT_LOGIN && passwordValue === process.env.REACT_APP_CLIENT_PASSWORD) {
      navigate('/dashboard');
    } else {
      console.log('error: incorrect credentials');
    }
  }

  return (
    <div className="container">
      <label>Логин:</label>
      <input ref={loginRef}></input>
      <label>Пароль:</label>
      <input type="password" ref={passwordRef}></input>
      <button onClick={validateCredentials}>Войти</button>
    </div>
  );
}

export default LoginPage;
