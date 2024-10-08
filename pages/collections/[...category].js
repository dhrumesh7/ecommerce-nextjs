import Filter from "../../components/Filter";
import ProductListGrid from "../../components/productList/productListGrid";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import CloseIcon from "@mui/icons-material/Close";
import { Button, Drawer, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import FilterCss from "../../styles/Home.module.scss";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getAllProductsService,
  getCategoryProductsService,
  getNewProductsService,
  getSaleProductsService,
  getSubCategoryProductsService,
} from "../../services/products.services";
import { useRouter } from "next/router";
import { ContainerStyled } from "../../components/Styled";
import Link from "next/link";
import globalStyles from "../../styles/global.module.scss";
import { calPercentage } from "../../services/helper.service";
export default function Category() {
  const router = useRouter();
  const { category } = router.query;

  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [slug, setSlug] = useState();
  const [filters, setFilters] = useState();
  const [sortValue, setSortValue] = useState('popularity');

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const type =
    category?.length === 2
      ? "subcategory"
      : ['all', 'sale', 'new-arrivals'].includes(category?.[0])
        ? category?.[0]
        : "category";
  useEffect(() => {
    if (category) {
      if (['all', 'sale', 'new-arrivals'].includes(category?.[0])) {
        fetchProducts(true);
      }
      setSlug(type === "category" ? category[0] : category[1]);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts(true);
  }, [slug, filters, sortValue]);

  async function fetchProducts(isReset) {
    if (category) {
      let res;
      switch (type) {
        case "category":
          res = await getCategoryProductsService({
            page: isReset ? 1 : page + 1,
            category: category[0],
            filters,
            sortValue
          });
          break;
        case "subcategory":
          res = await getSubCategoryProductsService({
            page: isReset ? 1 : page + 1,
            subcategory: category[1],
            filters,
            sortValue
          });
          break;
        case "all":
          res = await getAllProductsService({
            page: isReset ? 1 : page + 1,
            filters,
            sortValue
          });
          break;
        case "sale":
          res = await getSaleProductsService({
            page: isReset ? 1 : page + 1,
            filters,
            sortValue
          });
          break;
        case "new-arrivals":
          res = await getNewProductsService({
            page: isReset ? 1 : page + 1,
            filters,
            sortValue
          });
          break;
        default:
          break;
      }

      const newProducts = res?.data?.data;
      setProducts(isReset ? newProducts : [...products, ...newProducts]);
      setPage(isReset ? 1 : page + 1);
      setHasMore(isReset ? true : newProducts.length > 0);
    }
  }

  const [isFilter, setIsFilter] = useState(false);

  const filterClick = () => {
    setIsFilter(!isFilter);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "whitesmoke",
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      boxShadow: state.isFocused ? null : null,
      maxWidth: "160px",
      "&:hover": {
        borderColor: state.isFocused ? "black" : "transparent",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
  };

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "price-ascending", label: "Price Low To High" },
    { value: "price-descending", label: "Price High To Low" },
    { value: "new", label: "New Arrivals" }
  ]

  return (
    <>
      {category && (
        <ContainerStyled style={{ marginBottom: "40px" }}>
          {!desktop && (
            <Drawer anchor={"bottom"} open={isFilter} onClose={() => setIsFilter(false)}
              PaperProps={{ sx: { height: '-webkit-fill-available' } }}>
              <Filter
                currentFilters={filters}
                type={type}
                slug={type === "category" ? category[0] : category[1]}
                appliedFilters={(data) => { setFilters(data); setIsFilter(false) }}
                isFilter={isFilter}
              />
            </Drawer>
          )}
          <div style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between" }}>
            <div
              type="button"
              className={FilterCss.filterIconDiv}
              onClick={() => filterClick()}
            >
              {isFilter ? <CloseIcon /> : <FilterAltTwoToneIcon />}
              <span>Filters</span>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px", alignItems: "center", gap: 10 }}>
              <span>Sort By</span>
              <Select
                options={sortOptions}
                value={sortValue}
                onChange={(item) => {
                  setSortValue(item);
                }}
                styles={customStyles}
              />
            </div>
          </div>

          <Grid container spacing={2}>
            {isFilter && desktop && (
              <Grid item md={4} lg={3}>
                <Filter
                  currentFilters={filters}
                  type={type}
                  slug={type === "category" ? category[0] : category[1]}
                  appliedFilters={(data) => setFilters(data)}
                />
              </Grid>
            )}

            <Grid item md={isFilter ? 8 : 12} lg={isFilter ? 9 : 12} xs={12}>
              <InfiniteScroll
                dataLength={products.length}
                next={fetchProducts}
                hasMore={hasMore}
              // loader={<h4>Loading...</h4>}
              >
                <Grid container spacing={2} rowSpacing={5}>
                  {products?.map((product, index) => {
                    return (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={isFilter ? 4 : 3}
                        key={index}
                      >
                        <Link
                          href={`/products/${product.slug}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          <img
                            src={
                              product.image?.[0]?.url
                                ? `${process.env.BASE_IMAGE}/product/${product._id}/${product.image?.[0]?.url}`
                                : "/product.webp"
                            }
                            alt=""
                            className={globalStyles.productImage}
                          />
                          <p className={globalStyles.productName}>
                            {product.title}
                          </p>
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
                      </Grid>
                    );
                  })}
                </Grid>
              </InfiniteScroll>
            </Grid>
          </Grid>
        </ContainerStyled>
      )}
    </>
  );
}
