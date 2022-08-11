// @author Tamar Cohen

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SP_users(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users); // In Order to check login info and if userName is unavailable
  const navigate = useNavigate();
  const [login, setLogin] = useState(false); // True -> shows login form
  const [signUp, setSignUp] = useState(false); // True -> shows signup form
  const [isAvailable, setIsAvailable] = useState(true); // True -> no form is showen
  const [identical, setIdentical] = useState(true); // True -> 2 passwords entered in SIGNUP form are identical
  const [userPassword, setUserPassword] = useState(""); // First password in SIGNUP form
  const [isAdmin, setIsAdmin] = useState(false); // True -> user type is "Admin"
  const [adminConfirm, setAdminConfirm] = useState(true); // True -> Admin password is correct
  const [signUpUser, setSignUpUser] = useState({
    userName: "",
    password: "",
    role: "Simple",
  });
  const [loginUser, setLoginUser] = useState({
    userName: "",
    password: "",
  });

  // To show the passwords in SIGNUP form (user passwords or Admin password)
  const showPassword = (id) => {
    let pass = document.getElementById(id);
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  };

  const checkPasswordsMatch = (pass1, pass2) => {
    return pass1 == pass2;
  };

  // Check if userName is available -> if so , dispatch and resets local data
  const signUpFunc = (e) => {
    e.preventDefault();
    let index = users.findIndex((user) => {
      if (user.userName == signUpUser.userName) return user;
    });
    if (index == -1) {
      dispatch({ type: "ADD USER", payload: signUpUser });
      setSignUp(false);
      setIsAvailable(true);
      setSignUpUser({
        userName: "",
        password: "",
        role: "Simple",
      });
      alert("Signing Complete!");
    } else alert("User Name is unavailable ");
  };

  // Check if userName exists. if so -> check if its password is correct.
  // If userName exists and password is correct -> login
  const loginFunc = (e) => {
    e.preventDefault();
    let arror = "Wrong User Name";
    let user = users.filter((user) => {
      if (user.userName == loginUser.userName) {
        arror = "Wrong Password";
        if (user.password == loginUser.password) return user;
      }
    });
    if (user.length == 0) alert(arror);
    else {
      dispatch({ type: "LOGIN", payload: loginUser });
      props.callbackSetIsLog(true);
      navigate("/");
    }
  };

  return (
    <div
      style={{
        border: "3px solid MediumVioletRed",
        backgroundColor: "LightCoral",
      }}
    >
      <input
        type="button"
        value="SIGN UP"
        onClick={() => {
          if (isAvailable) {
            setSignUp(true);
            setIsAvailable(false);
          } else alert("Can not open 'SIGN UP' while 'LOGIN' is open");
        }}
      />
      &ensp;
      <input
        type="button"
        value="LOGIN"
        onClick={() => {
          if (isAvailable) {
            setLogin(true);
            setIsAvailable(false);
          } else alert("Can not open 'LOGIN' while 'SIGN UP' is open");
        }}
      />
      <br />
      <br />
      {signUp && (
        <div>
          <input
            type="button"
            value="X"
            style={{
              float: "right",
              background: "none",
              marginRight: "50px",
              border: "none",
            }}
            onClick={() => {
              setIsAvailable(true);
              setSignUp(false);
            }}
          />
          <br />
          <form onSubmit={signUpFunc}>
            Enter User Name : &ensp;{" "}
            <input
              type="text"
              required
              onChange={(e) =>
                setSignUpUser({ ...signUpUser, userName: e.target.value })
              }
            />
            <br />
            Enter Password : &ensp;
            <input
              type="password"
              id="_password"
              required
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <br />
            Retype Password : &ensp;
            <input
              type="password"
              id="_password2"
              required
              onChange={(e) => {
                if (checkPasswordsMatch(userPassword, e.target.value)) {
                  setIdentical(true);
                  setSignUpUser({ ...signUpUser, password: userPassword });
                } else setIdentical(false);
              }}
            />
            {!identical && <div>Passwords don't match.</div>}
            <br />
            <input
              type="checkbox"
              onClick={() => {
                showPassword("_password");
                showPassword("_password2");
              }}
            />
            Show Password
            <br />
            Please select your user's type :
            <br />
            <input
              type="radio"
              name="userType"
              onClick={() => setIsAdmin(false)}
              required
            />
            Simple user
            <br />
            <input
              type="radio"
              name="userType"
              onClick={() => setIsAdmin(true)}
              required
            />
            Admin
            <br />
            {isAdmin && (
              <div style={{ border: "1px solid black" }}>
                Please Enter Admin Password : &ensp;
                <input
                  type="password"
                  id="_adminPassword"
                  required
                  onChange={(e) => {
                    if (
                      checkPasswordsMatch(props.adminPassword, e.target.value)
                    ) {
                      setAdminConfirm(true);
                      setSignUpUser({ ...signUpUser, role: "Admin" });
                    } else setAdminConfirm(false);
                  }}
                />
                {!adminConfirm && <div>Passwords don't match.</div>}
                <br />
                <input
                  type="checkbox"
                  onClick={() => showPassword("_adminPassword")}
                />
                Show Admin Password
              </div>
            )}
            <br />
            <input type="submit" value="SIGN UP" />
          </form>
          <br />
        </div>
      )}
      {login && (
        <div>
          <input
            type="button"
            value="X"
            style={{
              float: "right",
              background: "none",
              marginRight: "50px",
              border: "none",
            }}
            onClick={() => {
              setIsAvailable(true);
              setLogin(false);
            }}
          />
          <br />
          <form onSubmit={loginFunc}>
            User Name : &ensp;
            <input
              type="text"
              required
              onChange={(e) =>
                setLoginUser({ ...loginUser, userName: e.target.value })
              }
            />
            <br />
            Password : &ensp;
            <input
              type="text"
              required
              onChange={(e) =>
                setLoginUser({ ...loginUser, password: e.target.value })
              }
            />
            <br />
            <br />
            <input type="submit" value="LOGIN" />
          </form>
        </div>
      )}
      <br />
      <Link to="/">Back To Menu</Link>
      <br />
      <br />
    </div>
  );
}

export default SP_users;

// @author Tamar Cohen
