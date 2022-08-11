// @author Tamar Cohen

import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// My addition

function SP_addProduct() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.products.length);
  const [product, setProduct] = useState({
    id: id,
    name: "",
    price: 0,
    quantity: 0,
  });

  const addProduct = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD PRODUCT", payload: product });
    alert("Added");
  };

  return (
    <div
      style={{
        border: "3px solid MediumVioletRed",
        backgroundColor: "LightCoral",
      }}
    >
      <h3>Add A Product</h3>
      <form onSubmit={(e) => addProduct(e)}>
        Name : &ensp;
        <input
          type="text"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
        <br />
        Price : &ensp;
        <input
          type="text"
          onChange={(e) => setProduct({ ...product, price: +e.target.value })}
          required
        />
        <br />
        Quantity : &ensp;
        <input
          type="text"
          onChange={(e) =>
            setProduct({ ...product, quantity: +e.target.value })
          }
          required
        />
        <br />
        <input type="submit" value="Add" />
      </form>
      <br />
      <Link to="/">Back To Menu</Link>
      <br />
      <br />
    </div>
  );
}

export default SP_addProduct;

// @author Tamar Cohen
