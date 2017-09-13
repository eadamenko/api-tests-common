describe('Login', function () {
    describe('When merchant user try to login', function () {
        it('should not login with invalid email', function (done) {
            chai.request(app)
                .post('/sessions')
                .send({
                    email: 'merchant1@example.comm', //invalid email
                    password: passMerchant,
                    usertype: '2',

                })
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.body.should.have.property('message').equal('Invalid credential');
                    done();
                });
        });

        it('should not login with invalid password', function (done) {
            chai.request(app)
                .post('/sessions')
                .send({
                    email: emailMerchant,
                    password: '1234567', //invalid pass
                    usertype: '2',
                })
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.body.should.have.property('message').equal('Invalid credential');
                    done();
                });
        });

        it('should not login with invalid usertype', function (done) {
            chai.request(app)
                .post('/sessions')
                .send({
                    email: emailAdmin,
                    password: passAdmin,
                    usertype: '2', //this user have usertype 3
                })
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.body.should.have.property('message').equal('Invalid credential');
                    done();
                });
        });

        it('should be an error if field with invalid request payload', function (done) {
            chai.request(app)
                .post('/sessions')
                .send({
                    emaill: emailAdmin, //invalid field name
                    password: passAdmin,
                    usertype: '2',
                })
                .end(function (err, res) {
                    res.should.have.status(422);
                    res.body.should.have.property('message').equal('Invalid data in request body');
                    res.body.should.have.property('errors');
                    done();
                });
        });

        it('should login', function (done) {
            chai.request(app)
                .post('/sessions')
                .send({
                    email: emailMerchant,
                    password: passMerchant,
                    usertype: '2',
                })
                .end(function (err, res) {
                    res.should.have.status(201);
                    res.body.data.should.have.property('token').not.equal(null);
                    done();
                });
        });

    });
});

