// @author Tamar Cohen

import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SP_product from "./SP_product";

// EX 5
// Two regions
// 1.
// Table of all Customers.
//  ---------------------------------------------------------------------------------
// |      |                                                |                         |
// | Name | List of products (link to 'Edit product' page) | List of purchases dates |
// |      |                                                |                         |
//  ---------------------------------------------------------------------------------
// 2.
// 'Buy Product' button ---click--> will open a form
// 'Select' input with all customers
// 'Select' input with all products (with quantity > 0)
// 'Buy' button ---click---> ש purchase will be made

function SP_customers(props) {
  const storeData = useSelector((state) => state);
  const dispatch = useDispatch();
  const customers = storeData.customers;
  const [clicked, setClicked] = useState(false); // If 'Buy Product' is clicked -> true
  const [formSent, setFormSent] = useState([false]); // Helps rerender in specific times (useEffect -> if and only if a purchase is made)
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
  }, formSent);

  const tableStyle = { border: "2px solid MediumVioletRed", margin: "0 auto" };

  const listOfProducts = (id) => {
    // Create an array with all the products of a specific customer according to a given ID
    let purchasesProductsID = storeData.purchases; // Get all purchases
    purchasesProductsID = purchasesProductsID.filter((purchase) => {
      if (purchase.customerID == id) return purchase;
    }); // Filter only *this customer* purchases
    purchasesProductsID = purchasesProductsID.map(
      (purchase) => purchase.productID
    ); // Map arr to productID
    let products = storeData.products; // Get all products
    let indexOfProduct;
    let specificProducts = [];
    purchasesProductsID.forEach((productID) => {
      indexOfProduct = products.findIndex((product) => product.id == productID);
      specificProducts.push(products[indexOfProduct]);
    }); // create array of all the products
    return specificProducts;
  };

  const listOfDates = (id) => {
    // Create an array with all the dates of purchases of a specific customer according to a given ID
    let purchasesDates = storeData.purchases; // Get all purchases
    purchasesDates = purchasesDates.filter((purchase) => {
      if (purchase.customerID == id) return purchase;
    }); // Filter only *this customer* purchases
    return purchasesDates;
  };

  const addProductToPurchases = (e) => {
    // Add purchase + update the next purchase' ID
    e.preventDefault();
    dispatch({ type: "ADD PURCHASE", payload: productToBuy });
    setFormSent([!formSent[0]]);
  };

  return (
    <div style={{ backgroundColor: "PowderBlue" }}>
      <h3>Customers Page</h3>
      {/* Region 1 */}
      <div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <th style={tableStyle}>NAME</th>
              <th style={tableStyle}>PRODUCTS</th>
              <th style={tableStyle}>PURCHASES</th>
            </tr>
            {customers.map((customer) => {
              return (
                <tr key={customer.id}>
                  <td style={tableStyle}>
                    {customer.firstName + " " + customer.lastName}
                  </td>
                  <td style={tableStyle}>
                    <div>
                      <ul>
                        {listOfProducts(customer.id).map((product, index) => {
                          return (
                            <li key={index}>
                              {props.isAdmin ? (
                                <Link to={"/editProduct/" + product.id}>
                                  {product.name}
                                </Link>
                              ) : (
                                <span>{product.name}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </td>
                  <td style={tableStyle}>
                    <div>
                      <ul>
                        {listOfDates(customer.id).map((purchase) => {
                          return <li key={purchase.id}>{purchase.date}</li>;
                        })}
                      </ul>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* End of region 1 */}
      <br />
      {/* Region 2 */}
      <div>
        <input
          type="button"
          value="Buy Product"
          onClick={() => setClicked(true)}
        />
        <br />
        <br />
        {clicked && (
          <div
            style={{
              backgroundColor: "PaleVioletRed",
              width: "50%",
              margin: "0 auto",
            }}
          >
            <form
              onSubmit={(e) => {
                addProductToPurchases(e);
              }}
            >
              <label>WHO IS BUYING ?</label>
              <br />
              {storeData.customers.map((customer) => {
                return (
                  <span key={customer.id}>
                    <input
                      type="radio"
                      name="customer"
                      onClick={() =>
                        setProductToBuy({
                          ...productToBuy,
                          customerID: customer.id,
                        })
                      }
                      required
                    />
                    {customer.firstName + " " + customer.lastName}
                    <br />
                  </span>
                );
              })}
              <br />
              <label>WHAT TO BUY ? </label>
              <br />
              {storeData.products.map((product) => {
                if (product.quantity > 0)
                  return (
                    <span key={product.id}>
                      <input
                        type="radio"
                        name="product"
                        onClick={() =>
                          setProductToBuy({
                            ...productToBuy,
                            productID: product.id,
                          })
                        }
                        required
                      />
                      {product.name}
                      <br />
                      Price : {product.price}
                      <br />
                    </span>
                  );
              })}
              <br />
              <input type="submit" value="Buy" />
            </form>
          </div>
        )}
      </div>
      <br />
      {/* End of region 2 */}
      <Link to="/">Back To Menu</Link>
      <br />
      <br />
    </div>
  );
}

export default SP_customers;

// @author Tamar Cohen
