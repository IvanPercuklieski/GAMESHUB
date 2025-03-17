import '../Styles/GameCard.css'
import {useNavigate } from 'react-router-dom'

function GameCard({ thumbnail, description, title, filePath, h, w }) {

    const navigate = useNavigate();

    const handleNavigate = () => {
        const data = { gamePath : filePath, height: h, width: w, desc: description, name: title}
        navigate("/gamepage", {state: data})
    }

    return (
        <div className="card">
            <img onClick={handleNavigate} src={ thumbnail} />
            <h3 onClick={handleNavigate }>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default GameCard