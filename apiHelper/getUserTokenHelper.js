it('get user token', function (done) {

    var url = '/login';

    chai.request(app)
        .post(url)
        .send({
            email: emailUser,
            password: passUser
        })
        .end(function (err, res) {
            expect(res).to.have.status(201);
            process.env['TOKEN_USER'] = res.body.data.token;
            done();
        });
});
