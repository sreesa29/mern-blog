import React from 'react';
import { useState } from 'react';
import "../style.css"

function AddComments(props) {
    const { name, setArticleData } = props;

    //storing comment temp in front end
    const [commentValues, setCommentValues] = useState({username:"", comment:""});
    const handleChange = (event) =>{
        console.log(event.target);
        const {name, value} =event.target;
        setCommentValues({...commentValues, [name]:value})
    }

    async function fetchComments() {
        const username = commentValues.username;
        const text = commentValues.comment;

        const response = await fetch(`http://localhost:8000/api/article/${name}/comments`, {
            method: 'post',
            body: JSON.stringify({ username, text }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const body = await response.json();
        setArticleData(body);
        setCommentValues({ username: "", comment: "" });

    }
     


    return (
        <>
        <div className='fuler'>
        <h3 className='commenth3'>Add a Comment</h3>
        </div>

            <div className='add-comment'>
                <label>
                    <br></br>
                    <input placeholder='Name' style={{resize: 'none', backgroundColor:"gray" }} className='commentuser' type="text" name="username" value={commentValues.username} onChange={handleChange}/>
                </label>
                <label>
                    <br />
                    <br></br>
                    <textarea style={{resize: 'none', backgroundColor:"gray" }}  placeholder='Type your comment here...' className='comment' rows="4" cols="50" name='comment' value={commentValues.comment} onChange={handleChange}></textarea>
                </label>
                <br></br>
                <button className='commentbutton' onClick={fetchComments}type="submit">Comment</button>       

        </div>
        </>
    );
}

export default AddComments;