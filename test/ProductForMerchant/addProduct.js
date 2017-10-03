describe('Add Product |', function () {

    require('../../ApiHelper/getMerhantToken');
    require('../../ApiHelper/getCustomerToken');
    let url = '/merchant/me/product';

    describe('When merchant add product |', function () {
        it('should be an error if invalid request payload', function (done) {
            chai.request(app)
                .post(url)
                .set('X-Authorization', 'Bearer ' + process.env.TOKEN_MERCHANT)
                .send({
                    // invalid request payload
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.have.property('message', 'Invalid data in request body');
                    done();
                });
        });

        it('should be an error if token is invalid', function (done) {
            chai.request(app)
                .post(url)
                .set('X-Authorization', 'Bearer ' + process.env.TOKEN_CUSTOMER) //invalid role token
                .send({
                    name: 'producttest',
                    description: 'mpollich',
                    price: 1000,
                    glp: 1,
                    category: 109,
                    available_quantity: 12,
                    unlimited_quantity: 1,
                    for_adult: 1,
                    positions: [
                        2
                    ]
                    // .attach(
                    //     'images',
                    // )
                })
                .end(function (err, res) {
                    expect(res).to.have.status(403);
                    expect(res.body).to.have.property('message', 'Expression \"has_role(\'ROLE_MERCHANT\')\" denied access.');
                    done();
                });
        });

        it('should add a product', function (done) {
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
                    positions: [
                        2
                    ]
                    // .attach(
                    //     'images',
                    // )
                })
                .end(function (err, res) {
                    expect(res).to.have.status(201);
                    expect(res.body.data).to.have.property('id').to.be.a('number');
                    expect(res.body.data).to.have.property('name').to.be.a('string');
                    expect(res.body.data.category[0]).to.have.property('id').to.be.a('number');
                    expect(res.body.data.category[0]).to.have.property('name').to.be.a('string');
                    expect(res.body.data).to.have.property('description').to.be.a('string');
                    expect(res.body.data).to.have.property('images');
                    expect(res.body.data).to.have.property('added_at').to.be.a('string');
                    expect(res.body.data).to.have.property('published_at');
                    expect(res.body.data).to.have.property('for_adult');
                    expect(res.body.data).to.have.property('available_quantity').to.be.a('number');
                    expect(res.body.data).to.have.property('unlimited_quantity');
                    expect(res.body.data).to.have.property('rating').to.be.a('number');
                    expect(res.body.data).to.have.property('sold').to.be.a('number');
                    expect(res.body.data).to.have.property('published');
                    done();
                });
        });
    });

});