const user = {
  id: 1,
  username: 'Jon Doe',
  role: 'admin',
  email: 'jondoe@email.com',
  password: 'JonDoe',
};

const userWithoutPassword = {
  id: 1,
  username: 'Jon Doe',
  role: 'admin',
  email: 'jondoe@email.com',
};

const wrongPassUser = {
  id: 1,
  username: 'Jon Doe',
  role: 'admin',
  email: 'jondoe@email.com',
  password: 'xxxxxxxxxx',
};

const users = [
  userWithoutPassword,
  {
    id: 2,
    name: 'Jane Doe',
    email: 'janedoe@email.com',
  },
];

const validLoginBody = { email: 'admin@admin.com', password: 'secret_admin' };
const invalidPasswordBody = { email: 'jondoe@email.com', password: 'Jon' };
const invalidEmailBody = { email: 'invalid_email', password: 'JonDoe' };
const userRegistered = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };

export {
  user,
  userWithoutPassword,
  users,
  invalidEmailBody,
  invalidPasswordBody,
  validLoginBody,
  wrongPassUser,
  userRegistered,
};