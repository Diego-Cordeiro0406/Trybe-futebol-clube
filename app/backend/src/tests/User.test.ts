import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import { invalidEmailBody, invalidPasswordBody, userRegistered, validLoginBody } from './mocks/user.mock';
import SequelizeUser from '../database/models/SequelizeUser';
import Validations from '../middlewares/Validations';
import JWT from '../utils/JWT';
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

  it('Não deve fazer login com email inválido', async function() {
    const { status, body } = await chai.request(app).post('/login')
      .send(invalidEmailBody);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Não deve fazer login com senha inválida', async function() {
    const { status, body } = await chai.request(app).post('/login')
      .send(invalidPasswordBody);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Não deve fazer login quando o usuario não existir', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app)
      .post('/login')
      .send(validLoginBody);
    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('should return a token when login is done', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(userRegistered as any);
    sinon.stub(JWT, 'sign').returns('validToken');
    // sinon.stub(Validations, 'validateUser').returns();

    const { status, body } = await chai.request(app)
      .post('/login')
      .send(validLoginBody);

    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });
  afterEach(sinon.restore);
});