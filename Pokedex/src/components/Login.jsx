import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";


function Login () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {        
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user || user.email !== username || user.password !== password) {
            setError("Invalid username or password");
            return;
        }
        
        alert("Successfully logged in");
        navigate('/');
        // Redirect to dashboard or another page
    }


    return(
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
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit">Login</button>
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </form>
        </div>
    )
}


export default Login