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

const roleUser = {
  role: 'admin'
} 

const users = [
  userWithoutPassword,
  {
    id: 2,
    username: 'Jane Doe',
    role: 'admin',
    email: 'janedoe@email.com',
  },
];

const validLoginBody = { email: 'admin@admin.com', password: 'secret_admin' };
const invalidPasswordBody = { email: 'jondoe@email.com', password: 'Jon' };
const invalidEmailBody = { email: 'invalid_email', password: 'JonDoe' };
const userRegistered = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };

const myToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NjYxNjk1NywiZXhwIjoxNjk3NDgwOTU3fQ.5HwfxLiEYAX7VOdMTYFW11Vl7_zb0hVcyF1zjU39pPE"

const tokenUncoded = {
  email: 'admin@admin.com',
  role: 'admin',
  iat: 1696268343,
  exp: 1697132343
}

export {
  user,
  userWithoutPassword,
  users,
  invalidEmailBody,
  invalidPasswordBody,
  validLoginBody,
  wrongPassUser,
  userRegistered,
  roleUser,
  myToken,
  tokenUncoded,
};