const logger = require("../config/logger");
const { validateScheduler, Scheduler } = require("../models/scheduler");
const User = require("../models/user");
const Calendar = require("../models/calendar");
const Joi = require("joi");

//////////////////////////////////////////////////////////////////////!
exports.send = async (req, res) => {
  const { error } = validateScheduler(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const organizer = await User.findOne({ email: req.body.organizerEmail });
    if (!organizer) return res.status(404).send("no organizer with such email");

    const attendee = await User.findOne({ email: req.body.attendeeEmail });
    if (!attendee) return res.status(404).send("no attendee with such email");

    let scheduler = await Scheduler.findOne({
      organizerEmail: req.body.organizerEmail,
      attendeeEmail: req.body.attendeeEmail,
      title: req.body.title,
    });
    if (scheduler)
      return res
        .status(400)
        .send(
          "already sent!, or repeated title(titles must be unique per user)"
        );

    scheduler = new Scheduler(req.body);
    await scheduler.save();
    return res.send("request sent successfully!");
  } catch (error) {
    logger("error", `${error}`);
  }
};

////////////////////////////////////////////////////////////////////////!
exports.receive = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const attendee = await User.findOne({ email: req.body.email });
    if (!attendee) return res.status(404).send("no user with such email");

    let schedules = await Scheduler.find({
      $or: [
        { attendeeEmail: req.body.email },
        { organizerEmail: req.body.email },
      ],
    }).select("-timestamps");
    if (!schedules) return res.status(404).send("no schedules for this user");

    const sentSchedules = schedules.filter(
      (schedule) => schedule.organizerEmail === req.body.email
    );

    const receivedSchedules = schedules.filter(
      (schedule) => schedule.attendeeEmail === req.body.email
    );
    let newReceivedSchedules = receivedSchedules.map((schedule) => {
      schedule.received = true;
      schedule.save();
      return schedule;
    });

    return res.send({ sent: sentSchedules, received: newReceivedSchedules });
  } catch (error) {
    logger("error", `${error}`);
  }
};

//////////////////////////////////////////////////////////////////////////////!
exports.approve = async (req, res) => {
  const schema = Joi.object({
    schedulerId: Joi.objectId().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let scheduler = await Scheduler.findById(req.body.schedulerId);
    if (!scheduler) return res.status(404).send("no scheduler with such id");
    scheduler = await Scheduler.findByIdAndUpdate(
      req.body.schedulerId,
      { approved: "yes" },
      { new: true }
    );

    let oCalendar = await Calendar.findOne({
      user: scheduler.organizerEmail,
      title: scheduler.title,
    });
    if (!oCalendar) {
      oCalendar = await new Calendar({
        user: scheduler.organizerEmail,
        title: scheduler.title,
        description: scheduler.description ? scheduler.description : "",
        start: scheduler.start,
        end: scheduler.end,
        organizerEmail: scheduler.organizerEmail,
        location: scheduler.location ? scheduler.location : "",
        attendees: [scheduler.attendeeEmail],
      });
      oCalendar = await oCalendar.save();
    } else {
      const isThere = oCalendar.attendees.indexOf(scheduler.attendeeEmail);
      if (isThere == -1) {
        oCalendar.attendees = [...oCalendar.attendees, scheduler.attendeeEmail];
        oCalendar = await oCalendar.save();
      } else {
        return res.status(400).send("this user already approved");
      }
    }

    let aCalendar = await Calendar.findOne({
      user: scheduler.attendeeEmail,
      title: scheduler.title,
    });
    if (!aCalendar) {
      aCalendar = await new Calendar({
        user: scheduler.attendeeEmail,
        title: scheduler.title,
        description: scheduler.description ? scheduler.description : "",
        start: scheduler.start,
        end: scheduler.end,
        organizerEmail: scheduler.organizerEmail,
        location: scheduler.location ? scheduler.location : "",
        attendees: [],
      });
      aCalendar = await aCalendar.save();
    }

    await Scheduler.findByIdAndDelete(req.body.schedulerId);

    return res.send("schedule was approved successfully!");
  } catch (error) {
    logger("error", `${error}`);
  }
};

//////////////////////////////////////////////////////////////////////////////!
exports.ignore = async (req, res) => {
  const schema = Joi.object({
    schedulerId: Joi.objectId().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let scheduler = await Scheduler.findById(req.body.schedulerId);
    if (!scheduler) return res.status(404).send("no scheduler with such id");

    scheduler = await Scheduler.findByIdAndUpdate(
      req.body.schedulerId,
      { approved: "no" },
      { new: true }
    );
    return res.send("scheduler was ignored successfully!");
  } catch (error) {
    logger("error", `${error}`);
  }
};

//////////////////////////////////////////////////////////////////////////////!
exports.remove = async (req, res) => {
  const schema = Joi.object({
    schedulerId: Joi.objectId().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let scheduler = await Scheduler.findById(req.body.schedulerId);
    if (!scheduler) return res.status(404).send("no scheduler with such id");

    if (scheduler.approved == "yes")
      return res
        .status(400)
        .send(
          "you can't delete this from here you should delete it from the calendar"
        );

    await Scheduler.findByIdAndDelete(req.body.schedulerId);
    return res.send("scheduler was deleted successfully!");
  } catch (error) {
    logger("error", `${error}`);
  }
};
