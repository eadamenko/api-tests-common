describe('Register in System as Merchant |', function () {

    let url = '/merchant';

    describe('When new merchant submit registration |', function () {
        it('should be an error if invalid request payload', function (done) {
            chai.request(app)
                .post(url)
                .send({
                    // invalid request payload
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.have.property('message', 'Invalid data in request body');
                    expect(res.body).to.have.property('errors');
                    done();
                });
        });

        it('should be an error if account with such email already exist', function (done) {
            chai.request(app)
                .post(url)
                .send({
                email: "merchant1@example.com", //email already exist
                password: "password",
                name: "Sergey",
                nickname: "fesor",
                birthday: "1992-05-19",
                kingdom: 22,
                introducer_email: "testuser1@example.com",
                website: "http://qwe.com",
                glp_bonus: 1,
                position_default: {
                location: {
                    latitude: 53.9045,
                        longitude: 27.5615
                },
                address: {
                    street_number: "54",
                        street: "suharevskaia",
                        district: "Minsk",
                        city: "Minsk",
                        province: "Minsk",
                        country: "Belarus",
                        text: "Minsk, Belarus, suharevskaia 54"
                }
            },
                positions: [
                {
                    location: {
                        latitude: 30.55517259999999,
                        longitude: 150.4325114
                    },
                    address: {
                        street: "Lavrska Street",
                        street_number: "16",
                        city: "Pechers'kyi district",
                        district: "Kyiv City",
                        province: "Kyiv city",
                        text: "Lavrska St, 16, Kyiv, Ukraine, 02000",
                        country: "Ukraine"
                    }
                },
                {
                    location: {
                        "latitude": 30.55517259999999,
                        "longitude": 150.4325114
                    },
                    address: {
                        street: "Lavrska Street",
                        street_number: "16",
                        city: "Pechers'kyi district",
                        district: "Kyiv City",
                        province: "Kyiv city",
                        text: "Lavrska St, 16, Kyiv, Ukraine, 020001",
                        country: "Ukraine"
                    }
                }

            ],
                questions: [
                {id: 1, "answer": "test"},
                {id: 3, "answer": "test"},
                {id: 4, "answer": "test"}
            ]
                })
                .end(function (err, res) {
                    expect(res).to.have.status(409);
                    expect(res.body).to.have.property('message', 'An account with this email address already exists');
                    done();
                });
        });

        it('should be an error if account with such email already exist', function (done) {
            chai.request(app)
                .post(url)
                .send({
                    email: faker.internet.email(), //unique email
                    password: "password",
                    name: "Sergey",
                    nickname: "fesor",
                    birthday: "1992-05-19",
                    kingdom: 22,
                    introducer_email: "testuser1@example.com",
                    website: "http://qwe.com",
                    glp_bonus: 1,
                    position_default: {
                        location: {
                            latitude: 53.9045,
                            longitude: 27.5615
                        },
                        address: {
                            street_number: "54",
                            street: "suharevskaia",
                            district: "Minsk",
                            city: "Minsk",
                            province: "Minsk",
                            country: "Belarus",
                            text: "Minsk, Belarus, suharevskaia 54"
                        }
                    },
                    positions: [
                        {
                            location: {
                                latitude: 30.55517259999999,
                                longitude: 150.4325114
                            },
                            address: {
                                street: "Lavrska Street",
                                street_number: "16",
                                city: "Pechers'kyi district",
                                district: "Kyiv City",
                                province: "Kyiv city",
                                text: "Lavrska St, 16, Kyiv, Ukraine, 02000",
                                country: "Ukraine"
                            }
                        },
                        {
                            location: {
                                "latitude": 30.55517259999999,
                                "longitude": 150.4325114
                            },
                            address: {
                                street: "Lavrska Street",
                                street_number: "16",
                                city: "Pechers'kyi district",
                                district: "Kyiv City",
                                province: "Kyiv city",
                                text: "Lavrska St, 16, Kyiv, Ukraine, 020001",
                                country: "Ukraine"
                            }
                        }

                    ],
                    questions: [
                        {id: 1, "answer": "test"},
                        {id: 3, "answer": "test"},
                        {id: 4, "answer": "test"}
                    ]
                })
                .end(function (err, res) {
                    expect(res).to.have.status(201);
                    done();
                });
        });


    });

});