import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  data: {
    results: [],
  },
});

export default api;