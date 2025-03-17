import { useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import '../Styles/GamePage.css';

function GamePage() {
    const location = useLocation();
    const { gamePath, height, width, desc } = location.state || {};

    const game = `${gamePath}/index.html`;
    const h = `${height}px`;
    const w = `${width}px`;

    return (
        <>
            <Header />

            <div className="gamePageBody">
                <div className="gameBoxContainer">
                    <div className="gameBox">
                        <iframe
                            src={game}
                            width={w}
                            height={h}
                            title="Embedded Html"
                        />
                    </div>

                    <p className="description">{desc}</p>
                </div>
            </div>
        </>
    );
}

export default GamePage;
