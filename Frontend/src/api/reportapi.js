import API from "..hooks/axiosInstance";
export const getReport = (studentId) => API.get(`/students/${studentId}/report`);