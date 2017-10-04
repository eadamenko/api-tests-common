it('get merchant token', function (done) {

    let url = '/sessions';

    chai.request(app)
        .post(url)
        .send({
            email: emailMerchant,
            password: passMerchant,
            usertype: '2',
        })
        .end(function (err, res) {
            expect(res).to.have.status(201);
            process.env['TOKEN_MERCHANT'] = res.body.data.token;
            done();
        });
});
