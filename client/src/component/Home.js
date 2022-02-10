import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header/Header';
import Footer from "./login/Footer"
import "./style.css"

const Home = (props) => {
    return (
        <>
        <Header />
        <div className="home">
            <p className='homep'>Welcome to Binge Blog<br /> <span style={{color:"white", fontSize:"40px"}}>Hhmmmmm... Shows..</span></p>
            
        </div>

        <div className="paras">
                        <p className='someshows'> Track shows you’ve watched.<br />
                                                  Save those you want to see. <br />
                                                  Tell your friends what’s good.  <br />
                        </p>
                        <div className='centerme2'>
            <button className='homebutton'><Link to="/article-list" style={{textDecoration:"none", color:"white"}}>Get Started</Link></button>
            </div>
                    </div>
                    <Footer />
        </>
    );
}

export default Home;