import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {  useState } from "react";
import { styled } from "@mui/material";
import { DrawerHeader, CloseIconStyled } from "../sideNavbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "../../styles/cart.module.scss";
import productDetailsStyles from "../../styles/ProductDetails.module.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {  Button } from "@mui/material";
import { useEffect } from "react";
import {
  getCartListService,
  removeCartService,
  updateCartService,
} from "../../services/user.services";
import { toast } from "react-toastify";
import axios from "axios";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Cart({ cartShow, setCartStatus, setCheckoutOpen }) {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState([]);

  async function fetchData() {
    try {
      const response = await getCartListService();
      const cartItems = response?.data?.data?.cart;
      const stockChecked = cartItems.map(item => {
        const itemCopy = {...item};
        const skuStock = item?.product?.stocks?.find(stk => stk.sku === item.sku)?.stock
        itemCopy.inStock = skuStock < item.quantity ? false : true;
        return itemCopy
      })

      console.log('stock checked', stockChecked)
      setCartItems(stockChecked);
    } catch (error) {
      // toast.error(error.message)
    }
  }
  useEffect(() => {
    if (cartShow) {
      fetchData();
    }
  }, [cartShow]);

  useEffect(() => {
    const priceTotal = cartItems.reduce(
      (prev, next) => next.inStock ?  prev + next.product.price * next.quantity : 0 ,
      0
    );
    setSubTotal(priceTotal);
  }, [cartItems]);

  async function handleUpdateQuantity(itemId, newQuantity, sku) {
    console.log('sku', sku)
    if (!newQuantity) return;
    try {
      const response = await updateCartService({
        productId: itemId,
        quantity: newQuantity,
        sku
      });
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.product._id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }

  async function handleRemoveItem(itemId) {
    const response = await removeCartService(itemId);
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item?.product?._id !== itemId)
    );
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setCartStatus(open);
  };


  const handleCheckout = () => {
    // Call Razorpay payment modal here
    setCheckoutOpen(true);
    setCartStatus(false);
  };

  return (
    <>
      <SwipeableDrawer
        anchor={"right"}
        open={cartShow}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{ maxWidth: "400px" }}
        PaperProps={{
          sx: { maxWidth: 450 },
        }}
      >
        <DrawerHeader>
          <p style={{ fontSize: 28, textTransform: "uppercase" }}>Cart</p>
          <CloseIconStyled onClick={() => setCartStatus(false)} />
        </DrawerHeader>
        <Divider />
        {/* <Box
          sx={{
            width: "100%",
            padding: "10px 20px",
            position: "relative",
            maxWidth: "400px",
          }}
          role="presentation"
        ></Box> */}
        {cartItems?.length ? (
          <>
            {cartItems.map((pr, i) => {
              return (
                <Box key={i} sx={{padding: "5px"}}>
                  <Grid container spacing={1} p={1}>
                    <Grid item xs={3}  sx={{opacity: pr.inStock ? "100%" :"50%"}}>
                      <Box>
                        <Img
                          alt="complex"
                          src={`${process.env.BASE_IMAGE}/product/${pr?.product?._id}/${pr?.product?.image?.[0]?.url}`}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={7} container >
                      <Grid
                        item
                        xs
                        container
                        direction="column"
                        rowSpacing={1}
                      >
                        <Grid item xs sx={{opacity: pr.inStock ? "100%" :"50%"}}>
                          <Typography
                            sx={{
                              color: "darkgoldenrod",
                              textTransform: "capitalize",
                            }}
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {pr.product.title}
                          </Typography>
                          <p
                            className={productDetailsStyles.descriptionTitle}
                            style={{
                              marginBottom: 0,
                              lineHeight: "inherit",
                              fontSize: "0.8rem",
                            }}
                          >
                           {pr.product.color && <>COLOR : <span> {pr.product.stocks.find(stk => stk.sku === pr.sku)?.color} </span></>}
                          </p>
                          <p
                            className={productDetailsStyles.descriptionTitle}
                            style={{
                              marginBottom: 0,
                              lineHeight: "inherit",
                              fontSize: "0.8rem",
                            }}
                          >
                          {pr.product.size &&  <>SIZE : <span> {pr.product.size} </span></>}
                          </p>
                        </Grid>
                         {!pr.inStock &&<Typography sx={{color:"red", fontWeight: "500"}} >Out of stock</Typography>}
                        <Grid item >
                          <Box style={{justifyContent: 'flex-start', alignItem: 'center', display: 'flex'}}>
                          <ToggleButtonGroup
                            size={"small"}
                            aria-label="text alignment"
                            disabled={pr.inStock ? false : true}
                          >
                            <ToggleButton
                              size="small"
                              value="add"
                              aria-label="left aligned"
                              sx={{ height: "35px", width: "35px" }}
                              onClick={() =>
                                handleUpdateQuantity(
                                  pr.product._id,
                                  pr.quantity - 1,
                                  pr.sku
                                )
                              }
                            >
                              <RemoveIcon />
                            </ToggleButton>
                            <ToggleButton
                              size="small"
                              value=""
                              aria-label="centered"
                              disabled
                              sx={{ height: "35px", width: "35px" }}
                            >
                              {pr.quantity}
                            </ToggleButton>
                            <ToggleButton
                              size="small"
                              value="remove"
                              aria-label="right aligned"
                              sx={{ height: "35px", width: "35px" }}
                              onClick={() =>
                                handleUpdateQuantity(
                                  pr.product._id,
                                  pr.quantity + 1,
                                  pr.sku
                                )
                              }
                            >
                              <AddIcon />
                            </ToggleButton>
                          </ToggleButtonGroup>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#000000",
                              color: "white",
                              padding: "0px 15px",
                              fontSize: '12px',
                              ":hover": {
                                color: "#000000",
                                backgroundColor: "white",
                                border: "1px solid #000000",
                              },
                              display: "inline",
                              marginLeft: '15px',
                            }}
                            onClick={() => handleRemoveItem(pr?.product?._id)}
                          >
                            Remove
                          </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2}  sx={{opacity: pr.inStock ? "100%" :"50%"}}>
                      <p className={styles.productPrice}>
                        ₹ {pr.product.price * pr.quantity}
                      </p>
                    </Grid>
                  </Grid>
                  <Divider />
                </Box>
              );
            })}
            <div className={styles.subTotal}>
              <p className={styles.title} style={{ fontWeight: 500 }}>
                Total Amount
              </p>
              <p className={styles.title}>₹ {subTotal}</p>
            </div>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              PROCEED TO CHECKOUT
            </button>
          </>
        ) : (
          <p className={styles.emptyNote}>Your cart is empty</p>
        )}
      </SwipeableDrawer>
    </>
  );
}
