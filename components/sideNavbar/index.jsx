import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";


import { KeyboardEvent, MouseEvent, useState } from "react";
import { Collapse, styled } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";


export const CloseIconStyled = styled(CloseIcon)({
//   position: "absolute",
//   top: 20,
//   right: 20,
  cursor: "pointer",
  fontSize: 32,
  zIndex: 1000,
  strokeWidth: 1,
});
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect } from "react";
import { getAllCategoryService } from "../../services/category.services";
// import { redirect, useRouter } from 'next/navigation';
import { useRouter } from 'next/router'


export const MenuIconStyled = styled(MenuIcon)({
  position: "fixed",
  top: 20,
  left: 50,
  fontSize: 32,
  zIndex: 1000,
  strokeWidth: 1,
});
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 20,
    position: 'sticky',
    top:0,
    backgroundColor: "white",
    zIndex: 50,
  // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
}));

export default function  SideNavBar (props) {
  const router = useRouter()

  const [category, setCategory] = useState([])
async function fetchData() {
  const categoryData = await getAllCategoryService()
  // console.log(categoryData?.data?.data)
  const defaultData = [
    {
      name: "SALE",
      category: [],
      link: '/collections/all'
    },
    {
      name: "SHOP",
      category: categoryData?.data?.data,
      link: '/collections/all'
    },
    {
      name: "CONTACT US",
      category: [],
      link: '/contact-us'
    },
    
  ]
  setCategory(defaultData)
}
  useEffect(() => {
  fetchData()

  }, [])
  
 const toggleDrawer =
    (open) => (event) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event).key === "Tab" ||
          (event).key === "Shift")
      ) {
        return;
      }
      props.setMenuStatus(open);
    };
  const [isCollapseOpen, setCollapseOpen] = useState(0);
  const [isSubCollapseOpen, setSubCollapseOpen] = useState(0);
const navBarClick = (link) => {
  router.push({
    pathname: link,
  });
  props.setMenuStatus(false);

}
  const list = () => (
    <Box
      sx={{ width: 300, padding: "10px 20px", position: "relative" }}
      role="presentation"
    >
      <List>
        {category.map((menu, index) => (
          <>
            <ListItem key={index} disablePadding >
              <ListItemButton
                onClick={() => {
                  isCollapseOpen !== index + 1
                    ? setCollapseOpen(index + 1)
                    : setCollapseOpen(0);
                }}
          
              >

              <ListItemText
              onClick={() => navBarClick(menu.link)}
                  primary={menu.name}
                  sx={{ textTransform: "capitalize", letterSpacing: 1.4 }}
                />
      
  
                {menu?.category?.length > 0 && (
                  <>
                    {isCollapseOpen === index + 1 ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </>
                )}
              </ListItemButton>
            </ListItem>
            {menu?.category?.length > 0 && (
              <Collapse
                in={isCollapseOpen === index + 1}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {menu?.category?.map((category, i) => (
                    <>

                      <ListItemButton
                        sx={{ pl: 2 }}
                        key={i}
                        onClick={() => {
                          isSubCollapseOpen !== i + 1
                            ? setSubCollapseOpen(i + 1)
                            : setSubCollapseOpen(0);
                        }}
                      >
                        <ListItemText 
                        primary={category?.name} 
                        onClick={() => navBarClick(`/collections/${category.slug}`)}
                        
                         />
                        {category?.subCategory?.length > 0 && (
                          <>
                            {isSubCollapseOpen == i + 1 ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </>
                        )}
                      </ListItemButton>

                      <Divider />

                      <Collapse
                        in={isSubCollapseOpen === i + 1}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {category?.subCategory?.map((subCategory, index) => (
                            <ListItemButton sx={{ pl: 3 }} key={index}>
                              <ListItemText primary={subCategory.name} onClick={() => navBarClick(`/collections/${category.slug}/${subCategory.slug}`)}/>
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  ))}
                </List>
              </Collapse>
            )}
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      {/* <MenuIconStyled onClick={() => setState(true)} /> */}
      <SwipeableDrawer
        anchor={"left"}
        open={props.menuShow}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{position: "relative"}}
        >
        <DrawerHeader>
          <p style={{fontSize: 28, textTransform : 'uppercase' }}>
            Menu
          </p>
          <CloseIconStyled onClick={() => props.setMenuStatus(false)} />
        </DrawerHeader>
        <Divider />
        {list()}
      </SwipeableDrawer>
    </>
  );
}

