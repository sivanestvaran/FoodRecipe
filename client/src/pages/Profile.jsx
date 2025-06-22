import React from "react";
import NavLink from "../components/NavLink";
import Card from "../components/Card";
import axios from "../../utils/axiosInstance";
import { useState, useEffect } from "react";

const Profile = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const getAllRecipes = async () => {
      const response = await axios.get("/recipe/allrecipesbyuser");
      console.log(response.data.allrecipes);
      setAllRecipes(response.data.allrecipes);
    };

    getAllRecipes();
  }, []);

  useEffect(() => {
    // console.log("Updated allRecipes:", allRecipes);
  }, [allRecipes]); // log when state changes

  return (
    <>
      <NavLink />
      <div className="container mt-3 p-3 mb-3">
        {allRecipes.length > 0 && <Card allRecipes={allRecipes} />}
      </div>
    </>
  );
};

export default Profile;
