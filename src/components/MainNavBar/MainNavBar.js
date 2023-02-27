// Навигационный бар
import React from "react";
import { Link } from 'react-router-dom';

export const MainNavBar = (props) => {
    return (
        <>
            <div>
                <nav className="navbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Главная</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/hello">Hello Page</a>
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
