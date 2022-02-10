import React , {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import "../style.css"
import Error from '../Error';
import Comments from './Comments';
import UpvoteSection from './UpvoteSection';
import AddComments from './AddComments';
import DeletingArticle from './DeletingArticle';
import Header from '../header/Header';
import Footer from "../login/Footer"


const Article = (props) => {
    //useParams for Fetching data from URL Ref: Router of article in App.js
    const {name} = useParams();

    //article temp using hook
    const [articleData, setArticleData]= useState({upvotes:0, comments:[]});
    
    //finding article from database using "find" properties of js array
    // const article = articleContent.find(i => i.name===name);
    // console.log(article)
    //Page missing alert
    

    //Backend Fetching API

    useEffect(()=>{
        fetchAPI();
    },[name]);

    async function fetchAPI() {
        const response = await fetch(`/api/article/${name}`);
        const body = await response.json();
        console.log(body);
        setArticleData(body);
    }
 
    if(!articleData) return <Error />
    return (
        <>
              <Header />

        <div className='article'>
        {/* Fetching data from Sample DB using Find Const */}
     
            <DeletingArticle name={name} setarticleData={setArticleData}/>
         
            <h1 className='articleh1'>{articleData.title}</h1>
            <h5 className='articleh5'>Author: {articleData.ausername}</h5>
        
            <p className='articlehp' style={{whiteSpace: "pre-wrap"}}>  {articleData.description}</p>
            <UpvoteSection name={name} setarticleData={setArticleData} upvotes={articleData.upvotes} />

            <AddComments name={name} setArticleData={setArticleData} />
            <Comments comments={articleData.comments}/>
           
        </div>
        <Footer />
        </>
    );
}

export default Article;