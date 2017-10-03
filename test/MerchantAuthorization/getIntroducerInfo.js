describe('Get introducer info', function () {
    let url = '/validate/introducer?email=';
    describe('When new user register he choose his introducer', function () {
        it('should be an error if there is no introducer email', function (done) {
            chai.request(app)
                .get(url)
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.have.property('message', 'Email or Ref is required field');
                    done();
                });
        });

        it('should be an error if there is no introducer with such email registered', function (done) {
            chai.request(app)
                .get(url + 'invalidemail@example.com')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message', 'An account with this email address does not exist. Please check and correct your data.');
                    done();
                });
        });

        it('should validate introducer', function (done) {
            chai.request(app)
                .get(url + 'testuser1@example.com')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.data).to.have.property('email', 'testuser1@example.com');
                    expect(res.body.data).to.have.property('nickname').to.be.a('string');
                    expect(res.body.data).to.have.property('id').to.be.a('number');
                    expect(res.body.data.kingdom).to.have.property('id').to.be.a('number');
                    expect(res.body.data.kingdom).to.have.property('name').to.be.a('string');
                    expect(res.body.data.kingdom).to.have.property('king_name').to.be.a('string');
                    expect(res.body.data.kingdom).to.have.property('icon').to.be.a('string');
                    expect(res.body.data.kingdom).to.have.property('total_consumption').to.be.a('number');
                    expect(res.body.data.kingdom).to.have.property('population').to.be.a('number');
                    done();
                });
        });
    });

});