describe('Logout', function () {
    it('should logout', function (done) {
       chai.request(app)
           .del('/logout')
           .send({})
           .end(function (err, res) {
               expect(res).to.have.status(204);
               done();
           });
    });

});