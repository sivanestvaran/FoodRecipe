import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import content from "../data/content.txt";
import Wrap from "../assets/Wrap.png";
import CuisineSlider from "../components/CuisineSlider";
import Card from "../components/Card";
import { ToastContainer } from "react-toastify";
import axios from "../../utils/axiosInstance";
import { useUser } from "../components/UserContext";

const Home = () => {
  const [data, setData] = useState("");
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState(true);
  const { user } = useUser();

  const fetchContent = async () => {
    const res = await fetch(content);
    const text = await res.text();
    setData(text);
  };

  const fetchRecipes = async () => {
    const response = await axios.get("/recipe/allrecipes");
    setAllRecipes(response.data.allrecipes);
  };

  useEffect(() => {
    fetchContent();
    fetchRecipes();
  }, []);

  useEffect(() => {
    const filtered = allRecipes.filter((recipe) => {
      const matchesCategory =
        !selectedCategory || recipe.categories.includes(selectedCategory);
      const matchesSearch = recipe.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setFilteredRecipes(filtered);
  }, [selectedCategory, searchTerm, allRecipes]);

  return (
    <>
      <ToastContainer />
      <section className="hero position-relative">
        <div className="d-md-flex align-items-center p-3">
          <div className="left p-4 flex-fill w-100 p-3">
            <div className="title text-center ms-1">
              <h1 className="text-success">Discover. Cook. Enjoy</h1>
            </div>
            <div
              className="mt-4 description mx-auto"
              style={{ maxWidth: "600px" }}
              dangerouslySetInnerHTML={{ __html: data }}
            />
          </div>
          <div className="right flex-fill w-100 text-center p-3">
            <div className="position-relative">
              <img
                src={Wrap}
                alt=""
                className="img-fluid animate__animated animate__swing animate__slow animate__repeat-1"
              />
              <div
                className="position-absolute top-50 start-50 translate-middle w-100"
                style={{ zIndex: -99 }}
              >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#A1D99B"
                    d="M59.2,-41.5C73.6,-29.2,79.8,-4.8,73.9,15.1C68,35.1,49.9,50.6,32.1,54.4C14.4,58.2,-3,50.3,-16.6,41.2C-30.2,32.1,-39.9,21.7,-43.9,8.7C-47.9,-4.3,-46.2,-19.9,-38,-30.8C-29.7,-41.6,-14.9,-47.6,3.8,-50.7C22.4,-53.7,44.9,-53.7,59.2,-41.5Z"
                    transform="translate(100 100)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container p-4 mt-2">
        <CuisineSlider
          setCategory={setSelectedCategory}
          selected={selectedCategory}
        />
      </div>

      <div className="container mb-3 w-50">
        <input
          type="text"
          placeholder="Search recipes by title..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="container mt-3 p-3 mb-3">
        {filteredRecipes.length > 0 ? (
          <Card allRecipes={filteredRecipes} pagination={pagination} />
        ) : (
          <p className="text-center">No recipes found.</p>
        )}
      </div>
    </>
  );
};

export default Home;
