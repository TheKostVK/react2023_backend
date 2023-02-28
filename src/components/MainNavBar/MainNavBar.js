// Навигационный бар
import React from "react";
import {Link} from 'react-router-dom';


export const MainNavBar = (props) => {
    return (
        <>
            <div>
                <nav className="navbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Главная</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/hello" className="nav-link">Hello</Link>
                        </li>
                    </ul>
                </nav>
                <hr/>
            </div>
            <div>
                {props.children}
            </div>
        </>
    );
}
