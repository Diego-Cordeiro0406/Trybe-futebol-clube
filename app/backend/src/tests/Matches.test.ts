import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

import SequelizeMatches from '../database/models/SequelizeMatches';
import { matches } from './mocks/matches.mock';

// import JWT from '../utils/JWT';

const { app } = new App();
chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Test', function() {
  it('Deve retornar todos as partidas', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  // it('Deve retornar um usuario pelo id', async function() {
  //   sinon.stub(SequelizeUser, 'findByPk').resolves(userWithoutPassword as any);

  //   const { status, body } = await chai.request(app).get('/users/1');

  //   expect(status).to.equal(200);
  //   expect(body).to.deep.equal(userWithoutPassword);
  // });

  // it('Não deve retornar usuario se não tiver', async function() {
  //   sinon.stub(SequelizeUser, 'findByPk').resolves(null);

  //   const { status, body } = await chai.request(app).get('/users/1');

  //   expect(status).to.equal(404);
  //   expect(body.message).to.equal('User not found');
  // });
  afterEach(sinon.restore);
});