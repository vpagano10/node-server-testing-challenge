
exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert([
        {id: 1, name: 'abc', password: '123'},
        {id: 2, name: 'xyz', password: '987'},
        {id: 3, name: 'hello', password: '456'}
      ]);
    });
};
