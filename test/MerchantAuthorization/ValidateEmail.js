describe('Validate Email', function () {
    describe('When new user submit registration form', function () {
        it('should be an error if there is no email', function (done) {
            chai.request(app)
                .post('/validate/email') //empty email
                .end(function (err, res) {
                    res.should.have.status(422);
                    res.body.should.have.property('message').equal('Invalid data in request body');
                    done();
                })
        });
    });

});