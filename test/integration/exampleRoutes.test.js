const chai = require('chai');
const sinon = require('sinon');
const ExampleModel = require('../../src/models/exampleModel');
const exampleService = require('../../src/services/exampleService');

const { expect } = chai;

describe('ExampleService', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getExamples', () => {
    it('should return a list of examples', async () => {
      const examples = [
        { id: '1', name: 'Example 1', description: 'This is an example' },
        { id: '2', name: 'Example 2', description: 'This is another example' },
      ];

      const findStub = sinon.stub(ExampleModel, 'find').returns(examples);

      const result = await exampleService.getExamples();

      expect(findStub.calledOnce).to.be.true;
      expect(result).to.deep.equal(examples);
    });
  });

  // Add more test cases for other methods in exampleService (getExampleById, createExample, updateExample, deleteExample)
});
