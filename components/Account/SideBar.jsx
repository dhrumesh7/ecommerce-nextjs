import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { useRouter } from 'next/navigation';
import { logOutService } from '../../services/auth.services';
import { signOut } from 'next-auth/react'

export const logOut = async () => {
    const response = await logOutService()
    const res = await signOut({ callbackUrl: "/" })
    console.log('signout ', res)
    // push('/')
}

export default function SideBar() {
    const { push } = useRouter();

    const drawer = (<nav aria-label="main mailbox folders">
        <List >
            <ListItem disablePadding>
                <ListItemButton onClick={() => push('/account/profile')}>
                    <ListItemIcon>
                        <PermIdentityIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" style={{ fontSize: "5px" }} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => push('/account/address')}>
                    <ListItemIcon>
                        <LocationOnOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delivery Address" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton onClick={() => push('/account/orders')}>
                    <ListItemIcon>
                        <CreditScoreOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Orders" />
                </ListItemButton>
            </ListItem>
            {/* <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <EmojiEventsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rewards" />
                </ListItemButton>
            </ListItem> */}
            {/* <Divider /> */}
            <ListItem disablePadding>
                <ListItemButton onClick={() => push('/account/wishlist')}>
                    <ListItemIcon>
                        <FavoriteBorderOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Wishlist" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <LockResetOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Change Password" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => logOut()}>
                    <ListItemIcon>
                        <PowerSettingsNewOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                </ListItemButton>
            </ListItem>
        </List>
    </nav>)

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper', boxShadow: 5, borderRadius: "8px", height: "max-content" }}>
                {drawer}
            </Box>
        </>
    )
}