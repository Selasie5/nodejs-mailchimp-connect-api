const mailchimp = require("@mailchimp/mailchimp_marketing")
//Configure mailchimp
mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_KEY,
})
const listID = process.env.MAILCHIMP_AUDIENCE_ID;

async function subscribeUser(email){
    try {
        const response = await mailchimp.lists.addListMember(listID,{
            email_address: email,
            status: "subscribed"
        });
        console.log(`Successfully added contact with ID ${reponse.id}`);
        return {success: true, message: "Successfully subscribed to the list"};
    } catch (error) {
        console.error("Error suscribing user:", error);
        return {success: false, message:"Failed to subscribe to the list.Please try again later"};
    }
}

module.exports = {subscribeUser};