const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: "Failed",
      message: error.details[0].message,
    });
  }

  try {
    const userCheck = await User.findOne({ email });

    if (userCheck) {
      return res.status(400).send({
        status: "Failed",
        message: "User already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ email, name, password: hashedPassword });

    res.send({
      status: "Success",
      message: "Success create new user",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Failed",
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: "Failed",
      message: error.details[0].message,
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        status: "Failed",
        message: "Email or password is invalid",
      });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).send({
        status: "Failed",
        message: "Email or password is invalid",
      });
    }

    delete user._doc.password;

    const token = jwt.sign(user._doc, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    res.send({
      status: "Success",
      message: "Success login",
      data: {
        ...user._doc,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Failed",
      message: "Internal server error",
    });
  }
};
