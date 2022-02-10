import React from 'react';
import "./login.css";

function ValidationError({message}) {

    
    return (
        <div>
           <p className="errormessage">{message}</p>
        </div>
    );
}

export default ValidationError;