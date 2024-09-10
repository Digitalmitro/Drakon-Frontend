import React from "react";

 function Products(props) {
  return (
    <div className="card">
      <div className="new"><p>new</p></div>
      <div className="productsInfo">
      <img className="product--image" src={props.url} alt="product image" />
      <p className="prod-name my-2">{props.name}</p>
      <p className="price">{props.price}</p>
      {/* <p>{props.description}</p> */}
      <p>
        {/* <button>Add to Cart</button> */}
      </p>
      </div>
    
    </div>
  );
}
export default Products