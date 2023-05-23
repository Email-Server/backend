const User = require("../models/user");
const Email = require("../models/email");

exports.sendMail = async function (req, res, next) {
  try {
    // Validate input
    if (!req.body.from || !req.body.to || !req.body.subject || !req.body.body) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const student = new Email({
      from: req.body.from,
      to: req.body.to,
      cc: req.body.cc,
      bcc: req.body.bcc,
      subject: req.body.subject,
      body: req.body.body,
      user: req.body.userID,
      title: req.body.title,
    });

    // Find sender and receiver
    const [sender, receiver] = await Promise.all([
      User.findOne({ email: req.body.from }),
      User.findOne({ email: req.body.to }),
    ]);

    if (!sender) {
      return res.status(404).json({
        message: "Sender not found",
      });
    }

    if (!receiver) {
      return res.status(404).json({
        message: "Receiver not found",
      });
    }

    // Save email
    await student.save();

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

/* ************************************************************************************

  here to use it : machine host/api/mail/recive
  body 
  {
    "mail":"fady321@hamada.com",
    "number":2
}
here number refer to the page so if number was 1 he will recive latest 10  if 2 will 
recive the second older 10 mails and so on 
type : post
  *****************************************************************************************/
exports.receiveMail = function (req, res, next) {
  const email = req.body.email;
  const num = req.body.number;
  const issend = req.body.isSend;
  const isSnoozed = req.body.isSnoozed;
  const isImportant = req.body.isImportant;
  const isStarred = req.body.isStarred;
  const limit = req.query.limit || 10; // default limit is 10
  const sort = req.query.sort || "-createdAt"; // default sort is by createdAt in descending order

  // Create a query object with the "to" field set to `mail`.
  let queryObj = {};
  if (issend === true) {
    queryObj.from = email;
  } else {
    queryObj.to = email;
  }
  // Add additional checks for isImportant, isStarred and isSnoozed
  if (isImportant === true) {
    queryObj.isImportant = true;
  }
  if (isStarred === true) {
    queryObj.isStarred = true;
  }
  if (isSnoozed !== undefined) {
    queryObj.isSnoozed = isSnoozed;
  }

  Email.find(queryObj)
    .sort(sort)
    .then((receiver) => {
      if (receiver.length === 0) {
        return res.status(404).json({
          message: "Empty box",
        });
      }

      const startIndex = (num - 1) * limit;
      const endIndex = startIndex + limit;

      const pagedReceiver = receiver.slice(startIndex, endIndex);

      res.status(200).json({
        status: "success",
        count: Math.ceil(receiver.length / limit), // calculate and send the count by dividing the length by the limit and then rounding up to the nearest integer
        receiver: pagedReceiver,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    });
};

exports.issend = function (req, res, next) {
  const email = req.body.email;
  const num = req.body.number;
  const isSnoozed = req.body.isSnoozed;
  const isImportant = req.body.isImportant;
  const isStarred = req.body.isStarred;
  const limit = req.query.limit || 10; // default limit is 10
  const sort = req.query.sort || "-createdAt"; // default sort is by createdAt in descending order

  // Create a query object with the "to" field set to `mail`.
  let queryObj = { from: email };

  // Add additional checks for isImportant, isStarred and isSnoozed
  // if (isImportant === true) {
  //   queryObj.isImportant = true;
  // }
  // if (isStarred === true) {
  //   queryObj.isStarred = true;
  // }
  // if (isSnoozed !== undefined) {
  //   queryObj.isSnoozed = isSnoozed;
  // }

  Email.find(queryObj)
    .sort(sort)
    .then((receiver) => {
      if (receiver.length === 0) {
        return res.status(404).json({
          message: "Empty box",
        });
      }

      const startIndex = (num - 1) * limit;
      const endIndex = startIndex + limit;

      const pagedReceiver = receiver.slice(startIndex, endIndex);

      res.status(200).json({
        status: "success",
        count: Math.ceil(receiver.length / limit), // calculate and send the count by dividing the length by the limit and then rounding up to the nearest integer
        receiver: pagedReceiver,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    });
};
