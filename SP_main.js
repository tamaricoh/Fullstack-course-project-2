// @author Tamar Cohen

import { Routes, Route } from "react-router-dom";
import SP_menu from "./SP_menu";
import SP_products from "./SP_products";
import SP_editProduct from "./SP_editProduct";
import SP_addProduct from "./SP_addProduct";
import SP_customers from "./SP_customers";
import SP_editCustomer from "./SP_editCustomer";
import SP_addCustomer from "./SP_addCustomer";
import SP_purchases from "./SP_purchases";
import SP_users from "./SP_users";
import SP_allDataToConsole from "./SP_allDataToConsole";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SP_main() {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.activeUser.role); // If "Admin" - Additional links
  // Data inserted by user :
  const [name, setName] = useState("Final Projact - React");
  const [password, setPassword] = useState("Admin");
  //

  const [whatToShow, setWhatToShow] = useState(false); // True -> Menu , False -> Opening
  const [enterData, setEnterData] = useState(false); // If user chose to insert two customers and two products by himself
  const [customer1, setCustomer1] = useState({ id: "0" });
  const [customer2, setCustomer2] = useState({ id: "1" });
  const [product1, setProduct1] = useState({ id: "0" });
  const [product2, setProduct2] = useState({ id: "1" });
  //

  const [isLog, setIsLog] = useState(false); // True -> someone is logged
  const [isAdmin, setIsAdmin] = useState(false); // True -> logged user is an Admin

  useEffect(() => {
    if (userType == "Admin") setIsAdmin(true);
  });

  // User can enter two customers and two products
  // or use default data

  const defaultData = () => {
    // Initial data as asked
    setWhatToShow(true);
    dispatch({
      type: "ADD PRODUCT",
      payload: { id: 0, name: "Apple", price: 3, quantity: 10 },
    });
    dispatch({
      type: "ADD PRODUCT",
      payload: { id: 1, name: "Orange", price: 3, quantity: 10 },
    });
    dispatch({
      type: "ADD CUSTOMER",
      payload: { id: 0, firstName: "Avi", lastName: "Cohen", city: "Tel Aviv" },
    });
    dispatch({
      type: "ADD CUSTOMER",
      payload: {
        id: 1,
        firstName: "Anat",
        lastName: "Cohen",
        city: "Tel Aviv",
      },
    });
  };

  const createStore = (e) => {
    e.preventDefault();
    // Initial data as asked
    setWhatToShow(true);
    dispatch({
      type: "ADD PRODUCT",
      payload: product1,
    });
    dispatch({
      type: "ADD PRODUCT",
      payload: product2,
    });
    dispatch({
      type: "ADD CUSTOMER",
      payload: customer1,
    });
    dispatch({
      type: "ADD CUSTOMER",
      payload: customer2,
    });
  };

  return (
    <div
      style={{
        border: "3px solid BlueViolet",
        backgroundColor: "LavenderBlush",
      }}
    >
      {!whatToShow ? (
        <div>
          <h1>Welcome to Tamar's stores website</h1>
          <h3>Where you can build your own online store</h3>
          <br />
          <br />
          Please enter your store's name and an Admin password (default password
          will be "Admin")
          <br />
          Store's Name : &ensp;
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <br />
          Admin Password : &ensp;
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
          <br />
          <br />
          Now, you can enter two customers and two products by clicking here
          <br />
          <input
            type="button"
            value="Enter Data"
            onClick={() => setEnterData(true)}
          />
          <br />
          <br />
          {enterData && (
            <form style={{ border: "1px solid black" }} onSubmit={createStore}>
              Enter Two Customers and Two Products :
              <br />
              <br />
              <div
                style={{
                  border: "1px solid black",
                  width: "80%",
                  margin: "0 auto",
                }}
              >
                First Customer :
                <br />
                <br />
                First Name : &ensp;
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setCustomer1({ ...customer1, firstName: e.target.value })
                  }
                />
                &ensp; Last Name : &ensp;
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setCustomer1({ ...customer1, lastName: e.target.value })
                  }
                />
                &ensp; City : &ensp;
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setCustomer1({ ...customer1, city: e.target.value })
                  }
                />
                <br />
                <br />
                Second Customer :
                <br />
                <br />
                First Name : &ensp;
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setCustomer2({ ...customer2, firstName: e.target.value })
                  }
                />
                &ensp; Last Name : &ensp;
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setCustomer2({ ...customer2, lastName: e.target.value })
                  }
                />
                &ensp; City : &ensp;
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setCustomer2({ ...customer2, city: e.target.value })
                  }
                />
                <br />
                <br />
              </div>
              <br />
              <div
                style={{
                  border: "1px solid black",
                  width: "80%",
                  margin: "0 auto",
                }}
              >
                First Product :
                <br />
                <br />
                Name : &ensp;
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setProduct1({ ...product1, name: e.target.value })
                  }
                />
                &ensp; Price : &ensp;
                <input
                  type="number"
                  required
                  onChange={(e) =>
                    setProduct1({ ...product1, price: +e.target.value })
                  }
                />
                &ensp; Quantity : &ensp;
                <input
                  type="number"
                  required
                  onChange={(e) =>
                    setProduct1({ ...product1, quantity: e.target.value })
                  }
                />
                <br />
                <br />
                Second Product :
                <br />
                <br />
                Name : &ensp;
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setProduct2({ ...product2, name: e.target.value })
                  }
                />
                &ensp; Price : &ensp;
                <input
                  type="number"
                  required
                  onChange={(e) =>
                    setProduct2({ ...product2, price: +e.target.value })
                  }
                />
                &ensp; Quantity : &ensp;
                <input
                  type="number"
                  required
                  onChange={(e) =>
                    setProduct2({ ...product2, quantity: +e.target.value })
                  }
                />
                <br />
                <br />
              </div>
              <br />
              <input type="submit" value="Create your store" />
            </form>
          )}
          <br />
          Or use default data for testing by clicking here
          <br />
          <input type="button" value="Testing" onClick={() => defaultData()} />
          <br />
          <br />
        </div>
      ) : (
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <SP_menu
                  name={name}
                  isLog={isLog}
                  callbackSetIsLog={setIsLog}
                  isAdmin={isAdmin}
                  callbackSetIsAdmin={setIsAdmin}
                />
              }
            />
            <Route
              path="/products"
              element={<SP_products isAdmin={isAdmin} />}
            />
            <Route path="/editProduct/:id" element={<SP_editProduct />} />
            <Route path="/addProduct" element={<SP_addProduct />} />
            <Route
              path="/customers"
              element={<SP_customers isAdmin={isAdmin} />}
            />
            <Route path="/editCustomer/:id" element={<SP_editCustomer />} />
            <Route path="/addCustomer" element={<SP_addCustomer />} />
            <Route path="/purchases" element={<SP_purchases />} />
            <Route
              path="/users"
              element={
                <SP_users
                  callbackSetIsLog={setIsLog}
                  adminPassword={password}
                />
              }
            />
            <Route path="/allDataToConsole" element={<SP_allDataToConsole />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default SP_main;

// @author Tamar Cohen
