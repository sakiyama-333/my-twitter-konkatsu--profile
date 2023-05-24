import { FC, MouseEvent, useState } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Modal,
  styled,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Unstable_Grid2";
import SearchIcon from "@mui/icons-material/Search";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import theme from "./theme/Color";
import { useAtom } from "jotai";
import Link from "next/link";
import { loginUserAtom } from "./Atom";
import { AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";
import { toast } from "react-toastify";
import { BsFillPersonFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { MdPersonOff } from "react-icons/md";
import { PrimaryButton } from "./CustomButton";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const Header: FC = () => {
  const router = useRouter();
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const open = Boolean(anchorEl);

  const googleAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.replace(`${API_URL}/auth/google`);
  };

  const twitterAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.replace(`${API_URL}/auth/twitter`);
  };

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
          <Grid container spacing={3} sx={{ alignItems: "center" }}>
            <SearchIcon
              sx={{
                width: 32,
                height: 32,
                color: theme.palette.customDarkGreen.main,
                cursor: "pointer",
              }}
              onClick={() => router.push("/search")}
            />

            {loginUser ? (
              <div>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    src={loginUser?.profilePhoto}
                    alt={loginUser?.name}
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
                  <MenuItem onClick={profileHandler}>
                    <ListItemIcon>
                      <BsFillPersonFill />
                    </ListItemIcon>
                    マイページへ
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={logoutHandler}>
                    <ListItemIcon>
                      <FiLogOut />
                    </ListItemIcon>
                    ログアウトする
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={withdrawalHandler}
                    sx={{ color: theme.palette.error.main }}
                  >
                    <ListItemIcon>
                      <MdPersonOff />
                    </ListItemIcon>
                    退会する
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <PrimaryButton
                  type="submit"
                  variant="contained"
                  onClick={handleModalOpen}
                  sx={{ ml: 3 }}
                >
                  ログイン
                </PrimaryButton>
                <Modal
                  open={modalOpen}
                  onClose={handleModalClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                        p: "40px",
                      }}
                    >
                      <PrimaryButton
                        type="submit"
                        variant="contained"
                        onClick={googleAuth}
                        sx={{ textAlign: "center", lineHeight: "1.5", gap: 2 }}
                      >
                        <GoogleIcon />
                        GOOGLEでログイン
                      </PrimaryButton>
                      <PrimaryButton
                        type="submit"
                        variant="contained"
                        onClick={twitterAuth}
                        sx={{ textAlign: "center", lineHeight: "1.5", gap: 2 }}
                      >
                        <TwitterIcon />
                        TWITTERでログイン
                      </PrimaryButton>
                    </Box>
                  </Box>
                </Modal>
              </div>
            )}
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

const SButton = styled("button")({
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  outline: "none",
  padding: 0,
  appearance: "none",
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};
