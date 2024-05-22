const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../app'); // Adjust the path to your server file
const mailchimpService = require('../mailchimpService');
chai.use(chaiHttp);
const { expect } = chai;

describe('Mailchimp Integration', () => {
    describe('POST /waitlist-confirm', () => {
        it('should return 400 if email is not provided', (done) => {
            chai.request(app)
                .post('/waitlist-confirm')
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('success', false);
                    expect(res.body).to.have.property('message', 'Email is required');
                    done();
                });
        });

        it('should return 200 if email is provided and subscription is successful', (done) => {
            const email = 'test@example.com';

            // Stub the subscribeUser method
            stub(mailchimpService, 'subscribeUser').resolves({
                success: true,
                message: 'Successfully subscribed to the list'
            });

            chai.request(app)
                .post('/waitlist-confirm')
                .send({ email })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body).to.have.property('message', 'Successfully subscribed to the list');

                    // Restore the original method
                    subscribeUser.restore();
                    done();
                });
        });

        it('should return 500 if subscription fails', (done) => {
            const email = 'test@example.com';

            // Stub the subscribeUser method to simulate a failure
            stub(mailchimpService, 'subscribeUser').resolves({
                success: false,
                message: 'Failed to subscribe to the list. Please try again later.'
            });

            chai.request(app)
                .post('/waitlist-confirm')
                .send({ email })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('success', false);
                    expect(res.body).to.have.property('message', 'Failed to subscribe to the list. Please try again later.');

                    // Restore the original method
                    subscribeUser.restore();
                    done();
                });
        });
    });
});
