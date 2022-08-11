// @author Tamar Cohen

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

// EX 1
// 3 links. Each redirect to another page

function SP_menu(props) {
  const user = useSelector((state) => state.activeUser);
  const dispatch = useDispatch();
  const isLog = props.isLog;
  const isAdmin = props.isAdmin;

  return (
    <div style={{ border: "3px solid purple", backgroundColor: "pink" }}>
      <h3>Welcome to {props.name}!</h3>
      {isLog && (
        <div>
          <label>Hello {user.userName} !</label>
          <br />
          <input
            type="button"
            value="Log Out"
            onClick={() => {
              dispatch({ type: "LOGOUT" });
              props.callbackSetIsLog(false);
              props.callbackSetIsAdmin(false);
            }}
          />
        </div>
      )}
      <br />
      <br />
      <Link to="/products">Products</Link>
      <br />
      <Link to="/customers">Customers</Link>
      <br />
      <Link to="/purchases">Purchases</Link>
      <br />
      <Link to="/users">Login or Sign up</Link>
      <br />
      <br />
      {isAdmin && (
        <span>
          Admin Only Operations :
          <br />
          <Link to="/addCustomer">Add A Customer</Link>
          <br />
          <Link to="/addProduct">Add A Product</Link>
          <br />
          <Link to="/allDataToConsole">Print All Data To Console</Link>
        </span>
      )}
      <br />
      <br />
    </div>
  );
}

export default SP_menu;

// @author Tamar Cohen
