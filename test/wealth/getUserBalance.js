describe('Get user balance |', function () {

    require('../../apiHelper/getUserTokenHelper');
    var url = '/user/balance';

    it('should get user balance', function (done) {
        chai.request(app)
            .get(url)
            .set('X-Authorization', 'Bearer ' + process.env.TOKEN_USER)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body.data).to.have.property('balance').to.be.a('number');
                done();
            });
    });
});
