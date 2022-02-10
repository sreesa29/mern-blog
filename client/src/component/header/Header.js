import React from 'react';
import { Link } from 'react-router-dom';
import "./header.css"
import Navuser from './Navuser';

const Header = (props) => {
    return (
        <div>
            <nav className="header">
                <h2 className="logo">  \Binge Blog\ </h2> {/* JSX*/}
                <div className="articles">
                    <Link className="link" to="/home">HOME</Link>
                    <Link className="link" to="/profile">PROFILE</Link>
                    <Link className="link" to="/article-list">ARTICLES</Link>
                    
        </div>
        <Navuser />
            </nav>
        </div>
        
    );
}

export default Header;