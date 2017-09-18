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





