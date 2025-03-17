import { useNavigate } from "react-router-dom";

function Logout({ children }) {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: "",
        })
            .then((response) => {
                if (response.ok) {
                    navigate("/userlogin");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <a
            href="#"
            onClick={handleSubmit}
            style={{ textDecoration: "none", color: "inherit" }}
        >
            {children}
        </a>
    )
}

export default Logout;
