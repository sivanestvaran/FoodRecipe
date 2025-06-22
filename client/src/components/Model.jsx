import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "./Button";

const Model = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">{props.children}</Modal.Body>
    </Modal>
  );
};

export default Model;
