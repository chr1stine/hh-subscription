import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const navigate = useNavigate();
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  const baseAuthUrl = `http://${process.env.REACT_APP_AUTH_URL}`;

  async function register() {
    const login = loginRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(`${baseAuthUrl}/user`, {
        login,
        password,
      });
      if (response.status === 201) {
        alert("registered successfully!");
        navigate("/");
      }
    } catch (e) {
      console.log("could not register because of error: ", e);
      alert("error: name is already occupied, choose another");
    }
  }

  return (
    <div className="container">
      <h3>Придумайте логин и пароль:</h3>
      <label>Логин:</label>
      <input ref={loginRef}></input>
      <label>Пароль:</label>
      <input type="password" ref={passwordRef}></input>
      <button onClick={register}>Зарегистрироваться</button>
    </div>
  );
}

export default SignupPage;
