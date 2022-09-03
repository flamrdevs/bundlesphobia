import axios from "axios";

const NPMAxios = axios.create({
  baseURL: "https://registry.npmjs.org",
});

export { NPMAxios };
