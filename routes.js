const mailchimpService = require("./mailchimpService")

 async function handleWaitlistConfirmation(req, res){
    console.log("Request body:",req.body)
    const email= req.body;
    if(!email){
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }
    const subscriptionResult = await mailchimpService.subscribeUser(email);
    res.json(subscriptionResult);
 }
 module.exports = {handleWaitlistConfirmation};