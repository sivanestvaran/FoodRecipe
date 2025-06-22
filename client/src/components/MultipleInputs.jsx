import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiCircleMinus } from "react-icons/ci";
const MultipleInputs = ({ setRecipe, recipe, field }) => {
  // const [inputs, setInputs] = useState([""]);

  const addInputText = () => {
    setRecipe((prev) => ({ ...prev, [field]: [...(prev[field] || []), ""] }));
  };

  const handleOnChange = (index, event) => {
    const newInputs = [...recipe];
    newInputs[index] = event.target.value;
    setRecipe((prev) => ({ ...prev, [field]: newInputs }));
    // console.log(recipe)
  };

  const removeInput = (idx) => {
    const filteredInputs = recipe.filter((_, index) => index !== idx);
    setRecipe((prev) => ({ ...prev, [field]: filteredInputs }));
    //  console.log(recipe)
  };

  return (
    <>
      {recipe?.map((input, index) => (
        <div key={index} className="mb-2 d-flex gap-2">
          <Form.Control
            type="text"
            value={input}
            size="sm"
            onChange={(e) => handleOnChange(index, e)}
          />
          <Button
            onClick={() => removeInput(index)}
            variant="btn"
            size="sm"
            // disabled={recipe.length == 1}
            // className={recipe.length == 1 && "d-none "}
          >
            <CiCircleMinus className="text-danger" />
          </Button>
        </div>
      ))}

      <Button onClick={addInputText} variant="btn" size="sm">
        <IoAddCircleOutline className="text-success" />
      </Button>
    </>
  );
};

export default MultipleInputs;
