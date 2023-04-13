import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Grid,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import { useForm, Controller } from "react-hook-form";
import { Country, State, City, ICountry } from "country-state-city";
import Select from "react-select";
import SideBar from "../../components/Account/SideBar";
import wishlistCSS from "../../styles/Account.module.scss";
import { useEffect, useState, useId } from "react";
import { getWishListService } from "../../services/user.services";
import { toast } from "react-toastify";
import { ContainerStyled } from "../../components/Styled";
import Link from "next/link";
import { addToCart } from "../products/[id]";

export default function Address() {
  const [user, setUser] = useState();
  const [wishlist, setWishList] = useState([]);
  const [isApiCalled, setApiCalled] = useState(false);

  async function fetchData() {
    try {
      const response = await getWishListService();
      setWishList(response?.data?.data?.wishlist);
      setUser(response?.data?.data);
      setApiCalled(true);
    } catch (error) {
      console.log(error)
      // toast.error(error.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContainerStyled>
      <div className={wishlistCSS.profileSideBarMain}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <SideBar />
          </Grid>
          {isApiCalled && <Grid container item xs={12} md={8}>
            {wishlist.length ?
              <>
                {wishlist.map((wish, index) => {
                  return (
                    <Grid item xs={12} sm={4} md={6} lg={4} key={index}>
                      <Button
                        sx={{ width: "100%", height: "-webkit-fill-available" }}
                        key={index}
                      // onClick={() => setAddressData(address)}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            backgroundColor: "white",
                            boxShadow: 2,
                            height: "-webkit-fill-available",
                          }}
                        >
                          <Link href={`/products/${wish.slug}`} style={{ textDecoration: "none" }}>
                            <div className={wishlistCSS.addressBoxContent}>
                              <p >{wish.title}</p>
                              <div style={{ width: "70px" }}>
                                <img
                                  src={`${process.env.BASE_IMAGE}/product/${wish?._id}/${wish?.image?.[0]?.url}`}
                                  className={wishlistCSS.productImage}
                                  alt="product"
                                />
                              </div>
                              <div style={{ width: "100%" }}>
                                <p>Rs {wish.price}</p>

                                <Button
                                  disabled={user?.cart?.find(pr => pr.product === wish._id)}
                                  sx={{
                                    background: "darkgoldenrod",
                                    color: "white",
                                    fontSize: "10px",
                                    width: "90%",
                                  }}
                                  key={index}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    addToCart(wish?._id)
                                  }}
                                >
                                  Add To Cart
                                </Button>
                              </div>
                            </div>
                          </Link>
                        </Box>
                      </Button>
                    </Grid>
                  );
                })}
              </>
              :
              <Box boxShadow={5} sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                justifyContent: "center",
                gap: "5px",
                alignItems: "center"
              }}>
                <h2>Your wishlist is empty!</h2>
                <p>Save your favourite items so you don’t lose sight of them.</p>
                <Link href={'/collections/all'}>
                  <Button variant="contained" sx={{
                    backgroundColor: "darkgoldenrod",
                    ":hover": {
                      color: "darkgoldenrod",
                      backgroundColor: "white",
                      border: "1px solid darkgoldenrod"
                    },
                  }}>Be inspired by the latest</Button></Link>
              </Box>
            }
          </Grid>}
        </Grid>
      </div>
    </ContainerStyled>
  );
}
