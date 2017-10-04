describe('Logout |', function () {

    let url = '/logout';

    it('should logout', function (done) {
       chai.request(app)
           .del(url)
           .end(function (err, res) {
               expect(res).to.have.status(204);
               done();
           });
    });

});