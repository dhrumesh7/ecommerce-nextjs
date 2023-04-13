import globalStyles from "../../styles/global.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function ProductListSlider() {
  var settings = {
    dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      initialSlide: 0,
    //   variableWidth: true,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 3
          }
        },
        {
          breakpoint: 775,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
  };
  return (
    <>
      <div className={globalStyles.productListDiv}>
        <h3 className={globalStyles.productListTitle}>Product List</h3>
        <Slider {...settings}>
          <div className={globalStyles.productBox} style={{ width: 225 }}>
            <img src="/product.webp" alt=""  style={{width : '98%'}}/>
            <p className={globalStyles.productName}>Pentagon Dark Blue Denim Shirt</p>
            <p className={globalStyles.productPrice}>Rs. 1,999</p>
          </div>
          <div className={globalStyles.productBox} style={{ width: 225 }}>
            <img src="/product.webp" alt=""  style={{width : '98%'}}/>
            <p className={globalStyles.productName}>Pentagon Dark Blue Denim Shirt</p>
            <p className={globalStyles.productPrice}>Rs. 1,999</p>
          </div>
          <div className={globalStyles.productBox} style={{ width: 225 }}>
            <img src="/product.webp" alt=""  style={{width : '98%'}}/>
            <p className={globalStyles.productName}>Pentagon Dark Blue Denim Shirt</p>
            <p className={globalStyles.productPrice}>Rs. 1,999</p>
          </div>
          <div className={globalStyles.productBox} style={{ width: 225 }}>
            <img src="/product.webp" alt=""  style={{width : '98%'}}/>
            <p className={globalStyles.productName}>Pentagon Dark Blue Denim Shirt</p>
            <p className={globalStyles.productPrice}>Rs. 1,999</p>
          </div>
          <div className={globalStyles.productBox} style={{ width: 225 }}>
            <img src="/product.webp" alt=""  style={{width : '98%'}}/>
            <p className={globalStyles.productName}>Pentagon Dark Blue Denim Shirt</p>
            <p className={globalStyles.productPrice}>Rs. 1,999</p>
          </div>
          <div className={globalStyles.productBox} style={{ width: 225 }}>
            <img src="/product.webp" alt=""  style={{width : '98%'}}/>
            <p className={globalStyles.productName}>Pentagon Dark Blue Denim Shirt</p>
            <p className={globalStyles.productPrice}>Rs. 1,999</p>
          </div>
          <div className={globalStyles.productBox} style={{ width: 225 }}>
            <img src="/product.webp" alt=""  style={{width : '98%'}}/>
            <p className={globalStyles.productName}>Pentagon Dark Blue Denim Shirt</p>
            <p className={globalStyles.productPrice}>Rs. 1,999</p>
          </div>
          <div className={globalStyles.productBox} style={{ width: 225 }}>
            <img src="/product.webp" alt=""  style={{width : '98%'}}/>
            <p className={globalStyles.productName}>Pentagon Dark Blue Denim Shirt</p>
            <p className={globalStyles.productPrice}>Rs. 1,999</p>
          </div>

        </Slider>
      </div>
    </>
  );
}
