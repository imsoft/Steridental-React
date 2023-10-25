import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    // 'Content-Type': 'application/json',
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
});

export default axiosClient;
