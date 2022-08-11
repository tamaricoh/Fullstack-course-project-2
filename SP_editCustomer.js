// @author Tamar Cohen

import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// EX 4
// Two regions
// 1.
// A form - update or delete (delete will also remove his purchases)
// 2.
// List of all the products he purchased -> link to 'Edit product' page

function SP_editCustomer() {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);
  const id = useParams().id; // Customer ID
  const customerArr = storeData.customers.filter((customer) => {
    if (customer.id == id) return customer;
  }); // [This customer]

  const [customer, setCustomer] = useState(customerArr[0]); // This customer (copy)

  const deleteCustomer = () => {
    dispatch({ type: "DELETE CUSTOMER", payload: id });
  };

  const updateCustomer = () => {
    // If the info hasn't changed -> alert.
    // Else -> dispatch
    if (
      (customer.firstName == customerArr[0].firstName) &
      (customer.lastName == customerArr[0].lastName) &
      (customer.city == customerArr[0].city)
    )
      alert("Please Enter New Info");
    else dispatch({ type: "UPDATE CUSTOMER", payload: customer });
  };

  const listOfProducts = () => {
    // Build an array with all the products this customer has bought
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
    }); // Create array of the products this customer has bought
    return specificProducts;
  };
  const productsBought = listOfProducts();

  return (
    <div style={{ backgroundColor: "PaleTurquoise" }}>
      <h3 style={{ color: "PaleVioletRed" }}>
        Customer info - Update and Delete
      </h3>
      {/* Region 1 */}
      <div style={{ border: "3px solid PaleVioletRed" }}>
        <form>
          First Name : &ensp;
          <input
            type="text"
            value={customer.firstName}
            onChange={(e) =>
              setCustomer({ ...customer, firstName: e.target.value })
            }
          />
          <br />
          Last Name : &ensp;
          <input
            type="text"
            value={customer.lastName}
            onChange={(e) =>
              setCustomer({ ...customer, lastName: e.target.value })
            }
          />
          <br />
          City : &ensp;
          <input
            type="text"
            value={customer.city}
            onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
          />
          <br />
          <input
            type="button"
            value="Update"
            onClick={() => updateCustomer()}
          />
          <br />
          <input
            type="button"
            value="Delete This Customer"
            onClick={() => deleteCustomer()}
          />
        </form>
      </div>
      {/* End of region 1 */}
      <br />
      {/* Region 2 */}
      <div style={{ border: "3px solid PaleVioletRed" }}>
        Other Products This Customer Has Bought :
        <ul>
          {productsBought.map((product) => {
            return (
              <li key={product.id}>
                <Link to={"/editProduct/" + product.id}>{product.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* End of region 2 */}
      <br />
      <Link to="/customers">Back to Customers Page</Link>
      <br />
      <Link to="/products">Back to Productss Page</Link>
      <br />
      <br />
    </div>
  );
}

export default SP_editCustomer;

// @author Tamar Cohen
