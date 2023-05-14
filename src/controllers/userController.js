const User = require('../models/user');
const Email = require('../models/email');





  /* ************************************************************************

  here to use it : machine host/api/mail/send
  body 
  
{
    "from":"fady@gmail.com",
    "to":"ahmed@hamada.com",
    "subject":"zeus12",
    "body":"zeus",
    "userID":"6460d67675e81fff3b365459"
   

}

here theeres the manatory fileds and user id means the sender id 
type : post
  ***********************************************************************************/
 

exports.sendMail = async function (req, res, next) {
  try {
    // Validate input
    if (!req.body.from || !req.body.to || !req.body.subject || !req.body.body) {
      return res.status(400).json({
        message: 'Missing required fields'
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
    });

    // Find sender and receiver
    const [sender, receiver] = await Promise.all([
      User.findOne({ email: req.body.from }),
      User.findOne({ email: req.body.to })
    ]);

    if (!sender) {
      return res.status(404).json({
        message: 'Sender not found'
      });
    }

    if (!receiver) {
      return res.status(404).json({
        message: 'Receiver not found'
      });
    }
    
    // Save email
    await student.save();

    res.status(200).json({
      status: 'success'
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error',
      error: error.message
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
    const mail = req.body.mail;
    const num = req.body.number;
    const limit = req.query.limit || 10; // default limit is 10
    const sort = req.query.sort || '-createdAt'; // default sort is by createdAt in descending order
    
    Email.find({ to: mail })
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
          count: pagedReceiver.length,
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
  
  

  
  

