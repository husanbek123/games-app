import axios from "axios";

const Instance = axios.create({
  baseURL: "https://api.rawg.io/api/",
  timeout: 20000,
});
export default Instance;
