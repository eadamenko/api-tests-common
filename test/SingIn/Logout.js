describe('Logout', function () {
    it('should logout', function (done) {
       chai.request(app)
           .del('/logout')
           .send({})
           .end(function (err, res) {
               res.should.have.status(204);
               done();
           });
    });

});