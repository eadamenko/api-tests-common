describe('Validate Email', function () {
    let url = '/validate/email';
    describe('When new user submit registration form', function () {
        it('should be an error if email field not sended', function (done) {
            chai.request(app)
                .post(url) //empty email
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.have.property('message', 'Invalid data in request body');
                    expect(res.body).to.have.property('errors');
                    done();
                });
        });

        it('should be an error if invalid request payload', function (done) {
            chai.request(app)
                .post(url)
                .send({
                    emaill: 'someemail@example.com' //invalid field name
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.have.property('message', 'Invalid data in request body');
                    expect(res.body).to.have.property('errors');
                    done();
                });
        });

        it('should be an error if account with such email already exist', function (done) {
            chai.request(app)
                .post(url)
                .send({
                    email: emailMerchant //email already exist
                })
                .end(function (err, res) {
                    expect(res).to.have.status(409);
                    expect(res.body).to.have.property('message', 'An account with this email address already exists');
                    done();
                });
        });

        it('should allow unique email', function (done) {
            chai.request(app)
                .post(url)
                .send({
                    email: faker.internet.email()  //unique email
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

});