import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://docauth.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
