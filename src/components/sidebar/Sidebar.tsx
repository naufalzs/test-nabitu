"use client";

import { NAV_ITEMS } from "@/constants/navList";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const drawerWidth = 280;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "text.primary",
          color: "gray.500",
          "& .MuiListItemIcon-root": {
            minWidth: 34,
            color: "inherit",
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
        <Image src={"/icon.svg"} width={166} height={45} alt="App Icon" />
      </Toolbar>
      <Typography variant="subtitle2" sx={{ textTransform: "uppercase", px: 10, pt: 5, fontWeight: "600" }}>
        Menu
      </Typography>
      <List sx={{ px: 6 }}>
        {NAV_ITEMS.map((item, index) => {
          const isActive = pathname === item.route;
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  py: 4,
                  borderRadius: "10px",
                  color: isActive ? "gray.100" : "inherit",
                }}
                // disableRipple
                href={item.route}
                LinkComponent={Link}
              >
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText
                  primary={item.name}
                  slotProps={{
                    primary: {
                      variant: "subtitle1",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
