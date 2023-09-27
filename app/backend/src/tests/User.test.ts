import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
// import SequelizeUser from '../database/models/SequelizeUser';

// import { Response } from 'superagent';
// import { team, teams } from './mocks/team.mock';

const { app } = new App();
chai.use(chaiHttp);

const { expect } = chai;

describe('Login Test', function() {
  it('Não deve fazer login com dados inválidos', async function() {
    const { status, body } = await chai.request(app).post('/login')
      .send({});

    expect(status).to.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
  });
  afterEach(sinon.restore);
});