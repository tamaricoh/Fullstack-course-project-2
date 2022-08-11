# Fullstack-course-project-2

## An online store website


### Who

[]

### Why

This is the second project of the fullstack course by [Yaniv Arad](https://www.yaniv-arad.com/fullstack/).

### How

1. Create a React App on your VSC.
   Then, add those files to the app.
2. Download to your app two moudles -

   - react-router-dom
   - react-redux

3. Copy and paste this to your App.js file

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

4. Copy and paste this to your Index.js file

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

5. Run :)
