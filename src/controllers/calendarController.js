const logger = require("../config/logger");
const Joi = require("joi");
const User = require("../models/user");
const Calendar = require("../models/calendar");

//////////////////////////////////////////////////////////////////////!
exports.get = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("no user with such email");

    const calendars = await Calendar.find({ user: req.body.email }).select(
      "-timestamps -__v"
    );
    if (calendars.length <= 0)
      return res.status(404).send("no calendars for this user");

    return res.send(calendars);
  } catch (err) {
    logger("error", `${err}`);
  }
};

//////////////////////////////////////////////////////////////////////!
exports.remove = async (req, res) => {
  try {
    const schema = Joi.object({
      calendarId: Joi.objectId().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let calendar = await Calendar.findById(req.body.calendarId);
    if (!calendar) return res.status(404).send("no calender with such id");

    await Calendar.findByIdAndDelete(req.body.calendarId);
    return res.send("calendar deleted successfully!");
  } catch (err) {
    logger("error", `${err}`);
  }
};

//////////////////////////////////////////////////////////////////////!
exports.create = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    title: Joi.string().required(),
    start: Joi.date().required(),
    end: Joi.date().required(),
    location: Joi.string(),
    description: Joi.string(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const calendar = new Calendar({
    user: req.body.email,
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    organizerEmail: req.body.email,
    location: req.body.location,
    description: req.body.description,
  });
  try {
    const saved = await calendar.save();
    return res.send("calendar created successfully!");
  } catch (err) {
    logger("error", `${err}`);
  }
};

//////////////////////////////////////////////////////////////////////!
exports.edit = async (req, res) => {
  const schema = Joi.object({
    id: Joi.objectId().required(),
    title: Joi.string().required(),
    start: Joi.date().required(),
    end: Joi.date().required(),
    location: Joi.string(),
    description: Joi.string(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const calendar = await Calendar.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    }).select("-__v -timestamps");

    if (!calendar) return res.status(404).send("calendar not found");

    return res.send(calendar);
  } catch (err) {
    logger("error", `${err}`);
  }
};
