import axios from "axios";

const publicApi = axios.create({
  baseURL: "https://assi-12-server.vercel.app",
});
const UsePublicApi = () => {
  return publicApi;
};

export default UsePublicApi;
