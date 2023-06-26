import { Grid, IconButton } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import globalStyles from "../../styles/global.module.scss";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Favorite, FavoriteBorder, Favourite } from "@mui/icons-material";
import { toast } from "react-toastify";
import { addToWishListService, getUserProfileService, removeFromWishListService } from "../../services/user.services";
import axios from "axios";
import { calPercentage } from "../../services/helper.service";

export default function ProductListGrid({ title, products }) {

  const [user, setUser] = useState();

  async function fetchData(data) {
    try {
      const response = await getUserProfileService();
      setUser(response?.data?.data);
    } catch (error) {
      console.log('err', error)
    }
  }


  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.token) {
        fetchData();
      }
    }
    AOS.init();
  }, []);

  const addToWishList = async (e, productId) => {
    try {
      e.stopPropagation();
      e.preventDefault();
      const response = await addToWishListService({ productId });
      if (response.data.flag) {
        toast.success(response?.data?.message);
        fetchData(response?.data?.data)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const removeFromWishlist = async (e, productId) => {
    try {
      e.stopPropagation();
      e.preventDefault();
      const response = await removeFromWishListService(productId);
      toast.success(response?.data?.message);
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const wishlistStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'white',
    borderRadius: '50%',
    color: 'black',
    zIndex: 100,
  }
  return (
    <>
      {/* <h3 className={globalStyles.productListTitle}>Product List</h3> */}
      {/* {
      props?.products?.map(products => {
        return(
          
        )
      })
     } */}
      <div>
        {title && <h3 className={globalStyles.productListTitle}>{title || ''}</h3>}
        <Grid container spacing={2} rowSpacing={5} >
          {
            products?.map((product, index) => {
              return (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <div style={{ position: "relative" }}>
                    <Link href={`/products/${product.slug}`} style={{ color: "black", textDecoration: "none" }}>

                      {
                        user && (
                          <>
                            {
                              !user?.wishlist?.find(pr => pr === product._id) ?
                                <IconButton sx={wishlistStyle} onClick={(e) => addToWishList(e, product._id)}>
                                  <FavoriteBorder fontSize="small" />
                                </IconButton>
                                :
                                <IconButton sx={wishlistStyle} onClick={(e) => removeFromWishlist(e, product._id)}>
                                  <Favorite fontSize="small" sx={{ color: "red" }} />
                                </IconButton>
                            }
                          </>)
                      }

                      <img src={product.image?.[0]?.url ? `${process.env.BASE_IMAGE}/product/${product._id}/${product.image?.[0]?.url}` : "/product.webp"} alt="" className={globalStyles.productImage} />
                      <p className={globalStyles.productName}>{product.title}</p>
                      {calPercentage(product?.price, product?.noOfferprice) > 0 ? (
                        <>
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
                            <p className={globalStyles.productPrice}>
                              ₹ {Number(product?.price).toLocaleString('en')}{" "}
                              <span style={{ color: "gray", textDecoration: "line-through" }}>
                                {" "}

                                ₹ {Number(product?.noOfferprice).toLocaleString('en')}

                              </span>
                              <span style={{ color: "green", fontSize: "15px", marginLeft: "5px" }}>
                                {calPercentage(product?.price, product?.noOfferprice)}% Off
                              </span>
                            </p>
                          </div>

                        </>
                      ) : (
                        <p className={globalStyles.productPrice}>Rs. {Number(product?.price).toLocaleString('en')}</p>
                      )}
                    </Link>
                  </div>
                </Grid>
              )
            })
          }

        </Grid>
      </div>
    </>
  );
}
