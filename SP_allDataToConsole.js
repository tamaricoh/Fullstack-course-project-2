// @author Tamar Cohen

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// My addition

function SP_allDataToConsole() {
  const data = useSelector((state) => state);

  const print = (x) => {
    console.log(x);
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
        value="Customers"
        onClick={() => print(data.customers)}
      />
      <br />
      <input
        type="button"
        value="Products"
        onClick={() => print(data.products)}
      />
      <br />
      <input
        type="button"
        value="Purchases"
        onClick={() => print(data.purchases)}
      />
      <br />
      <input type="button" value="Users" onClick={() => print(data.users)} />
      <br />
      <input
        type="button"
        value="Active User"
        onClick={() => print(data.activeUser)}
      />
      <br />

      <Link to="/">Back To Menu</Link>
      <br />
      <br />
    </div>
  );
}

export default SP_allDataToConsole;

// @author Tamar Cohen
