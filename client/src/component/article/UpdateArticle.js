import React, { useEffect, useState } from 'react';
import "./addarticle.css";
import Header from "../header/Header"
import { useNavigate, useParams } from 'react-router-dom';


const UpdateArticle = (props) => {
const {name} = useParams();
const navigate = useNavigate()

//data fetching
const [articleData, setArticleData]= useState([]);



async function fetchAPI() {
    const response = await fetch(`/api/article/${name}`);
    const body = await response.json();
    setArticleData(body);
}
console.log( articleData.ausername);


useEffect(()=>{
    fetchAPI();
},[]);

//data fetching ends



async function handleChange(e) {
    e.preventDefault()

    const form = e.target;
    const user = {
        ausername: form[0].value,
        title: form[1].value,
        description: form[2].value
    }
     const res = await fetch(`/api/article/${name}/updatearticle`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
            body: JSON.stringify(user),
            

        })
        const data = await res.json()
        .then(navigate("/article-list"))
        console.log(data)
   }

    return (
        <>
              <Header />


        {/* if stats */}

        


        {/* ends */}

        <div className="container">
        <div className='add-article'>
        <h3 className='addarticleh3'>Update Article</h3>
        <br />
        <br />
        <form onSubmit={(e) => handleChange(e)}>
        <label className="form__label">
            <br />
            Author Name:
            <br/>
            <input type="text" defaultValue={articleData.ausername} className="form__field"  name="ausername" />
        </label>
        <label className="form__label">
            <br />
            Article Title:
            <br></br>
            <input type="text" defaultValue={articleData.title} className="form__field" name="title"  />
        </label>
        <br></br>
        <label className="form__label">
            <br />
            Article:
            <br></br>
            <textarea rows="15" style={{resize: 'none'}} cols="150" className="form__field" type="text" name="description" defaultValue={articleData.description} />
        </label>
        <br></br>
        <button type="submit" name='submit'>Submit</button>   
        </form>    

</div>
</div>
</>
    );
}

export default UpdateArticle;