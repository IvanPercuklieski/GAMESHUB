import '../Styles/TopTenCard.css'
import tempImg from '../assets/tempImg.jpg'

function TopTenCard(thumbnail, h, w, title) {
    return (
        <div className="topTenCard">
            <div><h1>01</h1></div>
            <div><img src={tempImg} /></div>
            <div>
                <h3>League of Legends</h3>
            </div>
        </div>
    )
}

export default TopTenCard