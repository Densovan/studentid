import axios from "axios";
import { message } from "antd";

const { REACT_APP_LOCAL, REACT_APP_PRO } = process.env;
const apiUrl =
  process.env.NODE_ENV === "production" ? REACT_APP_PRO : REACT_APP_LOCAL;
const Logout = () => {
  axios
    .get(`${apiUrl}/logout`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then(async (res) => {
      console.log("res", res.data);
      window.location.replace("/login");
    })
    .catch((error) => {
      message.error(error.response.data.message);
    });
};

export default Logout;
