import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default function HomeCarousel({ data }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    swipeToSlide: true,
    arrows: false,
    styles: {
      backgroundColor: "transparent",
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="w-100 mx-0 px-0">
      {data?.map((dataItem) => (
        <div key={dataItem.id}>
          <Link
            key={dataItem.id}
            to={dataItem.link}
            className="position-relative"
          >
            <img
              width="100%"
              style={{maxHeight:'500px'}}
              src={`https://pacific-depths-48667.herokuapp.com/${dataItem.image}`}
              alt={dataItem.title}
            />
          </Link>
        </div>
      ))}
    </Slider>
  );
}
