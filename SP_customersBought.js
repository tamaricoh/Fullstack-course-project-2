// @author Tamar Cohen

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// EX 2
// Presents all customers who bought a specific product
//  -------
// | Name -> link to 'Edit customer' page
// | Date of purchase
// | An 'Add' button - to buy another product
//  -------

function SP_customersBought(props) {
  const productID = props.id; // Product id
  const storeData = useSelector((state) => state); // All date from redux
  const purchases = storeData.purchases.filter((purchase) => {
    if (purchase.productID == productID) return purchase;
  }); // This product's purchases only
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false); // If click on 'Add' -> true
  const [addProduct, setAddProduct] = useState([false]); // Helps rerender in specific times (useEffect -> if and only if a purchase is made)
  const [productToBuy, setProductToBuy] = useState({
    id: "",
    productID: "",
    customerID: "",
    date: `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}`,
  }); // Purchase info

  useEffect(() => {
    // Update num of purchases (== next purchase ID)
    setProductToBuy({ ...productToBuy, id: `${storeData.purchases.length}` });
  }, addProduct);

  const addProductToPurchases = () => {
    if (productToBuy.productID == "") alert("Please select a product");
    // Add purchase + update the next purchase' ID
    else {
      dispatch({ type: "ADD PURCHASE", payload: productToBuy });
      setAddProduct([!addProduct[0]]);
    }
  };

  const getName = (customerID) => {
    // INPUT - customerID , OUTPUT - customer's full name
    let customers = storeData.customers; // All customers
    customers = customers.filter((customer) => {
      if (customer.id == customerID) return customers;
    }); // [A spesific customer]
    let customer = customers[0]; // A spesific customer
    return customer.firstName + " " + customer.lastName;
  };

  return (
    <div style={{ border: "3px solid LightBlue" }}>
      {purchases.length > 0 && (
        <div>
          <h4>Who else has purchased the product?</h4>
          <ul>
            {purchases.map((purchase) => {
              return (
                <li key={purchase.id}>
                  Name : &ensp;
                  {props.isAdmin ? (
                    <Link to={"/editCustomer/" + purchase.customerID}>
                      {getName(purchase.customerID)}
                    </Link>
                  ) : (
                    <span>{getName(purchase.customerID)}</span>
                  )}
                  <br />
                  Date : &ensp;{purchase.date}
                  <br />
                  <input
                    type="button"
                    value="Add a product to this customer"
                    onClick={() => {
                      setProductToBuy({
                        ...productToBuy,
                        customerID: `${purchase.customerID}`,
                      });
                      setClicked(true);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {clicked && (
        <div
          style={{
            backgroundColor: "LightPink",
          }}
        >
          <select
            onChange={(e) =>
              setProductToBuy({ ...productToBuy, productID: e.target.value })
            }
          >
            <option value=""></option>
            {storeData.products.map((product) => {
              if (product.quantity > 0)
                return (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                );
            })}
          </select>
          <br />
          <input
            type="button"
            value="Save"
            onClick={() => addProductToPurchases()}
          />
          <input
            type="button"
            value="Close"
            onClick={() => setClicked(false)}
          />
        </div>
      )}
    </div>
  );
}

export default SP_customersBought;

// @author Tamar Cohen
