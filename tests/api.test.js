'use strict';
const db = require('../config/db');

const request = require('supertest');
const assert = require('chai').assert;

const app =  require('../app');

describe('API tests', () => {
    

    describe('GET /health', () => {
        it('Endpoint should be available', (done) => {
            request(app)
                .get('/health')
                .set('Content-Type', 'application/json')
                .expect(200, done);
        });
    });

    describe('GET /business/getResturantByOpenTiming', () => {
        it('should return error', (done) => {
          request(app)
              .get('/business/getResturantByOpenTiming')
              .query('{"businessTiming":""}')
              .set('Content-Type', 'application/json')
              .expect(500)
              .expect((res) => {
                assert.equal(JSON.stringify(res.body), '{"message":"Something went really wrong"}');
              })
              .end(done);
        });
  
        it('should return', (done) => {
            request(app)
                .get('/resturants/getResturantByOpenTiming?businessTiming=Mon, 12:15 PM-15:00 PM')
                //.send({businessTiming:"Mon, 12:15 PM-15:00 PM"})
                .set('Content-Type', 'application/json')
                .expect(200)
                .expect((res) => {
                    assert.equal(JSON.stringify(res.body), '{"total_records":0,"resturant":[]}');
                })
                .end(done);
          });
    });

    describe('GET /customer/getCustomerPurchaseHistory/{customername}', () => {
    it('should return success', (done) => {
        request(app)
            .get('/customer/getCustomerPurchaseHistory/testname')
            //.send('testname')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect((res) => {
            assert.equal(JSON.stringify(res.body), '{"total_records":0,"resturant":[]}');
            })
            .end(done);
    });

    it('should return error', (done) => {
        request(app)
            .get('/customer/getCustomerPurchaseHistory')
            .set('Content-Type', 'application/json')
            .expect(404)
            .expect((res) => {
                assert.equal(JSON.stringify(res.body), '{}');
            })
            .end(done);
        });

    });

    describe('GET /customer/order/{customerId}', () => {
    it('should return success', (done) => {
        request(app)
            .post('/customer/order/1')
            .send({
            "resturant_name": "Ulu Ocean Grill and Sushi Lounge",
            "dishes" : [
                "Postum cereal coffee",
                "DRY LIGHT IMPORTED WINE"
            ]
            })
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect((res) => {
            assert.equal(JSON.stringify(res.body), '{"newRecord":"order created successfully"}');
            })
            .end(done);
    });

    it('should return error', (done) => {
        request(app)
            .post('/customer/order/')
            .set('Content-Type', 'application/json')
            .expect(404)
            .expect((res) => {
                assert.equal(JSON.stringify(res.body), '{}');
            })
            .end(done);
        });

    });

    it('should return no body validation', (done) => {
        request(app)
            .post('/customer/order/1')
            .send({})
            .set('Content-Type', 'application/json')
            .expect(500)
            .expect((res) => {
            assert.equal(JSON.stringify(res.body), '{"message":"Something went really wrong"}');
            })
            .end(done);
    });

    it('should return no body validation', (done) => {
        request(app)
            .post('/customer/order/0')
            .send({
                "resturant_name": "Ulu Ocean Grill and Sushi Lounge",
                "dishes" : [
                    "Postum cereal coffee",
                    "DRY LIGHT IMPORTED WINE"
                ]
                })
            .set('Content-Type', 'application/json')
            .expect(400)
            .expect((res) => {
            assert.equal(JSON.stringify(res.body), '{"error_message":["Customer doesnot exists"]}');
            })
            .end(done);
    });

    describe('GET /resturants/{resturantOrDishName}', () => {
        it('Done not exists', (done) => {
          request(app)
              .get('/resturants')
              .set('Content-Type', 'application/json')
              .expect(404)
              .expect((res) => {
                assert.equal(JSON.stringify(res.body), '{}');
              })
              .end(done);
        });

        it('should return', (done) => {
        request(app)
            .get('/resturants/paneer')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect((res) => {
                assert.equal(JSON.stringify(res.body), '{"total_records":1,"resturant":[{"name":"Todds Unique Dining","dish_name":"PALAK PANEER Cottage cheese cooked with fresh spinach","price":17.5}]}');
            })
            .end(done);
        });
    });

    describe('GET /resturants/getResturantsMoreOrLessNumberOfDishes', () => {
        it('Done not exists', (done) => {
          request(app)
              .get('/resturants/getResturantsMoreOrLessNumberOfDishes')
              .query({
                'not-avail': 1
              })
              .set('Content-Type', 'application/json')
              .expect(400)
              .expect((res) => {
                assert.equal(JSON.stringify(res.body), '{"error_message":["param minprice should should not be empty","lessthan or morethan param not provided"]}');
              })
              .end(done);
        });

        it('first validation check', (done) => {
            request(app)
                .get('/resturants/getResturantsMoreOrLessNumberOfDishes')
                .query({
                    'lessthan': 4,
                    'morethan': 14,
                })
                .set('Content-Type', 'application/json')
                .expect(400)
                .expect((res) => {
                    assert.equal(JSON.stringify(res.body), '{"error_message":["param minprice should should not be empty","Api need morethan or lessthan input param"]}');
                })
                .end(done);
        });


        it('second validation check', (done) => {
            request(app)
                .get('/resturants/getResturantsMoreOrLessNumberOfDishes')
                .query({
                    'morethan': 14,
                    'minprice': 10
                })
                .set('Content-Type', 'application/json')
                .expect(400)
                .expect((res) => {
                    assert.equal(JSON.stringify(res.body), '{"error_message":["param minprice should should not be empty"]}');
                })
                .end(done);
        });
        
        it('success', (done) => {
        request(app)
            .get('/resturants/getResturantsMoreOrLessNumberOfDishes')
            .query({
                'morethan': 14,
                'minprice': 10,
                'maxprice': 15
            })
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect((res) => {
                assert.equal(JSON.stringify(res.body), '{"total_records":0,"resturant":[]}');
            })
            .end(done);
        });

        it('success', (done) => {
        request(app)
            .get('/resturants/getResturantsMoreOrLessNumberOfDishes')
            .query({
                'lessthan': 4,
                'minprice': 10,
                'maxprice': 15
            })
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(done);
        });
    });
  

});
