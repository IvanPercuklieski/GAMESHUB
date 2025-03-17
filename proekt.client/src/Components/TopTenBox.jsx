import '../Styles/TopTenBox.css'
import TopTenCard from "../Components/TopTenCard"
import { useState, useEffect } from 'react'

function TopTenBox() {

    const [selectedTime, setSelectedTime] = useState('Today')
    const [games, setGames] = useState([]);

    const handleSelect = (time) => {
        setSelectedTime(time)
    }

    useEffect(() => {

        const fetchGames = async () => {
            try {
                const response = await fetch("/api/GameUpload/getgames", {
                    method: "GET",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch games");
                }
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchGames();
    }, []); 


    return (
        <div className="topTenBox">
            <div className="topTenBoxHeader">
                <h2>TOP GAMES</h2>
                <div className="btns">
                    <ul>
                        <li
                            className={selectedTime === 'Today' ? 'selected' : ''}
                            onClick={() => handleSelect('Today')}
                        >
                            Today
                        </li>
                        <li
                            className={selectedTime === 'Week' ? 'selected' : ''}
                            onClick={() => handleSelect('Week')}
                        >
                            Week
                        </li>
                        <li
                            className={selectedTime === 'Month' ? 'selected' : ''}
                            onClick={() => handleSelect('Month')}
                        >
                            Month
                        </li>
                    </ul>
                </div>
            </div>
            <ul className="topGames">
                <li><TopTenCard /></li>
                <li><TopTenCard /></li>
                <li><TopTenCard /></li>
                <li><TopTenCard /></li>
                <li><TopTenCard /></li>
                <li><TopTenCard /></li>
                <li><TopTenCard /></li>
                <li><TopTenCard /></li>
                <li><TopTenCard /></li>
                <li><TopTenCard /></li>
            </ul>
        </div>
    )
}

export default TopTenBox
