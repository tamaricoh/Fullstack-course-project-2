// @author Tamar Cohen

const SP_reducer = (
  state = {
    products: [],
    customers: [],
    purchases: [],
    users: [],
    activeUser: {},
  },
  action
) => {
  switch (action.type) {
    case "ADD PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
      break;

    case "ADD CUSTOMER":
      return { ...state, customers: [...state.customers, action.payload] };
      break;

    case "ADD PURCHASE":
      // Update the product's quantity and add payload to 'purchases' array
      let tempProductsArr3 = state.products;
      let indexOfProductToUpdate2 = tempProductsArr3.findIndex(
        (product) => product.id == action.payload.productID
      );
      tempProductsArr3[indexOfProductToUpdate2] = {
        ...tempProductsArr3[indexOfProductToUpdate2],
        quantity: tempProductsArr3[indexOfProductToUpdate2].quantity - 1,
      };
      return {
        ...state,
        purchases: [...state.purchases, action.payload],
      };

    case "ADD USER":
      return { ...state, users: [...state.users, action.payload] };
      break;

    case "DELETE PRODUCT":
      // Delete from products array and related data from purchases array
      let tempProductsArr1 = state.products;
      tempProductsArr1 = tempProductsArr1.filter((product) => {
        if (product.id != action.payload) return product;
      });
      let tempPurchasesArr1 = state.purchases;
      tempPurchasesArr1 = tempPurchasesArr1.filter((purchase) => {
        if (purchase.productID != action.payload) return purchase;
      });
      return {
        ...state,
        products: tempProductsArr1,
        purchases: tempPurchasesArr1,
      };
      break;

    case "DELETE CUSTOMER":
      // Delete from customers array and related data from purchases array
      let tempCustomersArr1 = state.customers;
      tempCustomersArr1 = tempCustomersArr1.filter((customer) => {
        if (customer.id != action.payload) return customer;
      });
      let tempPurchasesArr2 = state.purchases;
      tempPurchasesArr2 = tempPurchasesArr2.filter((purchase) => {
        if (purchase.customerID != action.payload) return purchase;
      });
      return {
        ...state,
        customers: tempCustomersArr1,
        purchases: tempPurchasesArr2,
      };
      break;

    case "UPDATE PRODUCT":
      // Replace info with payload
      let tempProductsArr2 = state.products;
      let indexOfProductToUpdate1 = tempProductsArr2.findIndex(
        (product) => product.id == action.payload.id
      );
      tempProductsArr2[indexOfProductToUpdate1] = action.payload;
      return {
        ...state,
        products: tempProductsArr2,
      };
      break;

    case "UPDATE CUSTOMER":
      // Replace info with payload
      let tempCustomersArr2 = state.customers;
      let indexOfCustomerToUpdate = tempCustomersArr2.findIndex(
        (customer) => customer.id == action.payload.id
      );
      tempCustomersArr2[indexOfCustomerToUpdate] = action.payload;
      return {
        ...state,
        customers: tempCustomersArr2,
      };
      break;

    case "LOGIN":
      // Sets activeUser to action.payload + its role
      let tempUsersArr = state.users;
      let userLogged = tempUsersArr.filter((user) => {
        if (
          (user.userName == action.payload.userName) &
          (user.password == action.payload.password)
        )
          return user;
      });
      return {
        ...state,
        activeUser: userLogged[0],
      };

    case "LOGOUT":
      return {
        ...state,
        activeUser: {},
      };

    default:
      return state;
  }
};

export default SP_reducer;

// @author Tamar Cohen
