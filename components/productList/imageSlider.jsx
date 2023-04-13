import globalStyles from "../../styles/global.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function ImageSlider({data}) {
  var settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500

  };
  return (
    <>
      <div style={{width : '90%', margin: '0px auto'}}>
        <Slider {...settings}>
          {
            data?.image?.map((image, index) => {
              return(
                <div key={index}>
                <img src={`${process.env.BASE_IMAGE}/product/${data?._id}/${image.url}`} alt="" style={{width : '90%'}} />
               
              </div>
              )
            })
          }
        </Slider>
      </div>
    </>
  );
}
