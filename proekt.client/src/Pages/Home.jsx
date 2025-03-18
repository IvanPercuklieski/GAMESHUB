import SideBarBox from '../Components/SideBarBox';
import GamesSection from '../Components/GamesSection';
import '../Styles/Home.css';
import Header from '../Components/Header';
import TopTenBox from '../Components/TopTenBox';

function Home() {

    return (
        <>
            <Header />
            <div className="mainWrapper">
                <div className="mainContent">
                    <GamesSection secName="Newest Games" />
                    <GamesSection secName="Featured Games" fakeFeatured="fake"/>
                </div>

                <div className="sideBarContent">
                    <SideBarBox />
                    <TopTenBox />
                </div>
            </div>
        </>
    );
}

export default Home;
