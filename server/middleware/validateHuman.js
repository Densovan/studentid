require("dotenv").config();
// =====> Import <=====
const fetch = require("node-fetch");

const { RECAPCHA_SECRET_KEY } = process.env;

exports.validateHuman = async function (token) {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPCHA_SECRET_KEY}&response=${token}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  return data.success;
};
