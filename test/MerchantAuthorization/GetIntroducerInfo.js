describe('Get introducer info', function () {
    describe('When new user register he choose his introducer', function () {
        it('should be an error if there is no introducer email', function (done) {
            chai.request(app)
                .get('/validate/introducer?email=')
                .end(function (err, res) {
                    res.should.have.status(422);
                    res.body.should.have.property('message', 'Email or Ref is required field');
                    done();
                });
        });

        it('should be an error if there is no introducer with such email registered', function (done) {
            chai.request(app)
                .get('/validate/introducer?email=' + 'invalidemail@example.com')
                .end(function (err, res) {
                    res.should.have.status(404);
                    res.body.should.have.property('message', 'An account with this email address does not exist. Please check and correct your data.');
                    done();
                });
        });

        it('should validate introducer', function (done) {
            chai.request(app)
                .get('/validate/introducer?email=' + 'testuser1@example.com')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.data.should.have.property('email', 'testuser1@example.com');
                    res.body.data.should.have.property('nickname').to.be.a('string');
                    res.body.data.should.have.property('id').to.be.a('number');
                    res.body.data.kingdom.should.have.property('id').to.be.a('number');
                    res.body.data.kingdom.should.have.property('name').to.be.a('string');
                    res.body.data.kingdom.should.have.property('king_name').to.be.a('string');
                    res.body.data.kingdom.should.have.property('icon').to.be.a('string');
                    res.body.data.kingdom.should.have.property('total_consumption').to.be.a('number');
                    res.body.data.kingdom.should.have.property('population').to.be.a('number');
                    done();
                });
        });
    });

});