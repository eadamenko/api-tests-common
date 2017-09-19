describe('Get List Of Questions', function () {
    describe('When new user submit registration form in next step he can see Security Questions', function () {
        it('should be the list of questions', function (done) {
            chai.request(app)
                .get('/questions')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.data.group1[0].should.have.property('id').to.be.a('number');
                    res.body.data.group1[0].should.have.property('statement').to.be.a('string');
                    res.body.data.group2[0].should.have.property('id').to.be.a('number');
                    res.body.data.group2[0].should.have.property('statement').to.be.a('string');
                    res.body.data.group3[0].should.have.property('id').to.be.a('number');
                    res.body.data.group3[0].should.have.property('statement').to.be.a('string');
                    done();
                });
        });
    });

});