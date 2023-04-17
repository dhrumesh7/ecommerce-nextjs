import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import { useForm, Controller } from "react-hook-form";
import { Country, State, City, ICountry } from "country-state-city";
import Select from "react-select";
import SideBar from "../../../components/Account/SideBar";
import wishlistCSS from "../../../styles/Account.module.scss";
import { useEffect, useState, useId } from "react";
import {
  getOrderListService,
  getWishListService,
} from "../../../services/user.services";
import { toast } from "react-toastify";
import { ContainerStyled } from "../../../components/Styled";
import productDetailsStyles from "../../../styles/ProductDetails.module.scss";
import styles from "../../../styles/cart.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Address() {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {},
  });

  const { push } = useRouter();
  const [orders, setOrders] = useState([]);
  const [isApiCalled, setApiCalled] = useState(false);

  async function fetchData() {
    try {
      const response = await getOrderListService();
      setOrders(response?.data?.data?.orders);
      setApiCalled(true);
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });
  return (
    <ContainerStyled>
      <div className={wishlistCSS.profileSideBarMain}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <SideBar />
          </Grid>
          {isApiCalled && (
            <Grid container item xs={12} md={8}>
              {orders?.length ? (
                <>
                  {orders.map(({ products, amount, orderStatus, _id }, i) => {
                    return (
                      <Box
                        key={i}
                        onClick={() => push(`/account/orders/${_id}`)}
                        style={{
                          boxShadow: "rgb(188 187 187 / 62%) 0px 0px 15px",
                          marginBottom: 20,
                          borderRadius: 10,
                          cursor: "pointer",
                        }}
                      >
                        <Grid container spacing={1} p={2}>
                          <Grid item xs={3} sm={2}>
                            <Box>
                              <Img
                                alt="complex"
                                src={`${process.env.BASE_IMAGE}/product/${products?.[0]?.product?._id}/${products?.[0]?.product?.image?.[0]?.url}`}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={9} sm={5} container>
                            <Grid
                              item
                              xs
                              container
                              direction="column"
                              rowSpacing={1}
                              justifyContent={"space-evenly"}
                            >
                              <Grid item xs>
                                <Typography
                                  sx={{
                                    textTransform: "capitalize",
                                    fontSize: '12px',
                                  }}
                                  gutterBottom
                                  variant="subtitle1"
                                  component="div"
                                >
                                  Order# {_id}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "darkgoldenrod",
                                    textTransform: "capitalize",
                                  }}
                                  gutterBottom
                                  variant="subtitle1"
                                  component="div"
                                >
                                  {products?.[0]?.product?.title}
                                  {products?.length > 1 && (
                                    <span
                                      style={{
                                        color: "black",
                                        fontWeight: 500,
                                      }}
                                    >
                                      {" "}
                                      (+{products.length - 1} More)
                                    </span>
                                  )}
                                </Typography>
                                <p
                                  className={
                                    productDetailsStyles.descriptionTitle
                                  }
                                  style={{
                                    marginBottom: 0,
                                    lineHeight: "inherit",
                                    fontSize: "0.8rem",
                                  }}
                                >
                                  Quantity: {products?.[0]?.quantity}
                                </p>
                                {products?.[0]?.product?.color && (
                                  <p
                                    className={
                                      productDetailsStyles.descriptionTitle
                                    }
                                    style={{
                                      marginBottom: 0,
                                      lineHeight: "inherit",
                                      fontSize: "0.8rem",
                                    }}
                                  >
                                    COLOR :{" "}
                                    <span>
                                      {" "}
                                      {
                                        products?.[0]?.product?.stocks?.find(
                                          (stk) =>
                                            stk.sku === products?.[0]?.sku
                                        )?.color
                                      }{" "}
                                    </span>
                                  </p>
                                )}
                                {products?.product?.size && (
                                  <p
                                    className={
                                      productDetailsStyles.descriptionTitle
                                    }
                                    style={{
                                      marginBottom: 0,
                                      lineHeight: "inherit",
                                      fontSize: "0.8rem",
                                    }}
                                  >
                                    SIZE :{" "}
                                    <span>
                                      {" "}
                                      {products?.[0]?.product?.size}{" "}
                                    </span>
                                  </p>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item sm={2} xs={12}>
                            <p className={styles.productPrice}>₹ {amount}</p>
                          </Grid>
                          <Grid item sm={3} xs={12}>
                            {orderStatus}
                          </Grid>
                        </Grid>
                      </Box>
                    );
                  })}
                </>
              ) : (
                <Box
                  boxShadow={5}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    justifyContent: "center",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <h2>No recent orders</h2>
                  <Link href={"/collections/all"}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "darkgoldenrod",
                        ":hover": {
                          color: "darkgoldenrod",
                          backgroundColor: "white",
                          border: "1px solid darkgoldenrod",
                        },
                      }}
                    >
                      Start Shopping
                    </Button>
                  </Link>
                </Box>
              )}
            </Grid>
          )}
        </Grid>
      </div>
    </ContainerStyled>
  );
}
