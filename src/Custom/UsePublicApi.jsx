import axios from "axios";

const publicApi = axios.create({
  baseURL: "http://localhost:5000",
});
const UsePublicApi = () => {
  return publicApi;
};

export default UsePublicApi;
