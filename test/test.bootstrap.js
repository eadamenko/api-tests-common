process.env.NODE_ENV='test'; // any more test specific init code

global.chai = require('chai');
global.chaiHttp = require('chai-http');
global.expect = chai.expect;
global.faker = require('faker');

require('dotenv').config();

chai.use(chaiHttp);

app = process.env.API_URL;
emailMerchant = process.env.LOGIN_MERCHANT;
passMerchant = process.env.PASS_MERCHANT;
emailMerchant2 = process.env.LOGIN_MERCHANT_2;
passMerchant2 = process.env.PASS_MERCHANT_2;
emailCustomer = process.env.LOGIN_CUSTOMER;
passCustomer = process.env.PASS_CUSTOMER;
emailAdmin = process.env.LOGIN_ADMIN;
passAdmin = process.env.PASS_ADMIN;




