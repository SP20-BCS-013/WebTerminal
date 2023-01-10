import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [token, setToken] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });
  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      credentials.name.trim().length <= 0 ||
      credentials.password.trim().length <= 0
    ) {
      alert("Enter valid Input");
      setCredentials({
        name: "",
        password: "",
      });
      return;
    }
    console.log(
      JSON.stringify({
        username: credentials.name,
        password: credentials.password,
      })
    );
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.name,
        password: credentials.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("authToken", res.token);
        setToken(localStorage.getItem("authToken"));
        console.log(localStorage.getItem("authToken"));
      });
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container">
        <div className="text-justify">LoginPage</div>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-black"
            >
              Username
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-black"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
        </form>
        {token.length > 0 && <div>{token}</div>}
      </div>
    </div>
  );
}
