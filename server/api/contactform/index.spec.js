'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var contactformCtrlStub = {
  index: 'contactformCtrl.index',
  show: 'contactformCtrl.show',
  create: 'contactformCtrl.create',
  update: 'contactformCtrl.update',
  destroy: 'contactformCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var contactformIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './contactform.controller': contactformCtrlStub
});

describe('Contactform API Router:', function() {

  it('should return an express router instance', function() {
    contactformIndex.should.equal(routerStub);
  });

  describe('GET /api/contactform', function() {

    it('should route to contactform.controller.index', function() {
      routerStub.get
        .withArgs('/', 'contactformCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/contactform/:id', function() {

    it('should route to contactform.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'contactformCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/contactform', function() {

    it('should route to contactform.controller.create', function() {
      routerStub.post
        .withArgs('/', 'contactformCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/contactform/:id', function() {

    it('should route to contactform.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'contactformCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/contactform/:id', function() {

    it('should route to contactform.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'contactformCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/contactform/:id', function() {

    it('should route to contactform.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'contactformCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
