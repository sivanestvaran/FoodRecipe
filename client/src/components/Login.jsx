import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUser, validation } from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../utils/axiosInstance";

const Login = ({ setLoginModel, loginModel, setUser }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.dismiss();
    let messages = validation(loginData);
    if (messages.length != 0) {
      for (let msg of messages) {
        toast.error(msg, {
          theme: "dark",
        });
      }
      return;
    }

    //console.log(registerData);
    const formData = new FormData();

    for (let key in loginData) {
      formData.append(key, loginData[key]);
    }

    const response = await axios.post("/login", formData);
    const data = await response.data;

    if (data.status == "success") {
      toast.success(data.message, {
        theme: "dark",
      });
    }

    // Cookie.set("token", data.token, { expires: 1 });
    setLoginModel(!loginModel);

    const user = await getUser();

    setUser(user);

    navigate("/profile");

    setLoginData({});
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="mb-3 standard-font">
        <Form.Label className="standard-font">Email Address :</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          onChange={(e) =>
            setLoginData((prev) => ({ ...prev, email: e.target.value }))
          }
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3 standard-font">
        <Form.Label className="standard-font">Password :</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          onChange={(e) =>
            setLoginData((prev) => ({ ...prev, password: e.target.value }))
          }
        ></Form.Control>
      </Form.Group>
      <div className="d-grid">
        <Button type="submit" variant="success">
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
