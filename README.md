# Fullstack-course-project-2

## An online store website


### What

This is a React project, implemented as part of a fullstack course led by Yaniv Arad.

The project is an infrastructure of an online shop. 

The main functions are :
1. Create a shop.
2. Add users (Admin users and simple users) with role based access control.
3. Inventory management.
4. Buyers management.
5. Transactions tracking.

This a single page application (SPA) that uses 'react-router-dom' module to set current component and to set the URL.
It also uses 'react-redux' module as a local database to store the data.

### How

1. Create a React App on your VSC.
   Then, add those files to the app.
2. Download to your app two modules -

   - react-router-dom
   ``` npm install react-router-dom ```
   - react-redux
   ``` npm install react-redux ```

3. Your App.js file should look like the following :

   ```
   import logo from "./logo.svg";
   import "./App.css";
   import { BrowserRouter } from "react-router-dom";
   import SP_main from "./SP_main";
   function App() {
    return (
    <div className="App">
    <BrowserRouter>
        <SP_main />
    </BrowserRouter>
    </div>
        );
   }
   export default App;
   ```

4. Your Index.js file should look like the following :

   ```

   import React from "react";
   import ReactDOM from "react-dom/client";
   import "./index.css";
   import App from "./App";
   import reportWebVitals from "./reportWebVitals";
   import { createStore } from "redux";
   import { Provider } from "react-redux";
   import appReducer from "./SP_reducer";
   const root = ReactDOM.createRoot(document.getElementById("root"));
   root.render(
   <Provider store={createStore(appReducer)}>
    <App />
   </Provider>
   );

   reportWebVitals();
   ```

5. Run ``` npm start ``` :)
