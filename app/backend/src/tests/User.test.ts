import * as sinon from 'sinon';
import * as chai from 'chai';
// import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import {
  invalidEmailBody,
  invalidPasswordBody,
  myToken,
  roleUser,
  tokenUncoded,
  userRegistered,
  userWithoutPassword,
  users,
  validLoginBody,
} from './mocks/user.mock';

import SequelizeUser from '../database/models/SequelizeUser';

import JWT from '../utils/JWT';

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
    // sinon.stub(bcrypt, 'compareSync').throws(new Error('Senha inválida'));
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
    const { status, body } = await chai.request(app)
      .get('/login/role')

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({message: 'Token not found'});
  });

  it('Deve retornar a role do usuario com sucesso', async function() {
    sinon.stub(JWT, 'verify').returns(tokenUncoded);
      const { status, body } = await chai.request(app)
        .get('/login/role')
        .set('Authorization', `Bearer ${myToken}`)
  
      expect(status).to.equal(200);
      expect(body).to.be.deep.equal(roleUser);
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
