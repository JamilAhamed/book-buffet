import React from 'react';
import  "./NotMatch.css"

const NotMatch = () => {
    return (
        <div className="error-div">
            <div className="error-container">
            <h1>ERROR 404 !</h1>
                <h3>You Entered in an unavailable Route</h3>
            </div>
        </div>
    );
};

export default NotMatch;