import React from "react";
import SignIn from "./views/Auth/SignIn";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import Main from "./views/Auth/main/Main";

function App() {
  const { token } = useSelector((state) => state.account);
  // console.log(token);
  if (token) {
    return <Main/>;
  }
  return <SignIn />;
}

export default App;
