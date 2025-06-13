import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CarousalCard from "./CarousalCard";

// Custom Arrow Components
const NextArrow = ({ onClick }) => {
  return (
    <div
      className="custom-arrow custom-next-arrow flex items-center justify-center w-8 h-8 m-2 cursor-pointer bg-primary hover:bg-primary-variant text-white rounded ml-2 absolute -top-12 right-1"
      onClick={onClick}
    >
      <FaArrowRight />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="custom-arrow custom-prev-arrow flex items-center justify-center w-8 h-8 m-2 cursor-pointer bg-primary hover:bg-primary-variant text-white rounded mr-5 !absolute -top-12 right-10"
      onClick={onClick}
    >
      <FaArrowLeft />
    </div>
  );
};

export default function ItemsSlider() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="relative">
      <Slider {...settings}>

        {
          Array(6).fill().map((item, index) => (
            <div key={index} className="px-2">
              <CarousalCard
              // imgSrc={item.imgSrc}
              // title={item.title}
              // description={item.description}
              // link={item.link}
              />
            </div>
          ))
        }
      </Slider>
    </div>
  );
}


