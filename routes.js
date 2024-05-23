
/**
 * @swagger
 * /waitlist-confirm:
 *   post:
 *     summary: Confirm waitlist subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@emailProvider.com"
 *     responses:
 *       200:
 *         description: Successfully subscribed
 *       400:
 *         description: Email is required
 *       500:
 *         description: Failed to subscribe to the list
 */
const mailchimpService = require("./mailchimpService")
async function handleWaitlistConfirmation(req, res) {
    console.log("Request body:", req.body);
    const { email } = req.body; // Destructure email from req.body
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }
    const subscriptionResult = await  mailchimpService.subscribeUser(email);
    if (subscriptionResult.success) {
        return res.status(200).json(subscriptionResult);
    } else {
        return res.status(500).json(subscriptionResult);
    }
}

module.exports = { handleWaitlistConfirmation };
