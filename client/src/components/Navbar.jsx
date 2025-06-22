import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import Model from "../components/Model";
import Login from "../components/Login";
import Register from "../components/Register";
import { useUser } from "./UserContext";

const Navbar = () => {
  const [loginModel, setLoginModel] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const { user, setUser } = useUser();

  const navigate = useNavigate();

  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
  };

  const openModel = () => {
    setLoginModel(!loginModel);
  };

  const handleForm = () => {
    setRegisterForm(!registerForm);
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get("/");

      try {
        // console.log("enter");
        //console.log(response);
        if (response.data.loggedIn) {
          setUser(response.data.user);
          navigate("/profile");
        } else {
          setUser("");
          navigate("/");
        }
      } catch (error) {
        setUser("");
      }
    };

    getUser();
  }, []);

  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-center">
        <div className="left d-flex align-items-center gap-4 ms-3">
          <Link to="/">
            <img src={Logo} height="50px" alt="Logo" />
          </Link>

          {user ? (
            <>
              <Link
                to="/"
                className="text-decoration-none text-success fw-semibold"
              >
                Home
              </Link>

              <Link
                to="/profile"
                className="text-decoration-none text-success fw-semibold"
              >
                Profile
              </Link>
            </>
          ) : null}
        </div>
        <div className="right me-3">
          {user ? (
            <div className="d-flex gap-2">
              <img
                src={`http://localhost:3000/${user.profilepic}`}
                height="50px"
                width="50px"
                className="rounded-circle"
                alt=""
              />
              <div className="d-flex flex-column">
                <span className="text-success">{user.name}</span>
                <Link
                  onClick={logout}
                  className="text-secondary text-decoration-none"
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <Link
              className="text-decoration-none text-success standard-font"
              onClick={openModel}
            >
              Login/Register
            </Link>
          )}
        </div>
      </div>

      {loginModel && (
        <Model show="true" onHide={() => setLoginModel(false)}>
          {registerForm ? (
            <Register
              setLoginModel={setLoginModel}
              loginModel={loginModel}
              setUser={setUser}
            />
          ) : (
            <Login
              setLoginModel={setLoginModel}
              loginModel={loginModel}
              setUser={setUser}
            />
          )}

          <div className="text-center mt-2">
            <Link onClick={handleForm}>
              {registerForm ? "Already have account" : "Create account"}
            </Link>
          </div>
        </Model>
      )}
    </div>
  );
};

export default Navbar;
