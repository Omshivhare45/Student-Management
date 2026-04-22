import API from "../hooks/axiosInstance";

export const studentAPI = {
  getAll: (search = "") =>
    API.get(`/students${search ? `?search=${search}` : ""}`),

  getById: (id) => API.get(`/students/${id}`),

  add: (data) => API.post("/students", data),

  update: (id, data) => API.put(`/students/${id}`, data),

  delete: (id) => API.delete(`/students/${id}`),
};