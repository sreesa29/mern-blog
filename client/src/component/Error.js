import React from 'react';
import Header from './header/Header';
import Footer from './login/Footer';
import "./style.css"

function Error(props) {
    return (
        <>
        < Header />
        <div className='error'>
            
            <h1>You've Lost your way! No such page we have created yet!</h1>
            <br/>

            <h1>Getting lost is a great way to find yourself.</h1>
                        
        </div>

        <Footer />
        </>
    );
}

export default Error;