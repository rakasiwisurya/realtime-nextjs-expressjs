import axios from "axios";

export const api = (token) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    timeout: process.env.NEXT_PUBLIC_RTO,
  });

  if (token) instance.defaults.headers.common["Authorization"] = token;
  instance.defaults.headers.common["Content-Type"] = "application/json";

  return instance;
};
