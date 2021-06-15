import React from 'react';
import { useHistory } from 'react-router';
import './BookCard.css'
const BookCard = (props) => {
    const { author, image, name, price, _id } = props.book;
    const history = useHistory();
    const clickHandler=(id) => {
        const url = `/checkout/${id}`
        history.push(url)
        
    }
    return (
        <div className="book-card">
            <img src={image} alt="" />
            <h3>{name}</h3>
            <p>Author: { author}</p>
            <div className="card-footer">
                <h2>$ {price}</h2>
                <button onClick={()=>clickHandler(_id)}>Buy Now</button>
            </div>
        </div>
    );
};

export default BookCard;