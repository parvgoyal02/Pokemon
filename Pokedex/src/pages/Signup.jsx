import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../components/modal"; 

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [modalMsg, setModalMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setModalMsg("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const alreadyExists = users.find((user) => user.email === email);

    if (alreadyExists) {
      setModalMsg("User with this email already exists");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    setModalMsg("Successfully signed up. Proceed to login.");
  };
    const closeModal = () => {
    setModalMsg("");
    if (modalMsg.includes("Successfully")) {
      navigate("/login");
    }
};

  return (
    <div>
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
      {modalMsg && <Modal message={modalMsg} onClose={closeModal} />}
    </div>
  );
}

export default Signup;
