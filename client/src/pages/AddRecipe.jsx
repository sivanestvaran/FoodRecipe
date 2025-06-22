import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import MultipleInputs from "../components/MultipleInputs";
import Button from "react-bootstrap/esm/Button";
import { IoSave } from "react-icons/io5";
import RecipeDisplay from "../components/RecipeDisplay";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    categories: "",
    title: "",
    time: "",
    servings: "",
    ingredients: [],
    direction: [],
    image: "",
  });

  const navigate = useNavigate();

  const [preview, setPreview] = useState(
    "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg"
  );

  const handleOnChange = (e) => {
    setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(recipe);
  };

  const handleOnImageChange = (e) => {
    const file = e.target.files[0];

    if (recipe.image) {
      URL.revokeObjectURL(preview);
    }

    if (file) {
      const selected = URL.createObjectURL(file);
      setPreview(selected);
      setRecipe((prev) => ({
        ...prev,
        image: file,
      }));
    } else {
      const selected =
        "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg";
      setPreview(selected);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // console.log(recipe);

    const formData = new FormData();

    for (let key in recipe) {
      if (recipe[key].length == 0) {
        console.log("All inputs required");
        return;
      }

      if (Array.isArray(recipe[key])) {
        recipe[key].forEach((item) => formData.append(`${key}[]`, item));
      } else {
        // console.log("key :" + key + "  " + "value : " + recipe[key]);
        formData.append(key, recipe[key]);
      }
      //formData.append(key, recipe[key]);
    }

    const response = await axios.post("/recipe/add", formData);

    navigate("/profile");
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center  gap-3 p-3">
        <div className="col-md-4   col-12 shadow-sm">
          <form onSubmit={(e) => handleOnSubmit(e)}>
            <Form.Group className="mb-2">
              <Form.Label>Categories :</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Categories"
                name="categories"
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Title :</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="title"
                placeholder="Title"
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Time :</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="time"
                placeholder="Time"
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Servings :</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="servings"
                placeholder="2"
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Ingredients :</Form.Label>
              <MultipleInputs
                setRecipe={setRecipe}
                recipe={recipe.ingredients}
                field="ingredients"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Direction :</Form.Label>
              <MultipleInputs
                setRecipe={setRecipe}
                recipe={recipe.direction}
                field="direction"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Upload Image :</Form.Label>
              <Form.Control
                size="sm"
                onChange={(e) => handleOnImageChange(e)}
                type="file"
              />
            </Form.Group>

            <div className="d-grid  p-3">
              <Button
                variant="outline-success"
                type="submit"
                className=""
                size="sm"
              >
                <IoSave /> Save
              </Button>
            </div>
          </form>
        </div>
        <div className="col-md-4 col-12">
          <RecipeDisplay recipe={recipe} preview={preview} />
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
