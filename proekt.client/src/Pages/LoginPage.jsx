import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header"
import '../Styles/LoginPage.css'

function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberme, setRememberme] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberme") setRememberme(e.target.checked);
    };

    const handleRegisterClick = () => {
        navigate("/userregister");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!email || !password) {
            setError("Please fill in all fields.");
        } else {
           
            setError("");

            var loginurl = "";
            if (rememberme == true)
                loginurl = "/login?useCookies=true";
            else
                loginurl = "/login?useSessionCookies=true";

            try {
                const response = await fetch(loginurl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Email: email,
                        Password: password,
                    }),
                });

                if (response.ok) {
                    setError("Successful Login.");
                    navigate("/"); 
                } else {
                    setError("Error Logging In.");
                }
            } catch (error) {
                console.error(error);
                setError("Error Logging in.");
            }
        }
    };

    return (
        <>
            <Header/>
            <div className="loginMainBox">
                <div className="containerBox">
                    <h3>LOGIN</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="forminput" htmlFor="email">Email:</label>
                        </div>
                        <div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="rememberme"
                                name="rememberme"
                                checked={rememberme}
                                onChange={handleChange} />
                            <span>Remember Me</span>
                        </div>
                        <div>
                            <button type="submit">Login</button>
                            <button type="button" onClick={handleRegisterClick}>Go to Register</button>
                        </div>
                    </form>
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </>
    );
}

export default Login;
