it('get admin token', function (done) {

    let url = '/sessions';

    chai.request(app)
        .post(url)
        .send({
            email: emailAdmin,
            password: passAdmin,
            usertype: '3',
        })
        .end(function (err, res) {
            expect(res).to.have.status(201);
            expect(res.body.data).to.have.property('token').not.equal(null);
            expect(res.body.data).to.have.property('token').to.be.a('string');
            process.env['TOKEN_ADMIN'] = res.body.data.token;
            done();
        });
});
