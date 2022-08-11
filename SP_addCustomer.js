// @author Tamar Cohen

import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// My addition

function SP_addCustomer() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.customers.length);
  const [customer, setCustomer] = useState({
    id: id,
    firstName: "",
    lastName: "",
    city: "",
  });

  const addCustomer = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD CUSTOMER", payload: customer });
    alert("Added");
  };

  return (
    <div
      style={{
        border: "3px solid MediumVioletRed",
        backgroundColor: "LightCoral",
      }}
    >
      <h3>Add A Customer</h3>
      <form onSubmit={(e) => addCustomer(e)}>
        First Name : &ensp;
        <input
          type="text"
          onChange={(e) =>
            setCustomer({ ...customer, firstName: e.target.value })
          }
          required
        />
        <br />
        Last Name : &ensp;
        <input
          type="text"
          onChange={(e) =>
            setCustomer({ ...customer, lastName: e.target.value })
          }
          required
        />
        <br />
        City : &ensp;
        <input
          type="text"
          onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
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

export default SP_addCustomer;

// @author Tamar Cohen
