// @author Tamar Cohen

import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function SP_purchases() {
  const storeData = useSelector((state) => state);
  const [customersToPresent, setCustomersToPresent] = useState(
    storeData.customers
  ); // [Chosen customer] or [All customers]
  const [productsToPresent, setProductsToPresent] = useState(
    storeData.products
  ); // [Chosen product] or [All productss]

  const [specificPurchases, setSpecificPurchases] = useState([]); // [Purchases to show]
  const tableStyle = {
    border: "2px solid MediumVioletRed",
    margin: "0 auto",
    visibility: specificPurchases.length == 0 ? "hidden" : "visible",
  }; // If there are no Purchases to show -> hide the table headers

  const [date, setDate] = useState(""); // Date entered from user. format 'YYYY-MM-DD'

  const getSpecificPurchases = () => {
    // Builds an array which contains the purchases according to the given data
    let purchases = storeData.purchases;
    let specificPurchasesCustomers = []; // Purchases according to the chosen customer
    if (customersToPresent.length > 1) specificPurchasesCustomers = purchases;
    // If no customer was chosen (== copy of Purchases)
    // Else -> 'filter' purchases to only contain *this* customer purchases
    else
      purchases.forEach((purchase) => {
        {
          if (customersToPresent[0].id == purchase.customerID)
            specificPurchasesCustomers.push(purchase);
        }
      });
    let specificPurchases = []; // Purchases according to the chosen product
    if (productsToPresent.length > 1)
      specificPurchases = specificPurchasesCustomers;
    // If no product was chosen (== copy of Purchases or purchases.filter)
    // Else -> 'filter' purchases to only contain *this* product purchases
    else
      specificPurchasesCustomers.forEach((purchase) => {
        {
          if (productsToPresent[0].id == purchase.productID)
            specificPurchases.push(purchase);
        }
      });
    if (date.length > 0) {
      // If user entered a date
      let dateFilter = `${parseInt(date.slice(8, 10))}/${parseInt(
        date.slice(5, 7)
      )}/${parseInt(date.slice(0, 4))}`;
      // from format 'YYYY-MM-DD' to 'DD/MM/YYYY'
      specificPurchases = specificPurchases.filter((purchase) => {
        if (purchase.date == dateFilter) return purchase;
      }); // filter purchases to only contain purchases with purchase.date == dateFilter
    }
    return specificPurchases;
  };

  const getCustomerNameByID = (id) => {
    // Return customer's full name
    let customers = storeData.customers;
    customers = customers.filter((customer) => {
      if (customer.id == id) return customer;
    });
    return customers[0].firstName + " " + customers[0].lastName;
  };

  const getProductNameByID = (id) => {
    // Return product's name
    let products = storeData.products;
    products = products.filter((product) => {
      if (product.id == id) return product;
    });
    return products[0].name;
  };

  const clearForm = () => {
    // Reset form and clears some States
    document.getElementById("_formID").reset();
    setCustomersToPresent(storeData.customers);
    setProductsToPresent(storeData.products);
    setDate("");
    setSpecificPurchases([]);
  };

  return (
    <div style={{ backgroundColor: "Thistle" }}>
      <h3>Purchases Page</h3>
      <form id="_formID">
        PRODUCTS :
        <br />
        {storeData.products.map((product) => {
          return (
            <span key={product.id}>
              <input
                type="radio"
                name="product"
                onChange={() => setProductsToPresent([product])}
              />
              {product.name}
              <br />
              Price : {product.price}
              <br />
            </span>
          );
        })}
        <br />
        <br />
        CUSTOMERS :
        <br />
        {storeData.customers.map((customer) => {
          return (
            <span key={customer.id}>
              <input
                type="radio"
                name="customer"
                onClick={() => setCustomersToPresent([customer])}
              />
              {customer.firstName + " " + customer.lastName}
              <br />
            </span>
          );
        })}
        <br />
        <br />
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <br />
        <br />
        <input
          type="button"
          value="Search"
          onClick={() => setSpecificPurchases(getSpecificPurchases())}
        />
        <input type="button" value="Clear" onClick={() => clearForm()} />
        <br />
        <br />
      </form>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={tableStyle}>Customer</th>
            <th style={tableStyle}>Product</th>
            <th style={tableStyle}>Date</th>
          </tr>
          {specificPurchases.map((purchase) => {
            return (
              <tr key={purchase.id}>
                <td style={tableStyle}>
                  {getCustomerNameByID(purchase.customerID)}
                </td>
                <td style={tableStyle}>
                  {getProductNameByID(purchase.productID)}
                </td>
                <td style={tableStyle}>{purchase.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <Link to="/">Back To Menu</Link>
      <br />
      <br />
    </div>
  );
}

export default SP_purchases;

// @author Tamar Cohen
