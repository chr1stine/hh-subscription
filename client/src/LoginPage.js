import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  const baseAuthUrl = `http://${process.env.REACT_APP_AUTH_URL}`;

  async function validateCredentials() {
    const login = loginRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await axios.post(`${baseAuthUrl}/session`, {
        login,
        password,
      });
      navigate("/dashboard", {
        state: { access_token: response.data.access_token },
      });
    } catch (e) {
      alert("incorrect credentials");
      console.log("error: incorrect credentials");
    }
  }

  async function signup() {
    navigate("/signup");
  }

  return (
    <div className="container">
      <h2>Вход</h2>
      <label>Логин:</label>
      <input ref={loginRef}></input>
      <label>Пароль:</label>
      <input type="password" ref={passwordRef}></input>
      <button onClick={validateCredentials}>Войти</button>
      <button onClick={signup}>Регистрация</button>
    </div>
  );
}

export default LoginPage;
