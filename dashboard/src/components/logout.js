import axios from "axios";
import { message } from "antd";

const Logout = () => {
  axios
    .get(`https://id.saladigital.org/logout`, {
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
