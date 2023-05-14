
const Email = require('../models/email');






// This function updates the isRead property of an email document in the database.

/*
to use it 
apiurl: machine host/api/feedback/msgread/email_id
no body 
type :patch
*/ 
exports.msgread = async (req, res, next) => {
    // Extract the required information from the request body
    const mailID  = req.params.id;
    const {isRead,isStarred,isImportant} = req.body;
    try {
      // Find the email document with the given ID
      const email = await Email.findOne({ _id: mailID });
  
      // If no email document is found, return a 404 response
      if (!email) {
        return res.status(404).json({
          message: "Mail not found",
        });
      }
  
      // Create an updated email object with the new isRead value
      const updatedEmail = {
        isRead: isRead,
        isStarred:isStarred,
        isImportant:isImportant
      };
  
      // Update the email document in the database
      const result = await Email.updateOne({ _id: mailID }, updatedEmail);
  
      // If the update did not modify any documents, throw an error
      if (result.nModified <= 0) {
        throw new Error("Failed to update mail read status");
      }
  
      // Return a success response
      res.status(200).json({
        message: "Mail read status updated successfully",
      });
    } catch (error) {
      // If an error occurs during the update process, return a 500 response with an error message
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  
  
  

  

 


