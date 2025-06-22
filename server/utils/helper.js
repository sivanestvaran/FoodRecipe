require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateEmail = require("email-validator");


const validationInputs = (fields) => {
  let messages = [];

  Object.entries(fields).forEach(([key, value]) => {
    if (key == 'email' && value.trim() != '' && !validateEmail.validate(fields.email)) {
      messages.push(`${key[0].toUpperCase() + key.slice(1)} is not valid`);
    }

    if (value.trim() == '') {
      messages.push(`${key[0].toUpperCase() + key.slice(1)} is required`);
    }
  });

  if (fields?.confirm) {
    const password_isMatch = checkPasswordString(fields.password, fields.confirm)

    if (fields.password.trim() != '' && fields.confirm.trim() != '' && !password_isMatch) {
      messages.push('Both password and confirm password is not match ')
    }

  }


  return messages;
};

const checkPasswordString = (password, confirm_password) => {
  if (password != confirm_password) {
    return false
  }
  return true
}

const verifyPassword = async (password, hashpassword) => {
  const isMatch = await bcrypt.compare(password, hashpassword)
  return isMatch
}

const convertHash = async (password) => {
  const hashpassword = await bcrypt.hash(password, 10);

  return hashpassword;
};

const generateToken = (id) => {
  SECRET_CODE = process.env.SECRET_CODE;
  const token = jwt.sign({ id }, SECRET_CODE, { expiresIn: "1d" });
  return token;
};

module.exports = { validationInputs, convertHash, generateToken, verifyPassword };
