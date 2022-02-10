import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Header from '../header/Header';
import "../style.css"
import Footer from "../login/Footer"

function Articlelist(props) {
    const [articleList, setArticleList]=useState([]);

    useEffect(() => {
        fetchData();
        }, []);

    async function fetchData() {
        const response = await fetch(`http://localhost:8000/api/article`);
        console.log(`1. ${response}`)
        const body = await response.json();
        console.log(`2. ${body}`);
        setArticleList(body);
    }
    
    return (
        <>
              <Header />

        {articleList.map((i,key)=>(
        <div key={key}>
        <Link to={`/article/${i.name}`} style={{textDecoration:'none'}}>
        <div className='ArLink'>
        <h2 style={{padding:'10px'}}>{i.title}</h2>
        <h4 style={{padding:'10px'}}>Author: {i.ausername}</h4>
        <p style={{padding:'10px'}}>{i.description.substring(0,200)}... <span className='more'>read more</span></p>
        </div>
        </Link>
        </div>
        ))}
        <Footer />
        </>
  
    );
}

export default Articlelist;