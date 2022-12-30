import React from "react";

const MyAccount = () => {
  return (
    <div className="container my-3 mx-auto">
      <h1>Welcome {localStorage.getItem("user-name")}</h1>
    </div>
  );
};

export default MyAccount;
