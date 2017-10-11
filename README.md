# API tests project

### Table of contents
* [Set up computer](#set-up-computer)
* [Project installation](#project-installation)
* [Project settings](#project-settings)
* [Jenkins settings](#jenkins-settings)
* [Code style](#code-style)
* [Run tests](#run-tests)
* [Reports](#reports)

## About
This project are implemented using the [Mocha](http://mochajs.org/) - JavaScript test framework, with the [Chai](http://chaijs.com/) assertion library. Setup assumes development of scripts in BDD (Behavior-Driven Development) style, which makes code easy to read, and the test results are clear not only for the development team, but also for the management. Scripts runs from [Jenkins](https://jenkins.io/). Test results are formed by [Allure Reporter](https://github.com/allure-framework/allure-mocha) and [JUnit Reporter](https://www.npmjs.com/package/mocha-junit-reporter).





## Set up computer
1. Install [Node.js](https://nodejs.org/):
 * To check it is installed open terminal and run command:
 `$ node -v`
2. Install IDE you prefer:
 * [WebStorm](https://www.jetbrains.com/webstorm/)
 * [Visual Studio](https://code.visualstudio.com/)
 * [NetBeans](https://netbeans.org/)
 * [Codenvy](https://www.codenvy.com/)

 or some other.




## Project installation:
1. Create new project repository
2. Fork all files from this repository to new project repository
3. Pull new project repository to some folder locally and open it with IDE
4. Open terminal and run command:
`$ npm -install`
5. Configure your new project





## Project settings:
#### **package.json**

 * Set project name in

 ```javascript
 "name": "api_tests_new_project",
 ```

 * Set project version in

 ```javascript
 "version": "1.0.0",
 ```

 * Set project description in

 ```javascript
 "description": "API tests for new project",
 ```

 * Set project repository in

 ```javascript
 "repository":{
    "url": "git@gitlab.your_newproject_url.git"
 },
 ```

---
#### **.env**
* Set up test server in **API_URL** parameter

```
API_URL=https://servername.net/api/v1
```

* Set up some fixtures for tests (for example login/pass)

```
LOGIN_USER=user@example.com
PASS_USER=123456
```

---
#### **mocha.opts**
* Set timeout for tests

```
--timeout 10000
```

---
#### **test.bootstrap**
* Set global variables from .env

```javascript
app = process.env.API_URL;
emailUser = process.env.LOGIN_USER;
passUser = process.env.PASS_USER;
```

---





## Jenkins settings:








## Code style:
**Project provides:**
<a name="interface"></a>
* **BDD**-style interface by [Mocha](http://mochajs.org/) framework

```javascript
describe('Mega test', function() {
  	describe('Test 1', function() {
    	it('should do something', function() {
    });
  });
});
```

---
* **expect()** - style assertions by [Chai](http://chaijs.com/) library

```javascript
expect(res).to.have.status(200);
expect(res.body.data).to.have.property('email', 'user@example.com');
```

---
* **apiHelper** - you can write here some request that need to be done to make preconditions for test.

For example, we need user authorisation token to test request that get user balance.

In **apiHelper** folder we create file with name **getUserTokenHelper**
And write here function that get user auth token and set it to **.env** file as **TOKEN_USER** parameter.

```javascript
getUserTokenHelper.js

it('get user token', function (done) {

    let url = '/login';

    chai.request(app)
        .post(url)
        .send({
            email: emailUser,
            password: passUser,
        })
        .end(function (err, res) {
            expect(res).to.have.status(201);
            process.env['TOKEN_USER'] = res.body.data.token;
            done();
        });
});
```
After that we need to call this file in our test to run it and use **TOKEN_USER** parameter for authorisation
```javascript
getUserBalance.js

describe('Get user balance |', function () {

    require('../../apiHelper/getUserTokenHelper');
    let url = '/user/balance';

    it('should get user balance', function (done) {
       chai.request(app)
           .get(url)
           .set('X-Authorization', 'Bearer ' + process.env.TOKEN_USER)
           .end(function (err, res) {
 expect(res).to.have.status(200);
 expect(res.body.data).to.have.property('balance').to.be.a('number');
 done();
	});
});
```




## Run tests:
* To run all tests in folder **test** and subfolders, run command in the terminal

`$ npm test`

* To run exclusive tests use **[.only()](http://mochajs.org/#exclusive-tests)** feature

* To run inclusive tests use **[.skip()](http://mochajs.org/#inclusive-tests)** feature




## Reports:
Test results are formed by [Allure Reporter](https://github.com/allure-framework/allure-mocha) and [JUnit Reporter](https://www.npmjs.com/package/mocha-junit-reporter).

You can find them in **last Completed Build** of Jenkins job.

Also Jenkins Job will alet about failed tests in Slack chat.


