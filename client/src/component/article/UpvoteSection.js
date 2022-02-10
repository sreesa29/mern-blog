import React from 'react';
import "../style.css"

function UpvoteSection(props) {
    const { name, upvotes, setarticleData } = props;

    async function fetchUpVotes() {
        const response = await fetch(`http://localhost:8000/api/article/${name}/upvotes`, {
            method: 'post'
        });
        const body = await response.json();
        setarticleData(body);
    }

    return (
        <div className='upvoteme'>
            <p className="votes">This article has {upvotes} upvotes</p>
           <div className='centerme'><button className='uputton' onClick={fetchUpVotes}>Upvote this Article</button></div> 

        </div>
    );
}

export default UpvoteSection;