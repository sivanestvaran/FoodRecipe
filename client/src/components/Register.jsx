import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "../../utils/axiosInstance";
import { getUser, validation } from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
// import Cookie from "js-cookie";

const Register = ({ setLoginModel, loginModel, setUser }) => {
  const triggerFile = useRef();
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(
    "https://cdn-icons-png.flaticon.com/512/2716/2716054.png"
  );

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const OpenFile = () => {
    triggerFile.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    const maxFileSize = 3 * 1024 * 1024;

    if (file.size > maxFileSize) {
      toast.error("Max photo size is 3MB", {
        theme: "dark",
      });
      return;
    }

    if (file) {
      setMessage("");
      setFileName(file.name);
      const selected = URL.createObjectURL(file);
      setPreview(selected);
      setRegisterData((prev) => ({ ...prev, photo: file }));
    }
  };

  const removePreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview("https://cdn-icons-png.flaticon.com/512/2716/2716054.png");
      setFileName("");
      setRegisterData((prev) => {
        const { photo, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    let messages = validation(registerData);
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

    for (let key in registerData) {
      formData.append(key, registerData[key]);
    }

    const response = await axios.post("/signup", formData);
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

    setRegisterData({});
    removePreview();
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {message && <p className="text-danger">{message}</p>}
      <div className="d-md-flex gap-3 justify-content-center align-items-center">
        <Form.Label>Upload Image : </Form.Label>
        <Link onClick={OpenFile}>
          <img
            src={preview}
            height="100px"
            width="100px"
            alt=""
            className="rounded-circle border object-fit-cover"
          />
        </Link>
      </div>
      <a className="d-block text-center text-decoration-none text-success">
        {fileName}{" "}
        {fileName && (
          <MdDelete onClick={removePreview} className="text-danger pointer" />
        )}
      </a>
      <Form.Control
        type="file"
        ref={triggerFile}
        className="d-none"
        accept="image/*"
        onChange={(e) => handleChange(e)}
      ></Form.Control>

      <Form.Group className="mb-3">
        <Form.Label>Name :</Form.Label>
        <Form.Control
          type="text"
          value={registerData.name || ""}
          placeholder="Enter your name"
          onChange={(e) =>
            setRegisterData((prev) => ({ ...prev, name: e.target.value }))
          }
        ></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email Address :</Form.Label>
        <Form.Control
          type="email"
          value={registerData.email || ""}
          placeholder="Enter your email"
          onChange={(e) =>
            setRegisterData((prev) => ({ ...prev, email: e.target.value }))
          }
        ></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password :</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          value={registerData.password || ""}
          onChange={(e) => {
            setRegisterData((prev) => ({ ...prev, password: e.target.value }));
          }}
        ></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3 standard-font">
        <Form.Label className="standard-font">Confirm Password :</Form.Label>
        <Form.Control
          type="password"
          value={registerData.confirm || ""}
          placeholder="Confirm your password"
          onChange={(e) => {
            setRegisterData((prev) => ({ ...prev, confirm: e.target.value }));
          }}
        ></Form.Control>
      </Form.Group>

      <div className="d-grid">
        <Button
          type="submit"
          variant="success"
          disabled={message == "" ? false : true}
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default Register;
