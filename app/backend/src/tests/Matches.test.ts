import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

import SequelizeMatches from '../database/models/SequelizeMatches';
import {
  matches,
  matchesByQuery,
  myToken,
  newMatch,
  newReturnMatch,
  scoreToUpdate,
  tokenUncoded,
} from './mocks/matches.mock';

import JWT from '../utils/JWT';

// import JWT from '../utils/JWT';

const { app } = new App();
chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Test', function() {
  it('Deve retornar todas as partidas', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('Deve retornar todas as partidas que atendam a query informada', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesByQuery as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesByQuery);
  });

  it('Deve ser possivel finalizar uma partida', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves();
    sinon.stub(JWT, 'verify').returns(tokenUncoded);

    const { status, body } = await chai.request(app).patch('/matches/41/finish')
      .set('Authorization', `Bearer ${myToken}`);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({message: 'Finished'});
  });

  it('Não deve ser possivel finalizar uma partida caso a mesma não exista', async function() {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(null);
    sinon.stub(SequelizeMatches, 'update').resolves();
    sinon.stub(JWT, 'verify').returns(tokenUncoded);

    const { status, body } = await chai.request(app).patch('/matches/41/finish')
      .set('Authorization', `Bearer ${myToken}`);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({message: 'Match 41 not found'});
  });

  it('Não deve ser possivel finalizar uma partida caso o token informado seja inválido', async function() {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(null);
    sinon.stub(SequelizeMatches, 'update').resolves();
    sinon.stub(JWT, 'verify').returns(tokenUncoded);

    const { status, body } = await chai.request(app).patch('/matches/41/finish')
      .set('Authorization', `batata ${myToken}`);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({message: 'Match 41 not found'});
  });

  it('Não deve ser possivel finalizar uma partida que já está finalizada', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves();
    sinon.stub(JWT, 'verify').returns(tokenUncoded);

    const { status, body } = await chai.request(app).patch('/matches/1/finish')
      .set('Authorization', `Bearer ${myToken}`);

    expect(status).to.equal(409);
    expect(body).to.deep.equal({message: 'Match already finished'});
  });

  it('Deve ser possivel atualizar o placar de uma partida', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves();
    sinon.stub(JWT, 'verify').returns(tokenUncoded);

    const { status, body } = await chai.request(app).patch('/matches/1')
      .set('Authorization', `Bearer ${myToken}`).send(scoreToUpdate);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({message: 'Score updated'});
  });

  it('Não deve ser possivel atualizar o placar de uma partida se a mesma não existir', async function() {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(null);
    sinon.stub(SequelizeMatches, 'update').resolves();
    sinon.stub(JWT, 'verify').returns(tokenUncoded);

    const { status, body } = await chai.request(app).patch('/matches/1')
      .set('Authorization', `Bearer ${myToken}`).send(scoreToUpdate);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({message: 'Match 1 not found'});
  });

  it('Deve ser possivel criar uma partida', async function() {
    sinon.stub(SequelizeMatches, 'create').resolves(newReturnMatch as any);
    sinon.stub(JWT, 'verify').returns(tokenUncoded);

    const { status, body } = await chai.request(app).post('/matches')
      .set('Authorization', `Bearer ${myToken}`).send(newMatch);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(newReturnMatch);
  });

  it('Não deve ser possivel criar uma partida caso algum time não exista', async function() {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(null);
    sinon.stub(SequelizeMatches, 'create').resolves();
    sinon.stub(JWT, 'verify').returns(tokenUncoded);

    const { status, body } = await chai.request(app).post('/matches')
      .set('Authorization', `Bearer ${myToken}`).send(newMatch);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({message: 'There is no team with such id!'});
  });
  // it('Não deve retornar usuario se não tiver', async function() {
  //   sinon.stub(SequelizeUser, 'findByPk').resolves(null);

  //   const { status, body } = await chai.request(app).get('/users/1');

  //   expect(status).to.equal(404);
  //   expect(body.message).to.equal('User not found');
  // });
  afterEach(sinon.restore);
});