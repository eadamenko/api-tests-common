describe('Get list of kingdom', function () {

    let url = '/kingdoms';

    describe('When new user register he choose country he want to join', function () {
        it('should be displayed the list of available kingdoms', function (done) {
           chai.request(app)
               .get(url)
               .end(function (err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body.data[0]).to.have.property('id').to.be.a('number');
                   expect(res.body.data[0]).to.have.property('name').to.be.a('string');
                   expect(res.body.data[0]).to.have.property('king_name').to.be.a('string');
                   expect(res.body.data[0]).to.have.property('icon').to.be.a('string');
                   expect(res.body.data[0]).to.have.property('population').to.be.a('number');
                   expect(res.body.data[0]).to.have.property('total_consumption').to.be.a('number');
                   done();
               });
        });
    });

});