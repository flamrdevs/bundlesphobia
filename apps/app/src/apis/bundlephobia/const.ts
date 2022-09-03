import axios from "axios";

const BundlephobiaAxios = axios.create({
  baseURL: "https://bundlephobia.com",
});

export { BundlephobiaAxios };
