import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useUser } from "./UserContext";
import axios from "../../utils/axiosInstance";

const Card = ({ allRecipes, pagination = false }) => {
  const [data, setData] = useState(allRecipes);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setData(allRecipes);
    setCurrentPage(1); // Reset to first page when new data is loaded
  }, [allRecipes]);

  const totalPages = Math.ceil(data.length / recipesPerPage);

  const currentRecipes = data.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  const deleteRecipe = async (itemid) => {
    await axios.delete(`/recipe/deleterecipe/${itemid}`);
    const updatedData = data.filter((item) => item._id !== itemid);
    setData(updatedData);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="d-md-flex flex-wrap justify-content-start gap-4 mb-3">
        {currentRecipes.map((item, index) => (
          <div
            key={index}
            className="card mx-auto m-2"
            style={{ width: "18rem" }}
          >
            <img
              src={`http://localhost:3000/recipes/${item.coverImage}`}
              className="card-img-top"
              alt="..."
              height={"200px"}
            />
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2 text-secondary time-serve">
                <span>{item.servings} Servings</span>
                <span>{item.time} Mins</span>
              </div>
              <h6 className="card-title text-success text-center fw-bold text-truncate">
                {item.title}
              </h6>
              <p className="card-text text-center">❤️</p>
              <div className="card-footer bg-transparent text-center mt-3">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-secondary time-serve">
                {item?.createdBy === user?._id && (
                  <>
                    <Link to={`/editRecipe/${item._id}`}>
                      <FaEdit />
                    </Link>
                    <span>
                      <MdDelete
                        className="text-danger"
                        onClick={() => deleteRecipe(item._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {pagination && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-secondary mx-1"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn mx-1 ${
                i + 1 === currentPage ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn btn-outline-secondary mx-1"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Card;
