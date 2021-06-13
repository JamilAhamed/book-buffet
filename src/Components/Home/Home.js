import React from 'react';
import "./Home.css"

const Home = () => {
    return (
        <div className="home-container">

            <div className="search-bar">
                <input placeholder="Search Your Books" type="text" />
                <button className="btn"> Search</button>
            </div>
            <div className="cards-container">

            </div>
        </div>
    );
};

export default Home;