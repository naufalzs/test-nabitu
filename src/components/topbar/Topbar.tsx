"use client";

import { DarkModeToggle } from "@/components";
import { ExpandMoreOutlined, NotificationsOutlined, SmsOutlined } from "@mui/icons-material";
import { AppBar, Avatar, Badge, Box, Fab, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function Topbar() {
  const [avatarMenu, setAvatarMenu] = React.useState<HTMLElement | null>(null);
  const openAvatarMenu = Boolean(avatarMenu);

  const handleOpenAvatarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarMenu(event.currentTarget);
  };

  const handleCloseAvatarMenu = () => {
    setAvatarMenu(null);
  };

  return (
    <Box sx={{ borderBottom: "1px solid #E2E8F0" }}>
      <AppBar position="static" elevation={0}>
        <Toolbar disableGutters sx={{ bgcolor: "white", px: 8, py: 4, display: "flex", justifyContent: "end", gap: 7 }}>
          <Box display={"flex"} alignItems={"center"} gap={7}>
            <DarkModeToggle />
            <Box display={"flex"} gap={4}>
              <Fab sx={{ boxShadow: "none", borderWidth: "1px", borderStyle: "solid", borderColor: "blue.300" }} size="small" color="primary">
                <NotificationsOutlined sx={{ width: "18px", height: "18px", color: "#64748B" }} />
              </Fab>
              <Badge
                color="error"
                variant="dot"
                overlap="circular"
                sx={{
                  "& .MuiBadge-badge": {
                    outline: "2px solid white",
                  },
                }}
              >
                <Fab sx={{ boxShadow: "none", borderWidth: "1px", borderStyle: "solid", borderColor: "blue.300", position: "relative", zIndex: 1 }} size="small" color="primary">
                  <SmsOutlined sx={{ width: "18px", height: "18px", color: "#64748B" }} />
                </Fab>
              </Badge>
            </Box>
            <Box display={"flex"} gap={4} alignItems={"flex-end"}>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant="subtitle2" color="text.darker" textAlign={"end"}>
                  John Doe
                </Typography>
                <Typography variant="subtitle3" color="blue.500">
                  Verified Member
                </Typography>
              </Box>
              <Box onClick={handleOpenAvatarMenu} display={"flex"} alignItems={"center"} gap={2.5} sx={{ cursor: "pointer" }} pb={"5px"}>
                <Avatar src="/images/avatar-img.png" sx={{ width: 46, height: 46 }} />
                <ExpandMoreOutlined sx={{ color: "blue.500" }} />
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={avatarMenu}
        open={openAvatarMenu}
        onClose={handleCloseAvatarMenu}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: 34,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleCloseAvatarMenu}>
          <Typography variant="body2">My Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseAvatarMenu}>
          <Typography variant="body2">Settings</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
