import axios from "axios";

const SecureApi = axios.create({
  baseURL: "http://localhost:5000",
});
const UseSecureApi = () => {
  return SecureApi;
};

export default UseSecureApi;
