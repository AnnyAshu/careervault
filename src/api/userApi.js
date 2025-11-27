import axios from "axios";

export const getAdminStats = async () => {
  const res = await axios.get("https://localhost:7152/api/admin/stats");
  return res.data;
};

export const getRecentUsers = async () => {
  const res = await axios.get("https://localhost:7152/api/admin/recent-users");
  return res.data;
};
