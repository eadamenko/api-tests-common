describe('Login', function () {
    describe('Merchant user login', function () {
        it('should not login with incorrect email', function (done) {
            chai.request(app)
                .post('/sessions')
                .send({
                    email: 'merchant1@example.comm', //incorrect email
                    password: passMerchant,
                    usertype: '2',

                })
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.body.should.have.property('message').equal('Invalid credential');
                    done();
                });
        });

        it('should not login with incorrect password', function (done) {
            chai.request(app)
                .post('/sessions')
                .send({
                    email: emailMerchant,
                    password: '1234567', //incorrect pass
                    usertype: '2',
                })
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.body.should.have.property('message').equal('Invalid credential');
                    done();
                });
        });

        it('should not login with incorrect usertype', function (done) {
            chai.request(app)
                .post('/sessions')
                .send({
                    email: emailAdmin, //this user have usertype 3
                    password: passAdmin,
                    usertype: '2',
                })
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.body.should.have.property('message').equal('Invalid credential');
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

