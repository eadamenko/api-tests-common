it('get customer token', function (done) {

    let url = '/sessions';

    chai.request(app)
        .post(url)
        .send({
            email: emailCustomer,
            password: passCustomer,
            usertype: '1',
        })
        .end(function (err, res) {
            expect(res).to.have.status(201);
            expect(res.body.data).to.have.property('token').not.equal(null);
            expect(res.body.data).to.have.property('token').to.be.a('string');
            process.env['TOKEN_CUSTOMER'] = res.body.data.token;
            done();
        });
});
