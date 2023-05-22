const Joi = require("joi");
const logger = require("../config/logger");
const User = require("../models/user");

//////////////////////////////////////////////////////////////////////!
exports.add = async (req, res) => {
  const schema = Joi.object({
    userEmail: Joi.string().email().required(),
    contactName: Joi.string().required(),
    contactEmail: Joi.string().email().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const contact = await User.findOne({ email: req.body.contactEmail });
    if (!contact) return res.status(404).send("no user with that contactEmail");

    let user = await User.findOne({ email: req.body.userEmail });
    if (!user) return res.status(404).send("no user with that userEmail");

    user.contacts = [
      ...user.contacts,
      { name: req.body.contactName, email: req.body.contactEmail },
    ];

    await user.save();

    return res.send("contact has been added successfully!");
  } catch (error) {
    logger("error", `${error}`);
  }
};

//////////////////////////////////////////////////////////////////////!
exports.get = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("no user with that email");

    return res.send(user.contacts);
  } catch (error) {
    logger("error", `${error}`);
  }
};

//////////////////////////////////////////////////////////////////////!
exports.remove = async (req, res) => {
  const schema = Joi.object({
    userEmail: Joi.string().email().required(),
    contactEmail: Joi.string().email().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let user = await User.findOne({ email: req.body.userEmail });
    if (!user) return res.status(404).send("no user with that userEmail");

    const contact = await User.findOne({ email: req.body.contactEmail });
    if (!contact) return res.status(404).send("no user with that contactEmail");

    user.contacts = user.contacts.filter(
      (user) => user.email !== req.body.contactEmail
    );

    const newUser = await User.findOneAndUpdate(
      { email: req.body.userEmail },
      user,
      { new: true }
    );

    return res.send("contact has been removed successfully!");
  } catch (error) {
    logger("error", `${error}`);
  }
};
