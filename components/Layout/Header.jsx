import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Collapse, styled, useMediaQuery, useTheme } from "@mui/material";
import LayoutStyle from "../../styles/Layout.module.scss";
import { useRouter } from "next/navigation";
import SideNavBar, { CloseIconStyled } from "../sideNavbar";
import { useEffect, useState } from "react";
import Cart from "../cart";
import { get } from "../../services/api.services";
import Checkout from "../Checkout";
import Search from "../Search";
import { ContainerStyled } from "../Styled";
import Link from "next/link";

export const MenuIconStyled = styled(MenuIcon)({
  // position: "fixed",
  // top: 20,
  // left: 50,
  cursor: "pointer",
  fontSize: 30,
  zIndex: 1000,
  strokeWidth: 1,
});

export default function Header({ children }) {
  const { push } = useRouter();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  // async function fetchData() {
  //   const call = await get('/category/all')
  // }
  //   useEffect(() => {
  //   fetchData()

  //   }, [])

  const [menuShow, setMenuShow] = useState(false);
  const [cartShow, setCartShow] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className={LayoutStyle.mainHeader}>
        <SideNavBar
          menuShow={menuShow}
          setMenuStatus={(data) => setMenuShow(data)}
        />
        {
          !searchOpen && <ContainerStyled className={LayoutStyle.mainHeaderContainer}>
            <div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "space-between", width: "100%"  }}>
              <div style={{width: "50%"}}>
                <MenuIconStyled onClick={() => setMenuShow(!menuShow)} />
              </div>
              <div
                style={{
                  justifyContent: "center",
                  display: "flex",
                  cursor: "pointer",
                  marginLeft: '4%',
                  touchAction: 'none',
                  width: "50%",
                  flex: 1
                }}

              >
                <Link href="/">
                  <img src="/logo-transperant.png" style={{ width: mobile ? "160px": "200px", cursor: "pointer" }} alt="" />
                  </Link>
              </div>
            </div>
            <div
              className={LayoutStyle.iconList}

            >
              {mobile || tablet ? null : <Search />}
              <div
                className={LayoutStyle.iconDev}
                onClick={() => push("/account/profile")}
              >
                <PersonIcon />
              </div>
              {!desktop && (
                <div className={LayoutStyle.iconDev} onClick={() => setSearchOpen(!searchOpen)}>
                  <SearchIcon />
                </div>
              )}
              <div
                className={LayoutStyle.iconDev}
                onClick={() => push("/account/wishlist")}
              >
                <FavoriteBorderIcon />
              </div>
              <div
                className={LayoutStyle.iconDev}
                onClick={() => setCartShow(!cartShow)}
              >
                <AddShoppingCartIcon />
              </div>
            </div>
          </ContainerStyled>
        }
        {
          (!desktop && searchOpen) && <ContainerStyled className={LayoutStyle.mainHeaderContainer}>
            <div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: 'space-between', width: '100%' }}>

              <Search />
              <div>
                <CloseIconStyled onClick={() => setSearchOpen(!searchOpen)} />
              </div>

            </div>
          </ContainerStyled>
        }

        <Cart
          cartShow={cartShow}
          setCartStatus={(data) => setCartShow(data)}
          setCheckoutOpen={(data) => setCheckoutOpen(data)}
        />
        {checkoutOpen && (
          <Checkout setCheckoutOpen={(data) => setCheckoutOpen(data)} />
        )}
      </div>
      <main>{children}</main>
    </>
  );
}
