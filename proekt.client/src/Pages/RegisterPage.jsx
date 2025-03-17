import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header"

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/userlogin");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");
        setSuccessMessage("");

        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Email: email,  
                    Password: password,
                    ConfirmPassword: confirmPassword, 
                }),
            });

            const responseText = await response.text(); 

            if (!response.ok) {
                throw new Error(responseText || "Registration failed.");
            }

            setSuccessMessage("Registration successful! Please log in.");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <Header/>
            <div className="containerbox">
                <h3>Register</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                    </div>
                    <div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
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
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                    </div>
                    <div>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <button type="submit">Register</button>
                    </div>

                    <div>
                        <button type="button" onClick={handleLoginClick}>
                            Go to Login
                        </button>
                    </div>
                </form>

                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
            </div>
        </>
    );
}

export default RegisterPage;
