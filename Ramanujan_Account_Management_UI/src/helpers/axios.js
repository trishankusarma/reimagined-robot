import axios from "axios";

const Instance = (token) => {
 return axios.create({
    baseURL: "http://localhost:8080",
    // baseURL: "https://accounts.ramanujanacademy.co.in:8080",
    credentials: "include",
    withCredentials: true,
    headers: {
      auth: token ? `${token}` : null,
    },
  });
};
export default Instance;
