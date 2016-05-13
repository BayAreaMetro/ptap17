'use strict';

var app = require('../..');
import request from 'supertest';

var newJurisdiction;

describe('Jurisdiction API:', function() {

  describe('GET /api/jurisdictions', function() {
    var jurisdictions;

    beforeEach(function(done) {
      request(app)
        .get('/api/jurisdictions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          jurisdictions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      jurisdictions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/jurisdictions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/jurisdictions')
        .send({
          name: 'New Jurisdiction',
          info: 'This is the brand new jurisdiction!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newJurisdiction = res.body;
          done();
        });
    });

    it('should respond with the newly created jurisdiction', function() {
      newJurisdiction.name.should.equal('New Jurisdiction');
      newJurisdiction.info.should.equal('This is the brand new jurisdiction!!!');
    });

  });

  describe('GET /api/jurisdictions/:id', function() {
    var jurisdiction;

    beforeEach(function(done) {
      request(app)
        .get('/api/jurisdictions/' + newJurisdiction._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          jurisdiction = res.body;
          done();
        });
    });

    afterEach(function() {
      jurisdiction = {};
    });

    it('should respond with the requested jurisdiction', function() {
      jurisdiction.name.should.equal('New Jurisdiction');
      jurisdiction.info.should.equal('This is the brand new jurisdiction!!!');
    });

  });

  describe('PUT /api/jurisdictions/:id', function() {
    var updatedJurisdiction;

    beforeEach(function(done) {
      request(app)
        .put('/api/jurisdictions/' + newJurisdiction._id)
        .send({
          name: 'Updated Jurisdiction',
          info: 'This is the updated jurisdiction!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedJurisdiction = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedJurisdiction = {};
    });

    it('should respond with the updated jurisdiction', function() {
      updatedJurisdiction.name.should.equal('Updated Jurisdiction');
      updatedJurisdiction.info.should.equal('This is the updated jurisdiction!!!');
    });

  });

  describe('DELETE /api/jurisdictions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/jurisdictions/' + newJurisdiction._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when jurisdiction does not exist', function(done) {
      request(app)
        .delete('/api/jurisdictions/' + newJurisdiction._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
