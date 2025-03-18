import React, { useState, useEffect } from "react";
import "../Styles/GamesSection.css";
import GameCard from "../Components/GameCard";
import tempImg from '../assets/tempImg.jpg'

function GamesSection({ secName, fakeFeatured}) {
    const [games, setGames] = useState([]); 

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
        <div>
            <div className="sectionTitle">
                <h1>{ secName}</h1>
            </div>
            <div className="gamesGrid">
                {fakeFeatured ?
                    games.slice().map((game, index) => (
                            <GameCard
                                key={index}
                                thumbnail={tempImg}
                                title={game.title}
                                description={game.description}
                                filePath={game.filePath}
                                h={game.gameHeight}
                                w={game.gameWidth}
                                thumbnail={game.coverPhotoPath}
                            />
                    )
                ) :
                    games.slice().reverse().map((game, index) => (
                        <GameCard
                            key={index}
                            thumbnail={tempImg}
                            title={game.title}
                            description={game.description}
                            filePath={game.filePath}
                            h={game.gameHeight}
                            w={game.gameWidth}
                            thumbnail={game.coverPhotoPath}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default GamesSection;
