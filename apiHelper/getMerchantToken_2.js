it('get merchant token 2', function (done) {

    let url = '/sessions';

    chai.request(app)
        .post(url)
        .send({
            email: emailMerchant2,
            password: passMerchant2,
            usertype: '2',
        })
        .end(function (err, res) {
            expect(res).to.have.status(201);
            process.env['TOKEN_MERCHANT_2'] = res.body.data.token;
            done();
        });
});
