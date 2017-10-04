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
            process.env['TOKEN_CUSTOMER'] = res.body.data.token;
            done();
        });
});
