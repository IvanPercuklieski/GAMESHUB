import { useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import '../Styles/GamePage.css';

function GamePage() {
    const location = useLocation();
    const { gamePath, height, width, desc, name } = location.state || {};

    const game = `${gamePath}/index.html`;
    const h = `${height}px`;
    const w = `${width}px`;

    return (
        <>
            <Header />

            <div className="gamePageBody">
                <div className="gamePageGame">
                    <iframe src={game}
                        height={h}
                        width={w }>
                    </iframe>
                </div>

                <div className="gamePageText" style={{ maxWidth: `${w}` }}>
                    <h1>{name}</h1>
                    <button>Download Game</button>
                    <p>{ desc}</p>
                </div>
            </div>
        </>
    );
}

export default GamePage;
