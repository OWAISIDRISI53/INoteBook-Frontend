import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const submitHadler = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ email: cred.email, password: cred.password }),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("user-name", json.name);
      navigate("/");
      window.location.reload();
      setSuccess(json.success);
    } else {
      // alert("invalid credentails");
      setSuccess(json.success);
      setTimeout(() => {
        setSuccess(true);
        setCred({ ...cred, password: "" });
      }, 3000);
    }
    console.log(json);
  };

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-5 my_container">
      <form onSubmit={submitHadler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}
            value={cred.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={onChange}
            value={cred.password}
          />
        </div>
        {success === false && (
          <div id="emailHelp" className="text-danger my-2 error">
            Please try to login with correct email and password
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={cred.password.length < 5}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
