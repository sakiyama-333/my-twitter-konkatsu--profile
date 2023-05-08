import { FC, MouseEvent, useState } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import {
  Avatar,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import theme from "./theme/Color";
import { useAtom } from "jotai";
import Link from "next/link";
import { Logout } from "@mui/icons-material";
import { loginUserAtom } from "./Atom";
import axios, { AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";
import { toast } from "react-toastify";

export const Header: FC = () => {
  const router = useRouter();
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const logoutHandler = async () => {
    handleClose();
    try {
      const res = await axiosInstance.delete("/api/logout");
      toast.success(res.data, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoginUser(null);
      router.replace("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        // router.replace("/error"); //エラーが出た場合はエラーページに飛ばす
        toast.error("エラーが発生しました。もう一度やり直してください", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const withdrawalHandler = async () => {
    handleClose();
    try {
      const res = await axiosInstance.delete("/api/withdrawal", {
        data: { id: loginUser?._id },
      });

      toast.success(res.data, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoginUser(null);
      router.replace("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        // router.replace("/error"); //エラーが出た場合はエラーページに飛ばす
        toast.error("退会処理に失敗しました", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Sheader>
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
              width={70}
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
            {loginUser ? (
              <div>
                ログイン済み
                <Image src={loginUser.profilePhoto} alt="" />
              </div>
            ) : (
              <div>ログインしていない</div>
            )}
            {/* <div>
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

                  <MenuItem onClick={logoutHandler}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    ログアウト
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={withdrawalHandler}>
                    <ListItemIcon>
                      <PersonOffIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography sx={{ color: theme.palette.error.main }}>
                      退会する
                    </Typography>
                  </MenuItem>
                </Menu>
              </div> */}
          </Grid>
        </Container>
      </Sheader>
    </>
  );
};

const Sheader = styled("header")({
  marginBottom: "48px",
  padding: "8px 0",
  background: theme.palette.customMintGreen.main,
  borderTop: `5px solid ${theme.palette.customPink.main}`,
});
