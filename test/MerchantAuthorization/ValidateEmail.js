describe('Validate Email', function () {
    describe('When new user submit registration form', function () {
        it('should be an error if email field not sended', function (done) {
            chai.request(app)
                .post('/validate/email') //empty email
                .end(function (err, res) {
                    res.should.have.status(422);
                    res.body.should.have.property('message', 'Invalid data in request body');
                    res.body.should.have.property('errors');
                    done();
                });
        });

        it('should be an error if invalid request payload', function (done) {
            chai.request(app)
                .post('/validate/email')
                .send({
                    emaill: 'someemail@example.com' //invalid field name
                })
                .end(function (err, res) {
                    res.should.have.status(422);
                    res.body.should.have.property('message', 'Invalid data in request body');
                    res.body.should.have.property('errors');
                    done();
                });
        });

        it('should be an error if account with such email already exist', function (done) {
            chai.request(app)
                .post('/validate/email')
                .send({
                    email: emailMerchant //email already exist
                })
                .end(function (err, res) {
                    res.should.have.status(409);
                    res.body.should.have.property('message', 'An account with this email address already exists');
                    done();
                });
        });

        it('should allow unique email', function (done) {
            chai.request(app)
                .post('/validate/email')
                .send({
                    email: faker.internet.email()  //unique email
                })
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});