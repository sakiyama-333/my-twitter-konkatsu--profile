import { FC, MouseEvent, useState } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import { Container, Divider, styled } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const profileHandler = () => {
    router.push("/profile");
    handleClose();
  };

  const logoutHandler = async () => {
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
    handleClose();
  };

  const withdrawalHandler = async () => {
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
    handleClose();
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
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                MENU
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={profileHandler}>
                  <PersonIcon fontSize="small" sx={{ opacity: 0.5, mr: 1 }} />
                  マイページへ
                </MenuItem>
                <MenuItem onClick={logoutHandler}>
                  <Logout fontSize="small" sx={{ opacity: 0.5, mr: 1 }} />
                  ログアウトする
                </MenuItem>
                <MenuItem
                  onClick={withdrawalHandler}
                  sx={{ color: theme.palette.error.main }}
                >
                  <PersonOffIcon
                    fontSize="small"
                    sx={{ color: "#000000", opacity: 0.5, mr: 1 }}
                  />
                  退会する
                </MenuItem>
              </Menu>
            </div>
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
