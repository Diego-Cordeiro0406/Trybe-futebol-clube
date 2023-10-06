import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import LeaderboardService from '../services/leaderboardService';
import { leaderboardResult } from './mocks/leaderboard.mock';

const { app } = new App();
chai.use(chaiHttp);

const { expect } = chai;
const leaderboardService = new LeaderboardService();
describe('Leaderboard Test', function() {
    let findAllStub: sinon.SinonStub;

    beforeEach(function () {
      // Crie um stub para o método findAll de LeaderboardService
      findAllStub = sinon.stub(leaderboardService, 'findAll');
      findAllStub.resolves(leaderboardResult as any);
    });
  
    afterEach(function () {
      // Restaure o stub após cada teste
      findAllStub.restore();
    });

  it('Deve retornar as tabelas com o desempenho dos times', async function() {
    // sinon.stub(leaderboardService, 'findAll').resolves(leaderboardResult as any);
    const { status, body } = await chai.request(app).get('/leaderboard/home')

    expect(status).to.equal(200);
    console.log(body)
    expect(body).to.be.deep.equal(leaderboardResult);
  });
//   afterEach(sinon.restore);
});