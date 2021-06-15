import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './CheckOut.css'
const Checkout = () => {
    const [selectedProduct, setSelectedProduct] = useState({});
    const { key } = useParams();
    const history = useHistory();
    useEffect(() => {
        const url = `http://localhost:5000/book/${key}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setSelectedProduct(data[0]))
    }, []);
    const clickHandler = (id) => {
        const url = `/orders/${id}`;
        history.push(url)
    }
    const { name, price, image, author } = selectedProduct;
    return (
        <div>
            <h1 style={{textAlign:"center"}}>Checkout</h1>
            <div className="checkout-table">
                <div className="table-titles">
                    <b>Description</b>
                    <b>Quantity</b>
                    <b>Price</b>
                </div>
                <div className="book-info">
                    <div className="book-preview">
                        <img src={image} alt="" />
                        <p>Name: {name}  <br /> Author : {author}</p>
                    </div>
                    <p>1</p>
                    <p>$  {price}</p>
                </div>

                <div className="total-info">
                    <b>Total:</b>
                    <b>1</b>
                    <b>$ {price}</b>
                </div>
            </div>
            <div className="btn-checkout">
                <button onClick={() => clickHandler(key)} className="btn ">Checkout</button>
            </div>

        </div>
    );
};

export default Checkout;