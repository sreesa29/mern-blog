import React from 'react';
import { Link } from 'react-router-dom';
import "./headerlog.css"
import {FaHome} from "react-icons/fa";


const Headerlogreg = (props) => {
    return (
        <div>
            <nav className="header1">
                <h2 className="logo1">  \Binge Blog\ </h2> {/* JSX*/}
                <div className="articles">
                    <Link className="link01" to="/home" style={{fontSize:"30px", fontWeight:"lighter" , padding:"8px", paddingRight:"30px",paddingLeft:"30px"}}><FaHome/></Link>                    
                </div>
            </nav>
        </div>
        
    );
}

export default Headerlogreg;