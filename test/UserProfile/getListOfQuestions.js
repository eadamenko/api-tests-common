describe('Get List Of Questions', function () {
    describe('When new user submit registration form in next step he can see Security Questions', function () {
        it('should be the list of questions', function (done) {
            chai.request(app)
                .get('/questions')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.data.group1[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.data.group1[0]).to.have.property('statement').to.be.a('string');
                    expect(res.body.data.group2[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.data.group2[0]).to.have.property('statement').to.be.a('string');
                    expect(res.body.data.group3[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.data.group3[0]).to.have.property('statement').to.be.a('string');
                    done();
                });
        });
    });

});