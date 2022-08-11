// @author Tamar Cohen

import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// EX 3
// Two regions
// 1.
// A form - update or delete (delete will also remove his purchases)
// 2.
// List of all the customers who purchased this product -> link to 'Edit customer' page

function SP_editProduct() {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);
  const id = useParams().id; // ProductID
  const productArr = storeData.products.filter((product) => {
    if (product.id == id) return product;
  }); // [This product]

  const [product, setProduct] = useState(productArr[0]); // This product (copy)

  const deleteProduct = () => {
    dispatch({ type: "DELETE PRODUCT", payload: id });
  };

  const updateProduct = () => {
    // If the info hasn't changed -> alert.
    // Else -> dispatch
    if (
      (product.name == productArr[0].name) &
      (product.price == productArr[0].price) &
      (product.quantity == productArr[0].quantity)
    )
      alert("Please Enter New Info");
    else dispatch({ type: "UPDATE PRODUCT", payload: product });
  };

  const listOfCustomers = () => {
    // Build an array with all customers who bought this product
    let purchasesCoustomersID = storeData.purchases; // Get all purchases
    purchasesCoustomersID = purchasesCoustomersID.filter((purchase) => {
      if (purchase.productID == id) return purchase;
    }); // Filter only *this product* purchases
    purchasesCoustomersID = purchasesCoustomersID.map(
      (purchase) => purchase.customerID
    ); // Map arr to customerID
    let customers = storeData.customers; // Get all customers
    let indexOfCustomer;
    let specificCustomers = [];
    purchasesCoustomersID.forEach((customerID) => {
      indexOfCustomer = customers.findIndex(
        (customer) => customer.id == customerID
      );
      specificCustomers.push(customers[indexOfCustomer]);
    }); // Create array of all customers who bought this product
    return specificCustomers;
  };
  const customersBought = listOfCustomers();

  return (
    <div style={{ backgroundColor: "PaleTurquoise" }}>
      <h3 style={{ color: "PaleVioletRed" }}>
        Product info - Update and Delete
      </h3>
      {/* Region 1 */}
      <div style={{ border: "3px solid PaleVioletRed" }}>
        <form>
          Name : &ensp;
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <br />
          Price : &ensp;
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: +e.target.value })}
          />
          <br />
          Quantity : &ensp;
          <input
            type="number"
            value={product.quantity}
            onChange={(e) =>
              setProduct({ ...product, quantity: +e.target.value })
            }
          />
          <br />
          <input type="button" value="Update" onClick={() => updateProduct()} />
          <br />
          <input
            type="button"
            value="Delete This Product"
            onClick={() => deleteProduct()}
          />
        </form>
      </div>
      {/* End of region 1 */}
      <br />
      {/* Region 2 */}
      <div style={{ border: "3px solid PaleVioletRed" }}>
        Customers who bought this product :
        <ul>
          {customersBought.map((customer) => {
            return (
              <li key={customer.id}>
                <Link to={"/editCustomer/" + customer.id}>
                  {customer.firstName + " " + customer.lastName}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* End of region 2 */}
      <br />
      <Link to="/customers">Back to Customers Page</Link>
      <br />
      <Link to="/products">Back to Products Page</Link>
      <br />
      <br />
    </div>
  );
}

export default SP_editProduct;

// @author Tamar Cohen
