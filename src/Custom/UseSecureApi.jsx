import axios from "axios";

const SecureApi = axios.create({
  baseURL: "https://assi-12-server.vercel.app",
});
const UseSecureApi = () => {
  return SecureApi;
};

export default UseSecureApi;
