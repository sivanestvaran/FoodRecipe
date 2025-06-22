import React from "react";

const RecipeDisplay = ({ recipe, preview }) => {
  return (
    <div className="card  shadow-sm border-0">
      <div className="position-absolute top-0 start-50 translate-middle-x bg-white clean-text text-success rounded-bottom px-3">
        {recipe.categories}
      </div>
      <img
        src={
          recipe.image
            ? preview
            : "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg"
        }
        className="card-img-top"
        style={{ maxHeight: "300px" }}
        alt="..."
      />
      <div className="card-body">
        <h6 className="card-title bold-title text-center text-success">
          {recipe.title}
        </h6>
        <div className="d-flex justify-content-between">
          <p className="text-secondary fw-bold">
            Servings :{" "}
            <small className="text-black fw-normal clean-text">
              {recipe.servings}
            </small>
          </p>
          <p className="text-secondary fw-bold">
            Time :{" "}
            <small className="text-black fw-normal clean-text">
              {recipe.time}
            </small>
          </p>
        </div>

        <div className="mt-4">
          <p className="text-secondary m-0 fw-bold">Ingredients:</p>
          {recipe?.ingredients?.length > 0 ? (
            recipe.ingredients?.map((item, index) => (
              <span key={index} className="m-0 p-0">
                <small className="clean-text">
                  {" "}
                  {index != 0 ? item && "," + item : item}{" "}
                </small>
              </span>
            ))
          ) : (
            <span className="m-0 p-0">
              <small className="clean-text"> [Ingredients] </small>
            </span>
          )}
        </div>
        <div className="mt-4">
          <span className="text-secondary fw-bold">Directions:</span>
          {recipe.direction?.map((item, index) => (
            <p key={index} className="m-0 clean-text">
              <small className="clean-text">
                {" "}
                {(item && index + 1 + "- ") + item}{" "}
              </small>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
