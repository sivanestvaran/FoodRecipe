import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";
import Button from "./Button";

const CuisineSlider = ({ setCategory, selected }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  const categories = [
    "Asian",
    "Chinese",
    "Western",
    "Vietnamese",
    "Indian",
    "Japanese",
    "Thai",
    "Fusion",
    "European",
  ];

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 2 : isTablet ? 4 : 6,
    slidesToScroll: 3,
  };

  return (
    <Slider {...settings}>
      <div className="text-center">
        <Button
          onClick={() => setCategory("")}
          className={selected === "" ? "btn-success" : "btn-outline-success"}
        >
          All
        </Button>
      </div>
      {categories.map((cat, index) => (
        <div key={index} className="text-center">
          <Button
            onClick={() => setCategory(cat)}
            className={selected === cat ? "btn-success" : "btn-outline-success"}
          >
            {cat}
          </Button>
        </div>
      ))}
    </Slider>
  );
};

export default CuisineSlider;
