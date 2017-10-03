describe('Get merchant GLP balance |', function () {

    require('../../ApiHelper/getMerhantToken');
    let url = '/merchant/balance/glp';

    describe('When user logged in he can see his GLP balance on dashboard |', function () {
        it('should be an error if there is no token', function (done) {
            chai.request(app)
                .get(url)
                    //no token sended
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Invalid credentials');
                    done();
                });
        });

        it('should be an error if token is invalid', function (done) {
            chai.request(app)
                .get(url)
                .set('X-Authorization', 'Bearer ' + 'asdfasdfawf2323424wefsdfsf') //invalid token
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Invalid JWT Token');
                    done();
                });
        });

        it('should get merchant balance', function (done) {
            chai.request(app)
                .get(url)
                .set('X-Authorization', 'Bearer ' + process.env.TOKEN_MERCHANT)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.data).to.have.property('balance').to.be.a('number');
                    done();
                });
        });
    });

});