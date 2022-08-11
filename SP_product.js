// @author Tamar Cohen

import { Link } from "react-router-dom";
import SP_customersBought from "./SP_customersBought";

// EX 2
// Presents product's data
//  -------
// | Name -> link to 'Edit product' page
// | Price
// | Quantity
// | Presents all customers who bought the product
//  -------

function SP_product(props) {
  const product = props.product; // Product's data

  return (
    <div style={{ backgroundColor: "LavenderBlush" }}>
      <h3>
        Name : &ensp;
        {props.isAdmin ? (
          <Link to={"/editProduct/" + product.id}>{product.name}</Link>
        ) : (
          <label>{product.name}</label>
        )}
      </h3>
      Price : {product.price}
      <br />
      Quantity : {product.quantity}
      <br />
      <br />
      <SP_customersBought id={product.id} isAdmin={props.isAdmin} />
      <br />
    </div>
  );
}

export default SP_product;

// @author Tamar Cohen
