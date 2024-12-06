import axios from "axios";

const API_BASE_URL = import.meta.env.API_BASE_URL;

export default async function verifyToken(token) {
  const response = await axios.get(`${API_BASE_URL}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
