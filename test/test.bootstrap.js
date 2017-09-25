process.env.NODE_ENV='test'; // any more test specific init code

global.chai = require('chai');
global.chaiHttp = require('chai-http');
global.should  = chai.should();
global.expect = chai.expect;
global.faker = require('faker');

require('dotenv').config();

chai.use(chaiHttp);

app = process.env.API_URL;
emailMerchant = process.env.LOGIN_MERCHANT;
passMerchant = process.env.PASS_MERCHANT;
emailAdmin = process.env.LOGIN_AMDIN;
passAdmin = process.env.PASS_ADMIN;


before(function () {
    describe('get bearer Token', function () {
        it('get merchant token', function (done) {
            chai.request(app)
                .post('/sessions')
                .send({
                    email: emailMerchant,
                    password: passMerchant,
                    usertype: '2',
                })
                .end(function (err, res) {
                    res.should.have.status(201);
                    var merchantToken = res.body.data.token;
                    return merchantToken;
                    done();
                });
        });
    });

});


