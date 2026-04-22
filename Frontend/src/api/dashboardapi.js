import API from "../hooks/axiosInstance";

export const dashboardAPI = {
  getStats: () => API.get("/dashboard"),
};