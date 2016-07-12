'use strict';

var app = require('../..');
import request from 'supertest';

var newContactform;

describe('Contactform API:', function() {

  describe('GET /api/contactform', function() {
    var contactforms;

    beforeEach(function(done) {
      request(app)
        .get('/api/contactform')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contactforms = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      contactforms.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/contactform', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/contactform')
        .send({
          name: 'New Contactform',
          info: 'This is the brand new contactform!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newContactform = res.body;
          done();
        });
    });

    it('should respond with the newly created contactform', function() {
      newContactform.name.should.equal('New Contactform');
      newContactform.info.should.equal('This is the brand new contactform!!!');
    });

  });

  describe('GET /api/contactform/:id', function() {
    var contactform;

    beforeEach(function(done) {
      request(app)
        .get('/api/contactform/' + newContactform._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contactform = res.body;
          done();
        });
    });

    afterEach(function() {
      contactform = {};
    });

    it('should respond with the requested contactform', function() {
      contactform.name.should.equal('New Contactform');
      contactform.info.should.equal('This is the brand new contactform!!!');
    });

  });

  describe('PUT /api/contactform/:id', function() {
    var updatedContactform;

    beforeEach(function(done) {
      request(app)
        .put('/api/contactform/' + newContactform._id)
        .send({
          name: 'Updated Contactform',
          info: 'This is the updated contactform!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedContactform = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedContactform = {};
    });

    it('should respond with the updated contactform', function() {
      updatedContactform.name.should.equal('Updated Contactform');
      updatedContactform.info.should.equal('This is the updated contactform!!!');
    });

  });

  describe('DELETE /api/contactform/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/contactform/' + newContactform._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when contactform does not exist', function(done) {
      request(app)
        .delete('/api/contactform/' + newContactform._id)
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
