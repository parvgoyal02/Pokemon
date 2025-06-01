import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginContext } from "../context/logincontext";
import Modal from "../components/modal";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useLoginContext();
  const [modalMsg, setModalMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === username && u.password === password
    );

    if (!user) {
      setError("Invalid username or password");
      return;
    }

    login(user);
    setModalMsg("Successfully logged in!");
  };
  const closeModal = () => {
    setModalMsg("");
    navigate('/');
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
      {modalMsg && <Modal message={modalMsg} onClose={closeModal} />}
    </div>
  );
}

export default Login;
