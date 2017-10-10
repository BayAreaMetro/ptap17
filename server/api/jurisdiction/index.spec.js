'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var jurisdictionCtrlStub = {
  index: 'jurisdictionCtrl.index',
  show: 'jurisdictionCtrl.show',
  create: 'jurisdictionCtrl.create',
  update: 'jurisdictionCtrl.update',
  destroy: 'jurisdictionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var jurisdictionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './jurisdiction.controller': jurisdictionCtrlStub
});

describe('Jurisdiction API Router:', function() {

  it('should return an express router instance', function() {
    jurisdictionIndex.should.equal(routerStub);
  });

  describe('GET /api/jurisdictions', function() {

    it('should route to jurisdiction.controller.index', function() {
      routerStub.get
        .withArgs('/', 'jurisdictionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/jurisdictions/:id', function() {

    it('should route to jurisdiction.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'jurisdictionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/jurisdictions', function() {

    it('should route to jurisdiction.controller.create', function() {
      routerStub.post
        .withArgs('/', 'jurisdictionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/jurisdictions/:id', function() {

    it('should route to jurisdiction.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'jurisdictionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/jurisdictions/:id', function() {

    it('should route to jurisdiction.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'jurisdictionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/jurisdictions/:id', function() {

    it('should route to jurisdiction.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'jurisdictionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
