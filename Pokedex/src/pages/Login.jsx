import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginContext } from "../context/logincontext";
import Modal from "../components/modal";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useLoginContext();
  const [modalMsg, setModalMsg] = useState("");

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long"
              }
            })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
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