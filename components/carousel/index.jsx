import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
const Carousel = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider adaptiveHeight={false}  {...settings}>
        { props.images.map((image, index)=>{
          return (
            <Link key={index} href={`${image.link || ''}`}>
          <img src={image.src} width={"100%"} alt=""/>
          </Link>
          )
        }) }
      </Slider>
    </div>
  );
};

export default Carousel;
