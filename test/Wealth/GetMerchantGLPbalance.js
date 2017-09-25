describe('Get merchant GLP balance', function () {
    describe('When user logged in he can see his GLP balance on dashboard', function () {
        it('should be an error if there is no token', function (done) {
            chai.request(app)
                .get('/merchants/balance/glp')
                    //no token sended
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });
        });


        it('should get merchant balance', function (done) {
            chai.request(app)
                .get('/merchants/balance/glp')
                .send({
                    merchantToken
                })
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.data.should.have.property('balance').to.be.a('number');
                    done();
                });
        });
    });

});