describe('Login |', function () {

    let url = '/sessions';

    describe('When merchant user try to login |', function () {
        it('should not login with invalid email', function (done) {
            chai.request(app)
                .post(url)
                .send({
                    email: 'merchant1@example.comm', //invalid email
                    password: passMerchant,
                    usertype: '2',

                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Wrong email or password');
                    done();
                });
        });

        it('should not login with invalid password', function (done) {
            chai.request(app)
                .post(url)
                .send({
                    email: emailMerchant,
                    password: '1234567', //invalid pass
                    usertype: '2',
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Wrong email or password');
                    done();
                });
        });

        it('should not login with invalid usertype', function (done) {
            chai.request(app)
                .post(url)
                .send({
                    email: emailAdmin,
                    password: passAdmin,
                    usertype: '2', //this user have usertype 3
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Wrong email or password');
                    done();
                });
        });

        it('should be an error if field with invalid request payload', function (done) {
            chai.request(app)
                .post(url)
                .send({
                    // invalid request payload
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.have.property('message', 'Invalid data in request body');
                    expect(res.body).to.have.property('errors');
                    done();
                });
        });

        it('should login', function (done) {
            chai.request(app)
                .post(url)
                .send({
                    email: emailMerchant,
                    password: passMerchant,
                    usertype: '2',
                })
                .end(function (err, res) {
                    expect(res).to.have.status(201);
                    expect(res.body.data).to.have.property('token').not.equal(null);
                    expect(res.body.data.user).to.have.property('name').to.be.a('string');
                    done();
                });
        });

    });

});

