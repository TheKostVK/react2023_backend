// Навигационный бар
import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import './MainNavBar.css'


export const MainNavBar = (props) => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }

    useEffect(() => {

        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }

    }, [])

    return (
        <>
            <nav>
                {(toggleMenu || screenWidth > 500) && (
                    <ul className="list">
                        <li>
                            <Link to="/" className="items">Home</Link>
                        </li>
                        <li>
                            <Link to="/hello" className="items">Hello</Link>
                        </li>
                        <li>
                            <Link to="/error404" className="items">Error404</Link>
                        </li>
                    </ul>
                )}
                {(toggleMenu || screenWidth < 500) && (
                    <button onClick={toggleNav} className="btn" style={{color: "white"}}>BTN</button>
                )}
            </nav>
            <div style={{marginTop: 100}}>
                {props.children}
            </div>
        </>
    );
}


