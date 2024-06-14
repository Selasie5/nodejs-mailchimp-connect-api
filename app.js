const express = require("express");
const app = express();
const cors = require("cors")
const mailchimp = require("@mailchimp/mailchimp_marketing");
require('dotenv').config();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const { handleWaitlistConfirmation } = require("./routes");
const swaggerSetup = require("./swagger")




const corsOption={
    origin: "https://web.postman.co/workspace/My-Workspace~d766bfaa-9fd0-4150-8bff-fa56f7a4fc58",
    optionSuccessStatus: 200
}
app.use(cors(corsOption));
// Middleware to handle parsing the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this to parse JSON body

app.post("/waitlist-confirm", handleWaitlistConfirmation);
app.get("/",(req,res)=>
{
    res.send("Welcome to The Mailchimp Connect API")
})

// Confirming that Mailchimp is working effectively
async function run() {
    try {
        const response = await mailchimp.ping.get();
        console.log(response);
        console.log("Mailchimp is successfully running");
    } catch (error) {
        console.log(error);
    }
}

swaggerSetup(app);
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
    run();
});
