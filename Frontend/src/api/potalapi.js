import API from "../hooks/axiosInstance";
export const getPortalData = (rollNumber) => API.get(`/portal/${rollNumber}`);