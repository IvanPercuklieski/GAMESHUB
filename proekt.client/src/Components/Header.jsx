import '../Styles/Header.css'
import { FaSearch } from "react-icons/fa";
import { TfiMenu } from "react-icons/tfi";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from '../Components/Logout'
import AuthorizeView, { AuthorizedUser } from './AuthorizeView';

function Header() {
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const burgerIconRef = useRef(null);

    const navigate = useNavigate();
    const handleRegisterClick = () => {
        navigate("/userregister");
    };

    const UploadGameClick = () => {
        navigate("/gameupload");
    };

    const handleLoginClick = () => {
        navigate("/userlogin");
    };

    const handleLogoClick = () => {
        if (window.location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" }); 
        } else {
            navigate("/");
        }
    };

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                burgerIconRef.current && !burgerIconRef.current.contains(event.target)
            ) {
                setBurgerMenuOpen(false);
            }
        };

        if (burgerMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [burgerMenuOpen]);

    return (
        <>
            <div className="mainTest">
                <div className="test">
                    <div>
                        <ul>
                            <li className="logo" onClick={handleLogoClick}><h1>GAMESHUB</h1></li>
                            <div className="navLinks">
                                <li><h4>BROWSE GAMES</h4></li>
                                <li onClick={UploadGameClick}><h4>UPLOAD GAME</h4></li>
                            </div>
                        </ul>
                    </div>

                    <div className="rightSide">
                        <ul>
                            <li>
                                <input className="searchField" type='text'></input>
                            </li>
                            <li>
                                <FaSearch className="searchIcon" />
                            </li>
                                
                            <AuthorizeView unauthorizedContent={
                                <>
                                    <li>
                                        <button type="button" className="lgnBtn" onClick={handleLoginClick}>Log in</button>
                                    </li>
                                    <li className="regBtn">
                                        <button type="button" onClick={handleRegisterClick}>Register</button>
                                    </li>
                                </>
                            }>
                                <li>
                                    <button><Logout>Logout</Logout></button>

                                </li>
                            </AuthorizeView>
                            <li>
                                <TfiMenu ref={burgerIconRef} className="burgerIcon" onClick={() => setBurgerMenuOpen(!burgerMenuOpen)} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {burgerMenuOpen && (
                <div ref={menuRef} className={`burgerMenu ${burgerMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li className="burgerSearch">
                            <input type="text"></input>
                            <FaSearch className="burgerSearchIcon" />
                        </li>
                        <li onClick={handleLogoClick }>GAMESHUB</li>
                        <li>BROWSE GAMES</li>
                        <li onClick={UploadGameClick }>UPLOAD GAMES</li>
                        <AuthorizeView unauthorizedContent={
                            <>
                                <li onClick={handleLoginClick}>LOG IN</li>
                                <li onClick={handleRegisterClick}>REGISTER</li>
                            </>
                        }>
                            <li><Logout>LOGOUT</Logout></li>
                        </AuthorizeView>
                        
                        <li onClick={() => setBurgerMenuOpen(false)}>Exit Menu</li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default Header;
