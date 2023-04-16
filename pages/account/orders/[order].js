import { Box, Button, Grid, Typography, styled, Divider } from "@mui/material";
import productDetailsStyles from "../../../styles/ProductDetails.module.scss";
import styles from "../../../styles/cart.module.scss";
import React, { useEffect, useState } from "react";
import { ContainerStyled } from "../../../components/Styled";
import RatingInput from "../../../components/Rating";
import ShipmentStepper from "../../../components/Stepper";
import { useRouter } from "next/router";
import { getOrderService } from "../../../services/user.services";
import { cancelShipmentService } from "../../../services/shipment.service";
import { toast } from "react-toastify";

const Order = () => {
  const router = useRouter();
  const { order } = router.query;
  console.log("order is", order);
  const [data, setData] = useState();
  async function fetchData() {
    if (order) {
      try {
        const response = await getOrderService(order);
        setData(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [order]);
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });
  console.log("data ", data);

  const onCancelShipment = async () => {
    try {
      const response = await cancelShipmentService({ orderId: data._id });
      toast.success(response.data.message);
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <>
      {data && (
        <ContainerStyled>
          <Typography
            sx={{
              padding: "20px",
              boxShadow: "rgb(188 187 187 / 62%) 0px 0px 15px",
              margin: "20px 0",
            }}
          >
            Order ID - {data._id}
          </Typography>

          <Grid
            container
            rowSpacing={3}
            sx={{ marginLeft: "0px", maxWidth: "100%", margin: "0px auto" }}
          >
            {data?.products?.map((pr) => {
              return (
                <>
                  <Grid
                    container
                    item={12}
                    spacing={3}
                    sx={{
                      paddingTop: 0,
                      boxShadow: "rgb(188 187 187 / 62%) 0px 0px 15px",
                      maxWidth: "100%",
                      margin: "0px auto 20px",
                    }}
                  >
                    <Grid item xs={3} sm={1.2}>
                      <Box>
                        <Img
                          alt="complex"
                          src={`${process.env.BASE_IMAGE}/product/${pr?.product?._id}/${pr?.product?.image?.[0]?.url}`}
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
                              color: "darkgoldenrod",
                              textTransform: "capitalize",
                            }}
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {pr?.product?.title}
                          </Typography>
                          <p
                            className={productDetailsStyles.descriptionTitle}
                            style={{
                              marginBottom: 0,
                              lineHeight: "inherit",
                              fontSize: "0.8rem",
                            }}
                          >
                            Quantity: {pr?.quantity}
                          </p>
                          {pr?.product?.color && (
                            <p
                              className={productDetailsStyles.descriptionTitle}
                              style={{
                                marginBottom: 0,
                                lineHeight: "inherit",
                                fontSize: "0.8rem",
                              }}
                            >
                              COLOR : <span> {pr?.product?.color} </span>
                            </p>
                          )}
                          {pr?.product?.size && (
                            <p
                              className={productDetailsStyles.descriptionTitle}
                              style={{
                                marginBottom: 0,
                                lineHeight: "inherit",
                                fontSize: "0.8rem",
                              }}
                            >
                              SIZE : <span> {pr?.product?.size} </span>
                            </p>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={2} xs={12}>
                      <p className={styles.productPrice}>
                        ₹ {pr?.product?.price}
                      </p>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                      {data?.orderStatus}
                    </Grid>
                    {/* <Grid item xs={12}>
                        <RatingInput />
                      </Grid> */}
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                </>
              );
            })}
            {data?.products?.map((pr) => {
              return (
                <>
                  <Grid
                    container
                    item={12}
                    spacing={3}
                    sx={{
                      boxShadow: "rgb(188 187 187 / 62%) 0px 0px 15px",
                      maxWidth: "100%",
                      margin: "0px auto 20px",
                    }}
                  >
                    <Grid item xs={3} sm={1.2}>
                      <Box>
                        <Img
                          alt="complex"
                          src={`${process.env.BASE_IMAGE}/product/${pr?.product?._id}/${pr?.product?.image?.[0]?.url}`}
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
                              color: "darkgoldenrod",
                              textTransform: "capitalize",
                            }}
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {pr?.product?.title}
                          </Typography>
                          <p
                            className={productDetailsStyles.descriptionTitle}
                            style={{
                              marginBottom: 0,
                              lineHeight: "inherit",
                              fontSize: "0.8rem",
                            }}
                          >
                            Quantity: {pr?.quantity}
                          </p>
                          {pr?.product?.color && (
                            <p
                              className={productDetailsStyles.descriptionTitle}
                              style={{
                                marginBottom: 0,
                                lineHeight: "inherit",
                                fontSize: "0.8rem",
                              }}
                            >
                              COLOR : <span> {pr?.product?.color} </span>
                            </p>
                          )}
                          {pr?.product?.size && (
                            <p
                              className={productDetailsStyles.descriptionTitle}
                              style={{
                                marginBottom: 0,
                                lineHeight: "inherit",
                                fontSize: "0.8rem",
                              }}
                            >
                              SIZE : <span> {pr?.product?.size} </span>
                            </p>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={2} xs={12}>
                      <p className={styles.productPrice}>
                        ₹ {pr?.product?.price}
                      </p>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                      {data?.orderStatus}
                    </Grid>
                    {/* <Grid item xs={12}>
                        <RatingInput />
                      </Grid> */}
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                </>
              );
            })}
            {data?.products?.map((pr) => {
              return (
                <>
                  <Grid
                    container
                    item={12}
                    spacing={3}
                    sx={{
                      boxShadow: "rgb(188 187 187 / 62%) 0px 0px 15px",
                      maxWidth: "100%",
                      margin: "0px auto 20px",
                    }}
                  >
                    <Grid item xs={3} sm={1.2}>
                      <Box>
                        <Img
                          alt="complex"
                          src={`${process.env.BASE_IMAGE}/product/${pr?.product?._id}/${pr?.product?.image?.[0]?.url}`}
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
                              color: "darkgoldenrod",
                              textTransform: "capitalize",
                            }}
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {pr?.product?.title}
                          </Typography>
                          <p
                            className={productDetailsStyles.descriptionTitle}
                            style={{
                              marginBottom: 0,
                              lineHeight: "inherit",
                              fontSize: "0.8rem",
                            }}
                          >
                            Quantity: {pr?.quantity}
                          </p>
                          {pr?.product?.color && (
                            <p
                              className={productDetailsStyles.descriptionTitle}
                              style={{
                                marginBottom: 0,
                                lineHeight: "inherit",
                                fontSize: "0.8rem",
                              }}
                            >
                              COLOR : <span> {pr?.product?.color} </span>
                            </p>
                          )}
                          {pr?.product?.size && (
                            <p
                              className={productDetailsStyles.descriptionTitle}
                              style={{
                                marginBottom: 0,
                                lineHeight: "inherit",
                                fontSize: "0.8rem",
                              }}
                            >
                              SIZE : <span> {pr?.product?.size} </span>
                            </p>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={2} xs={12}>
                      <p className={styles.productPrice}>
                        ₹ {pr?.product?.price}
                      </p>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                      {data?.orderStatus}
                    </Grid>
                    {/* <Grid item xs={12}>
                        <RatingInput />
                      </Grid> */}
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                </>
              );
            })}
            <Grid item xs={12} sx={{ margin: "30px", fontWeight: 500 }} >
              Total amount : Rs. {data.amount}
            </Grid>
            {/* <Grid item xs={6}>
                <ShipmentStepper />
              </Grid> */}

            <Grid
              item
              xs={12}
              sx={{ boxShadow: "rgb(188 187 187 / 62%) 0px 0px 15px", padding: '10px 20px' }}
            >
              <Typography variant="h4" sx={{marginBottom: '10px'}} >Delivery Address</Typography>
              <Typography sx={{marginBottom: '10px'}}>
                {" "}
                <b>Dhrumesh Kathiriya </b> <b>9876543210</b>{" "}
              </Typography>
              <Typography sx={{marginBottom: '10px'}}>
                B-110 ishvarkrupa soc, Near laxman nagar, Punagam ,Surat-395010
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  padding: "20px 0",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  disabled={data?.orderStatus === "cancelled"}
                  variant="contained"
                  onClick={() => onCancelShipment()}
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    width: "48%",
                    padding: "10px",
                    border: "1px solid #000000",
                    ":hover": {
                      color: "#ffffff",
                      backgroundColor: "#000000",
                    },
                    display: "block",
                    margin: "0px auto",
                  }}
                >
                  Cancel order
                </Button>

                <Button
                  variant="contained"
                  disabled={true}
                  sx={{
                    backgroundColor: "#000000",
                    color: "white",
                    width: "48%",
                    padding: "10px",
                    ":hover": {
                      color: "#000000",
                      backgroundColor: "white",
                      border: "1px solid #000000",
                    },
                    display: "block",
                    margin: "0px auto",
                  }}
                >
                  Download Invoice
                </Button>
              </div>
            </Grid>
          </Grid>
        </ContainerStyled>
      )}
    </>
  );
};

export default Order;
