import React, { useLayoutEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "../style.css"

function DeletingArticle(props) {
    const { name } = props;
    const navigate = useNavigate();

    
    //Fetching isAdmin

    const [username, setUsername] = useState({})

         useLayoutEffect(() => {
             async function FetchAP(){
        const response = await fetch("/profile", {
            headers: {
                "Content-type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
        const request = await response.json();
        setUsername(request)

         }FetchAP()}, [])

    console.log(username)

      async function deletingArticle() {
        const resp = await fetch(`/api/article/${name}/deleting`, {
            method: 'delete',
            headers:{
            "Content-type": "aplication/json",
            "x-access-token": localStorage.getItem("token")
            }
        });
        
             alert ("Deleted")
             navigate("/article-list")
       
        console.log(resp)
        const body = await resp.json();
        console.log(body);
    }
    
    return (
        <>
            {
            username.isAdmin===true ? 
            <>
            <div className='updel'>
            <button className="delete" onClick={deletingArticle}>Delete Article</button>
            <Link to={`/${name}/update-article`}><button>Update Article</button></Link>
            </div>
                </>
            :
            <div></div>
            }
        </>
    );
}


export default DeletingArticle;