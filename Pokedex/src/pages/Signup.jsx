import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../components/modal"; 
import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const [modalMsg, setModalMsg] = useState("");

  const onSubmit = (data) => {
    const { email, password, confirmPassword } = data;

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password"
            })}
          />
          {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
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
