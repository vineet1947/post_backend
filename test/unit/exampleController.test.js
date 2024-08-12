const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const exampleController = require('../../src/controllers/exampleController');
const exampleService = require('../../src/services/exampleService');

chai.use(chaiHttp);
const { expect } = chai;

describe('ExampleController', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET /examples', () => {
    it('should return a list of examples', async () => {
      const examples = [
        { id: '1', name: 'Example 1', description: 'This is an example' },
        { id: '2', name: 'Example 2', description: 'This is another example' },
      ];

      const getExamplesStub = sinon.stub(exampleService, 'getExamples').returns(examples);

      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };

      await exampleController.getExamples(req, res);

      expect(getExamplesStub.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(examples)).to.be.true;
    });
  });

   //Add more tests here for the other methods in exampleController
   describe('GET /examples/:id', () => {
    it('should return an example', async () => {
      const example = { id: '1', name: 'Example 1', description: 'This is an example' };

      const getExampleStub = sinon.stub(exampleService, 'getExamples').returns(example);

      const req = { params: { id: '1' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };

      await exampleController.getExamples(req, res);

      expect(getExampleStub.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(example)).to.be.true;
    });
  
  });
});
