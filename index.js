const express = require("express");
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing")
require('dotenv').config();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser")
const {handleWaitlistConfirmation} = require("./routes");
//Middleware to handle parsing the request body
app.use(bodyParser.urlencoded({
    extended:true
}));

app.post("/waitlist-confirm",handleWaitlistConfirmation);
//confirming that MailChimp is working effectively 
async function run()
{
    try {
        const response= await mailchimp.ping.get();
        console.log(response);
        console.log("Mailchimp is successfully running");
    } catch (error) {
        console.log(error)
    }
}
app.listen(port, ()=>
{
    console.log(`Server has started on port ${port}`);
    run();
})