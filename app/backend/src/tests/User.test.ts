import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import {
  invalidEmailBody,
  invalidPasswordBody,
  roleUser,
  userRegistered,
  userWithoutPassword,
  users,
  validLoginBody,
} from './mocks/user.mock';
import SequelizeUser from '../database/models/SequelizeUser';

import JWT from '../utils/JWT';
// import ValToken from '../middlewares/auth';

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

  it('Deve retornar um token quando o login for bem-sucedido', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(userRegistered as any);
    sinon.stub(JWT, 'sign').returns('validToken');

    const { status, body } = await chai.request(app)
      .post('/login')
      .send(validLoginBody);

    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });
    
  it('Não deve retornar a role do usuario se receber não um token válido', async function() {
  // sinon.stub(SequelizeUser, 'findOne').resolves(userRegistered as any);
  // sinon.stub(JWT, 'sign').returns('validToken');
  // sinon.stub(JWT, 'verify').resolves();
  // sinon.stub(ValToken, 'validateToken').resolves();
    const { status, body } = await chai.request(app)
      .get('/login/role')

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({message: 'Token not found'});
  });

  it('Não deve retornar a role do usuario se receber não um token', async function() {
      const { status, body } = await chai.request(app)
        .get('/login/role').set('Authorization', 'Bearer validToken')
  
      expect(status).to.equal(401);
      expect(body).to.be.deep.equal({message: 'Token must be a valid token'});
    });
  afterEach(sinon.restore);
});

describe('Users Test', function() {
  it('Deve retornar todos os usuarios', async function() {
    sinon.stub(SequelizeUser, 'findAll').resolves(users as any);

    const { status, body } = await chai.request(app).get('/users');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(users);
  });

  it('Deve retornar um usuario pelo id', async function() {
    sinon.stub(SequelizeUser, 'findByPk').resolves(userWithoutPassword as any);

    const { status, body } = await chai.request(app).get('/users/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(userWithoutPassword);
  });

  it('Não deve retornar usuario se não tiver', async function() {
    sinon.stub(SequelizeUser, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/users/1');

    expect(status).to.equal(404);
    expect(body.message).to.equal('User not found');
  });
  afterEach(sinon.restore);
});
