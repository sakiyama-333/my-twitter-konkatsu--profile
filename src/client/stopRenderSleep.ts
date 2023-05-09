import { axiosInstance } from "./axiosInstance";

export const sendHttpRequest = async () => {
  try {
    const res = await axiosInstance.get("/api/render");
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};
