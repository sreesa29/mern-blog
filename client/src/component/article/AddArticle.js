/* eslint-disable no-undef */
import React, { useState } from 'react';
import "./addarticle.css";
import Header from "../header/Header"
import { useNavigate } from 'react-router-dom';

const AddArticle = (props) => {
    const navigate = useNavigate()

const [addArticle, setAddArticle] = useState({name:"",ausername:"",title:"",description:""});
const handleChange = (event) =>{
    console.log(event.target);
    const {name, value} =event.target;
    setAddArticle({...addArticle, [name]:value})
}

async function fetchArticle() {
    const name = addArticle.name.replace(/[^a-zA-Z]/g, "");
    const ausername = addArticle.ausername;
    const title = addArticle.title;
    const description = addArticle.description;

    const response = await fetch(`http://localhost:8000/api/article/addarticle`, {
        method: 'post',
        body: JSON.stringify({ name, ausername,title,description }),
        headers: {
            'Content-Type': 'application/json',
            "x-access-token": localStorage.getItem("token")

        }
    })
    const body = await response.json();
    setAddArticle(body);
    setAddArticle({ name:" ",ausername:" ",title:" ",description:" " });
    alert("Article Added")
    navigate("/article-list")

    
}
    return (
        <>
                     <Header />

        <div className="container">
        <div className='add-article'>
        <h3 className="addarticleh3">Add your article</h3>
        <br />
        <br />
           <input placeholder='Name (No special character or whitespace allowed)' type="text" className="form_field" name="name" value={addArticle.name} onChange={handleChange} required/>
            <br />
            <input placeholder='Author Name' type="text" className="form_field" name="ausername" value={addArticle.ausername} onChange={handleChange} required/>
             <br />
             <input placeholder='Article Title' type="text" className="form_field" name="title" value={addArticle.title} onChange={handleChange} required/>
            <br />
             <textarea placeholder='Article' rows="15" style={{resize: 'none'}} cols="150" className="form__field" type="text" name="description" value={addArticle.description} onChange={handleChange} required/>
            <br></br>
        <button onClick={fetchArticle} type="submit">Add Article</button>       
</div>
</div>
</>
    );
}

export default AddArticle;