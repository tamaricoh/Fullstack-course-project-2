// @author Tamar Cohen

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SP_product from "./SP_product";

// EX 2
// Two regions
// 1.
// Presents the total amount of purchased products
// 2.
// Presents all products data.
//(Name, Price, Quantity, list of customers who bought the product)

function SP_products(props) {
  const storeData = useSelector((state) => state);

  return (
    <div
      style={{
        backgroundColor: "LightCyan",
        border: "3px solid DarkMagenta",
      }}
    >
      <h3>Products Page</h3>
      {/* Region 1 */}
      <div style={{ border: "3px solid Orchid" }}>
        Total amount of purchased products : {storeData.purchases.length}
      </div>
      {/* End of region 1 */}
      <br />
      {/* Region 2 */}
      <div style={{ border: "3px solid Orchid" }}>
        {storeData.products.map((product) => {
          return (
            <SP_product
              key={product.id}
              product={product}
              isAdmin={props.isAdmin}
            />
          );
        })}
      </div>
      {/* End of region 2 */}
      <br />
      <Link to="/">Back To Menu</Link>
      <br />
      <br />
    </div>
  );
}

export default SP_products;

// @author Tamar Cohen
