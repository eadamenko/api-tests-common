require('../apiHelper/getMerhantToken');

it('create new product and get id', function (done) {

    let url = '/merchant/me/product';

    chai.request(app)
        .post(url)
        .set('X-Authorization', 'Bearer ' + process.env.TOKEN_MERCHANT)
        .send({
            name: 'producttest',
            description: 'mpollich',
            price: 1000,
            glp: 1,
            category: 109,
            available_quantity: 12,
            unlimited_quantity: 1,
            for_adult: 1,
            positions: [2]
        })
        .end(function (err, res) {
            expect(res).to.have.status(201);
            process.env['NEW_PRODUCT_ID'] = res.body.data.id;
            done();
        });
});