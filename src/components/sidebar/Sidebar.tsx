import { NAV_ITEMS } from "@/constants/navList";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import Image from "next/image";

const drawerWidth = 280;

export default function Sidebar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#1C2434",
          color: "#9D9D9D",
          // ACTIVE #F4F4F4
          "& .MuiListItemIcon-root": {
            minWidth: 34,
            color: "#9D9D9D",
          },
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        disableGutters
        sx={{
          px: 9,
          py: 7,
        }}
      >
        <Image src={"icon.svg"} width={166} height={45} alt="App Icon" />
      </Toolbar>
      <Typography variant="body2" sx={{ textTransform: "uppercase", px: 10, pt: 5, fontWeight: "600" }}>
        Menu
      </Typography>
      <List sx={{ px: 6 }}>
        {NAV_ITEMS.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ py: 4 }}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={item.name} sx={{ fontWeight: "600" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
