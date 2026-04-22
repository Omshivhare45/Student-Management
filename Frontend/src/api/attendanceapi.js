import API from "../hooks/axiosInstance";

export const attendanceAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return API.get(`/attendance${params ? `?${params}` : ""}`);
  },

  mark: (data) => API.post("/attendance", data),

  delete: (id) => API.delete(`/attendance/${id}`),
};