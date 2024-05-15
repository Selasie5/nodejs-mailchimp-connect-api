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
    if(subscriptionResult.success)
        {
            return res.status(200).json(subscriptionResult);
        }
        else{
            return res.status(500).json(subscriptionResult);
        }
    // res.json(subscriptionResult);
 }
 module.exports = {handleWaitlistConfirmation};