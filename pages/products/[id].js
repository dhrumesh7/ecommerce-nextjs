import {
  Button,
  Grid,
  ImageList,
  ImageListItem,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useEffect, useState } from "react";
import ProductListGrid from "../../components/productList/productListGrid";
import ProductListSlider from "../../components/productList/productListSlider";
import SideNavBar from "../../components/sideNavbar";
import Cart from "../../components/cart";
import styles from "../../styles/ProductDetails.module.scss";
import { getProducts } from "../../utils/product";
import { func } from "prop-types";
import { getSimiliarProductsService } from "../../services/products.services";
import {
  addToCartService,
  addToWishListService,
} from "../../services/user.services";
import { toast } from "react-toastify";
import { Box } from "@mui/system";
import { ContainerStyled } from "../../components/Styled";
import ImageSlider from "../../components/productList/imageSlider";
import Link from "next/link";


export const addToCart = async (productId, sku) => {
  try {
    if(!sku || !productId)  toast.error("Sorry! We can't add this product to cart.")
    const response = await addToCartService({ productId, sku });
    if (response.data.flag) {
      toast.success(response?.data?.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
};

const Product = ({ data }) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  // const [inStock, setInStock]= useState(false);
  const [product, setProduct] = useState({
    name: "Pintek Navy Shirt",
    images: [
      "/product.jpg",
      "/product.jpg",
      "/product.jpg",
      "/product.jpg",
      "/product.jpg",
    ],
    price: 1999,
    description: "EMI Options Are available !",
  });
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSku, setSelectedSku] = useState();
  const [isApiCall, setApiCall] = useState();

  const [similarProducts, setSimilarProducts] = useState([]);

  async function fetchData() {
    try {
      const response = await getSimiliarProductsService({
        category: data.category,
        subcategory: data.subcategory,
        productId: data._id
      });
      setSimilarProducts(response?.data?.data?.similarProducts);
      setApiCall(true);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const addToWishList = async () => {
    try {
      const response = await addToWishListService({ productId: data._id });
      if (response.data.flag) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const [activeImage, setActiveImage] = useState();

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const RenderTab = (value) => {
  //   switch (value) {
  //     case '1':
  //       return <>dsfdsfsf</>;

  //     default:
  //       break;
  //   }
  // };
  let inStock = false
  data?.stocks?.every(stk => {
    if (stk.stock) {
      console.log('yes i;m in')
      inStock = true
      return false
    } else {
      return true
    }
  })
  useEffect(() => {
    setActiveImage(`${process.env.BASE_IMAGE}/product/${data?._id}/${data?.image?.[0]?.url}`)
  }, [data])

  const handleColorChange = (color) => {
    const sku = data?.stocks?.find(stk => stk.color.toLowerCase() === color.toLowerCase())?.sku
    setSelectedSku(sku)
    setSelectedColor(color)
  }

  return (
    <>
      {/* <Cart/> */}
      {/* <SideNavBar/> */}
     {isApiCall && <ContainerStyled style={{ marginTop: "25px", marginBottom: "25px" }}>
        <Grid container spacing={4}>
          {data && desktop && (
            <Grid container item xs={0} md={6}>
              <Grid item xs={0} md={2}>
                <ImageList
                  variant="masonry"
                  cols={1}
                  gap={5}
                  sx={{ margin: 0 }}
                >
                  {data?.image?.map((item) => (
                    <ImageListItem
                      key={item}
                      sx={{ width: "80%", cursor: "pointer" }}
                      onClick={() =>
                        setActiveImage(
                          `${process.env.BASE_IMAGE}/product/${data._id}/${item.url}`
                        )
                      }
                      style={
                        `${process.env.BASE_IMAGE}/product/${data._id}/${item.url}` ==
                        activeImage
                          ? { border: "1px solid", padding: 2 }
                          : {}
                      }
                    >
                      <img
                        src={`${process.env.BASE_IMAGE}/product/${data?._id}/${item?.url}`}
                        alt={product?.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
              <Grid item xs={12} md={10}>
                <img
                  src={`${activeImage}`}
                  alt={"activeImage"}
                  style={{ width: "100%", margin: "0 auto" }}
                  loading="lazy"
                />
              </Grid>
            </Grid>
          )}
          {!desktop && (
            <Grid item xs={12}>
              {" "}
              <ImageSlider data={data} />
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <h1 className={styles.productTitle}>{data?.title}</h1>
            {(data?.noOfferprice - data?.price) / 100 > 0 ? (
              <>
                <p className={styles.productPrice}>
                  Rs. {Number(data?.price).toLocaleString("en")}{" "}
                  <span style={{ color: "green", fontSize: "0.8em" }}>
                    {Math.round((data?.noOfferprice - data?.price) / 100)}% Off
                  </span>
                </p>
                <p style={{ color: "gray" }}>
                  MRP{" "}
                  <span style={{ textDecoration: "line-through" }}>
                    Rs. {Number(data?.noOfferprice).toLocaleString("en")}
                  </span>
                </p>
              </>
            ) : (
              <p className={styles.productPrice}>
                Rs. {Number(data?.price).toLocaleString("en")}
              </p>
            )}

            <p className={styles.productDescription}>
              {data?.description?.other}
            </p>
            <div className={styles.detailsDiv}>
              <p className={styles.detailsTitle}>COLOR</p>
              {data?.color.map((clr, index) => {
                return (
                  <button disabled={!data.stocks.find(stock => stock?.color.toLowerCase() === clr.toLowerCase())} key={index} className={styles.detailsButton} onClick={() => handleColorChange(clr)}
                    style={{ border: selectedColor === clr ? "1px solid black" : "1px solid #e0f1fd" }}>
                    {console.log('sku ', data.stocks)}
                    {clr}
                  </button>
                );
              })}
            </div>
            {/* <div className={styles.detailsDiv}>
              <p className={styles.detailsTitle}>SIZE</p>
              <button className={styles.detailsButton}>S</button>
              <button className={styles.detailsButton}>M</button>
              <button className={styles.detailsButton}>L</button>
              <button className={styles.detailsButton}>XL</button>
              <button className={styles.detailsButton}>XXL</button>
            </div> */}
            {console.log('instaock', inStock)}
            {!inStock && <p className={styles.outOfStockNote}>{`Sorry, we're temporarily out of stock.`}</p>}
            <button
              className={styles.addToCartButton}
              style={{ opacity: inStock ? "100%" : "50%" }}
              disabled={!inStock}
              onClick={() => {
                if (data?.color?.length > 1 && !selectedColor) {
                  return toast.info("Please choose color.");
                }
                addToCart(data._id, selectedSku)
              }}
            >
              ADD TO CART
            </button>
            <button
              className={styles.addToWishButton}
              onClick={() => addToWishList()}
            >
              SAVE TO WISHLIST
            </button>
            <div>
              <p
                className={styles.descriptionText}
                style={{ marginBottom: 25 }}
              >
                {/* Pintek Navy Shirt is the perfect choice for clubwear or Party
                Night. ts custom fit and curve hem give an attractive and
                comfortable style. Pintek designer details add an extra touch of
                sophistication and quality. */}
                {data?.description?.descriptionText}
              </p>
              <div>
                <p className={styles.descriptionTitle}>PRODUCT DESCRIPTION</p>
                <ul className={styles.descriptionUl}>
                  {data?.description?.features?.map((feature, index) => {
                    return (
                      <li key={index} className={styles.descriptionText}>
                        {feature}
                      </li>
                    );
                  })}
                  {/* <li className={styles.descriptionText}>Full Sleeves</li>
                  <li className={styles.descriptionText}>Full Sleeves</li>
                  <li className={styles.descriptionText}>Full Sleeves</li>
                  <li className={styles.descriptionText}>Full Sleeves</li> */}
                </ul>
              </div>
              <div style={{display: "flex", flexDirection: "column", gap: "15px", marginTop: "10px"}}>
                <p className={styles.descriptionTitle}>
                  Fabric : <span>{data?.description?.fabric}</span>
                </p>
                <p className={styles.descriptionTitle}>
                  Occasion : <span>{data?.description?.occasion?.join(', ')}</span>
                </p>
                <p className={styles.descriptionTitle}>
                  Care Instructions : <span>{data?.description?.care}</span>
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
        <Box sx={{ width: "100%", maxWidth: "100%", marginTop: "10px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons='auto'
            allowScrollButtonsMobile 
            aria-label="secondary tabs example"
          >
            <Tab value="1" wrapped label="Manufacturer Details" />
            <Tab value="2" wrapped label="Returns & Exchange Policy" />
            <Tab value="3" wrapped label="Place Return / Exchange Request" />
          </Tabs>
          <Box
            sx={{
              p: 3,
              boxShadow: "0px 5px 5px #ccc",
              borderRadius: "0 0 10px 10px",
              fontWeight: 300,
              letterSpacing: 1,
              fontSize: "13px",
            }}
          >
            {value === "1" && (
              <div>
                <p style={{ fontWeight: 600 }}>Manufactured & Marketed By:</p>
                <br></br> Arya Silk Mills<br></br>A-UG-527 Avadh Rituraj Textile Hub, Saroli, Surat - 395003<br></br>
                <br></br>
                <p style={{ fontWeight: 600 }}>
                  Country of Origin:<br></br>
                </p>
                India
              </div>
            )}
            {value === "2" && (
              <div style={{ lineHeight: 2 }}>
                We offer 7 days hassle-free returns and exchange. Return
                Policies may vary based on products and promotions. <br></br> 1)
                Refunds for Prepaid orders would directly be initiated to source
                account and COD order will be refunded in the form of COUPON
                CODE ONLY<br></br>
                2) Defective Products, Wrong Products or Damaged Products issue
                should be raised within 24 hrs of delivery<br></br>
                3) All Orders wherein FREE Products included are not eligible
                {/* for Refund or Exchange<br></br>For more details on our
                Returns/Exchange Policies, please{" "}
                <strong>
                  <a href="">click here․</a>
                </strong> */}
              </div>
            )}
            {value === "3" && (
              <div id="tab3" class="tabcontent active">
                To place any Returns / Exchange Request,{" "}
                <Link href="/">
                  <strong>click here.</strong>
                </Link>
              </div>
            )}
          </Box>
        </Box>

        <ProductListGrid title={"SIMILR PRODUCTS"} products={similarProducts} />
        {/* <ProductListSlider /> */}
      </ContainerStyled>}
    </>
  );
};

export async function getServerSideProps({ params }) {
  let data;
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/products/product/${params.id}`
    );
    data = await res.json();
  } catch (error) {
    console.log("eer", error);
  }
  if (!data?.data)
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  return {
    props: { data: data?.data },
  };
}

export default Product;
