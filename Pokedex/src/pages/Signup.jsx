import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Successfully signed up, Proceed to login");
        navigate('/login');
    };

    return(
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
                <p>Already have an account? <a href="/login">Login</a></p>
            </form>
        </div>
    )
}


export default Signup