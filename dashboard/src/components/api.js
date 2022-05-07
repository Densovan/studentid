import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

const myApiKey = process.env["API_KEY"];

// set up the request parameters
// const params = {
//   api_key: "BFDA85E74A8C43D48E5364795D0A090F",
//   type: "product",
//   amazon_domain: "amazon.com",
//   asin: "B073JYC4XM",
// };
const params = {
  api_key: "BFDA85E74A8C43D48E5364795D0A090F",
  type: "bestsellers",
  url: "https://www.amazon.com/s/zgbs/pc/516866",
};
const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: "https://api.rainforestapi.com",
  })
  //options
);

// All Products
export const getProductsList = () => {
  return client.get("/request", { params });
};

// Get Product by ID
export const getDetail = (id) => {
  return client.get(`/request/${id}`, { params });
};
