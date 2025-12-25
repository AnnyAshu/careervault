//------------Using AuthSclice redux -------------------------//
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import LandingPage from "./LandingPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <LandingPage />
  </Provider>
);



//------------ Using Auth Hook and Auth Context -----------------//

// import React from "react";
// import ReactDOM from "react-dom/client";
// import LandingPage from "./LandingPage";
// import { AuthProvider } from "./context/authcontext";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles/global.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <AuthProvider>
//     <LandingPage />
//   </AuthProvider>
// );





