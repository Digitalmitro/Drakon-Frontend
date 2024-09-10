import React from "react";

function ProductBtn(props) {
  return (
    <>
    <div className="card">
      <img className="product--image" src={props.url} alt="product image" />
      <p className="prod-name my-2">{props.name}</p>
      <p className="price">{props.price}</p>
      {/* Add your button here */}
      
    </div>
   <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
   <button  style={{
        backgroundColor: "#f5733b",
        color: "white",
        width:"180px",
        padding: "10px 20px",
        marginTop: "10px",
        border: "none",
        
        cursor: "pointer"
      }}>
        Shop Now
      </button>
      <button className="buyBtn" >
        Buy Now
      </button>
   </div>
    </>
  );
}

export default ProductBtn;
