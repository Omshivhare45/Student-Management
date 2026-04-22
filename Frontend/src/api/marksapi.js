import API from "../hooks/axiosInstance";

export const marksAPI = {
  getAll: (studentId = "") =>
    API.get(`/marks${studentId ? `?studentId=${studentId}` : ""}`),

  add: (data) => API.post("/marks", data),

  update: (id, data) => API.put(`/marks/${id}`, data),

  delete: (id) => API.delete(`/marks/${id}`),
};