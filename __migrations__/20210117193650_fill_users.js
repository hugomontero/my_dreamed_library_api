const users = [
  {
    "user_type": 0,
    "username": "librarian",
    "firstname": "Henry",
    "lastname": "Wild",
    "email": "henry.wild@mydreamedlibrary.com",
    "registerd_at": new Date("2021-01-01T13:23:00Z")
  },
  {
    "user_type": 1,
    "username": "user 1",
    "firstname": "Arthur",
    "lastname": "Kings",
    "email": "arthur.kings@user.com",
    "registerd_at": new Date("2021-01-06T13:23:00Z")
  },
  {
    "user_type": 1,
    "username": "user 2",
    "firstname": "Emma",
    "lastname": "Woodhouse",
    "email": "emma.woodhouse@user.com",
    "registerd_at": new Date("2021-01-06T13:23:00Z")
  },
  {
    "user_type": 1,
    "username": "user 3",
    "firstname": "Erlynne",
    "lastname": "Windermere",
    "email": "erlynne.windwermer@user.com",
    "registerd_at": new Date("2021-01-06T13:23:00Z")
  }
]

exports.up = function(knex) {
 return knex.batchInsert('users', users, 50) 
};

exports.down = function(knex) {
 return knex('users').delete() 
};
