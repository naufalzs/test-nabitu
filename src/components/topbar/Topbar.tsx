import { ExpandMoreOutlined, NotificationsOutlined, SmsOutlined } from "@mui/icons-material";
import { AppBar, Avatar, Badge, Box, Fab, Toolbar, Typography } from "@mui/material";
import { DarkModeToggle } from "../dark-mode-toggle";

export default function Topbar() {
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
              <Box display={"flex"} alignItems={"center"} gap={2.5} sx={{ cursor: "pointer" }}>
                <Avatar src="/images/avatar-img.png" sx={{ width: 46, height: 46 }} />
                <ExpandMoreOutlined sx={{ color: "blue.500" }} />
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
