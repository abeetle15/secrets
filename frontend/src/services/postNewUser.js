import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/secrets";

export default async function postNewUser(username, password) {
  console.log(API_BASE_URL);
  const response = await axios.post(`${API_BASE_URL}/signup`, {
    username,
    password,
  });
  console.log(response);
  return response;
}
