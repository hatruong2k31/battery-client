import axios from "axios";
import { SERVER } from "../config";
const axiosServices = axios.create({
  baseURL: SERVER.host,
  headers: { "Content-Type": "application/json" },
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || "Wrong Services")
);

export default axiosServices;
