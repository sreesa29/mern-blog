import React from 'react';
import "../style.css"

const Comments = (props) => {
    const {comments} = props;
    return (
        <div>
            <h2 className='h3commented'>Comments</h2>

            {comments.map((i,key)=>
            <div key={key}>
                <div className='commented'>
                <h3>{i.username}</h3>
                <p>{i.text}</p>
                </div>
            </div>
            )}
        </div>
    );
}

export default Comments;