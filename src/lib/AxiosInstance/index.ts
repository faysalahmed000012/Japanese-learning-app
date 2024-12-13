import { getNewAccessToken } from "@/services/UserServices";
import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: "https://japanese-learning-app-backend.vercel.app/api",
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error.config;
    const cookieStore = await cookies();
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      const res = await getNewAccessToken();

      const accessToken = res.data.accessToken;

      config.headers["Authorization"] = `Bearer ${accessToken}`;
      cookieStore.set("accessToken", accessToken);

      return axiosInstance(config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
