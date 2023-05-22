const Joi = require("joi");
const mongoose = require("mongoose");
const logger = require("../config/logger");
const Schema = mongoose.Schema;

exports.Scheduler = mongoose.model(
  "Scheduler",
  new Schema({
    organizerEmail: {
      type: String,
      required: true,
    },
    attendeeEmail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
    },
    approved: {
      type: String,
      enum: ["no", "yes", "notYet"],
      default: "notYet",
    },
    received: {
      type: Boolean,
      default: false,
    },
    timestamps: {
      type: Date,
      default: Date.now,
    },
  })
);

exports.validateScheduler = function (data) {
  const schema = Joi.object({
    organizerEmail: Joi.string().email().required(),
    attendeeEmail: Joi.string().email().required(),
    title: Joi.string().min(3).max(30).required(),
    start: Joi.date().required(),
    end: Joi.date().required(),
    approved: Joi.string().valid("no", "yes", "notYet"),
    description: Joi.string(),
    received: Joi.boolean(),
  });

  return schema.validate(data);
};
