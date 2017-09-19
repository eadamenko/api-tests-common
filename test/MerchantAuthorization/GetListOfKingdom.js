describe('Get list of kingdom', function () {
    describe('When new user register he choose country he want to join', function () {
        it('should be displayed the list of available kingdoms', function (done) {
           chai.request(app)
               .get('/kingdoms')
               .end(function (err, res) {
                   res.should.have.status(200);
                   res.body.data[0].should.have.property('id').to.be.a('number');
                   res.body.data[0].should.have.property('name').to.be.a('string');
                   res.body.data[0].should.have.property('king_name').to.be.a('string');
                   res.body.data[0].should.have.property('icon').to.be.a('string');
                   res.body.data[0].should.have.property('population').to.be.a('number');
                   res.body.data[0].should.have.property('total_consumption').to.be.a('number');
                   done();
               });
        });
    });

});