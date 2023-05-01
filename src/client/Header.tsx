import { FC, MouseEvent, useState } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  ThemeProvider,
  Toolbar,
  Tooltip,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import theme from "./theme/Color";
import { useAtom } from "jotai";
import loginUserAtom from "./Atom";
import Link from "next/link";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";

export const Header: FC = () => {
  const router = useRouter();
  const [loginUser] = useAtom(loginUserAtom);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Sheader>
      <Sdecoration />
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/">
          <Image
            className="logo_image"
            src="/logo.svg"
            alt="logo image"
            width={120}
            height={70}
            priority
          />
        </Link>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <SearchIcon
            sx={{
              width: 32,
              height: 32,
              color: theme.palette.customDarkGreen.main,
            }}
          />
          <div>
            {/* <Tooltip title="Account settings"> */}
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                alt={loginUser?.name}
                src={loginUser?.profilePhoto as string}
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
            {/* </Tooltip> */}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
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
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={() => {
                  router.push("/profile");
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                マイページへ
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                設定
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                ログアウト
              </MenuItem>
            </Menu>
          </div>
        </Grid>
      </Container>
    </Sheader>
  );
};

const Sheader = styled("header")({
  marginBottom: "48px",
  background: theme.palette.customMintGreen.main,
});

const Sdecoration = styled("div")({
  height: "5px",
  background: theme.palette.customPink.main,
});
