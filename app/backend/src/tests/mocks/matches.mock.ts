const matches = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
]

const matchesByQuery = [
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
]

const scoreToUpdate = {
  "homeTeamGoals": 6,
  "awayTeamGoals": 2,
}

const newMatch = {
  "homeTeamId": 2,
  "awayTeamId": 1,
  "homeTeamGoals": 3,
  "awayTeamGoals": 2
}

const newReturnMatch = {
  "id": 49,
  "homeTeamId": 2,
  "awayTeamId": 1,
  "homeTeamGoals": 3,
  "awayTeamGoals": 2,
  "inProgress": true
}

const myToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NjYxNjk1NywiZXhwIjoxNjk3NDgwOTU3fQ.5HwfxLiEYAX7VOdMTYFW11Vl7_zb0hVcyF1zjU39pPE"
const tokenUncoded = {
  email: 'admin@admin.com',
  role: 'admin',
  iat: 1696268343,
  exp: 1697132343
}
export {
  matches,
  matchesByQuery,
  myToken,
  tokenUncoded,
  scoreToUpdate,
  newMatch,
  newReturnMatch,
}