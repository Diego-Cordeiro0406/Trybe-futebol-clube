import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

import { Response } from 'superagent';
import { teams } from './mocks/team.mock';

const { app } = new App();
chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Deve retornar todos os livros', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    const chaiHttpResponse = await chai.request(app).get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(teams);
  });
 afterEach(sinon.restore)

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
