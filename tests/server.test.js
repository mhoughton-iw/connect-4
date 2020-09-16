// const fs = require('fs');
// const mock = require('mock-fs');
// const request = require('supertest');
// const app = require('../server/server');
// require('iconv-lite').encodingExists('foo');

const { TestScheduler } = require("jest");

// const users = [
//   { userId: '5b16d178-b6b3-4345-91c5-8c927dd0b063', name: 'Emily', age: 26, avatar: '135-0-4.jpg' },
//   { userId: '27407af6-d961-4041-a5b0-899976bead03', name: 'Mike', age: 28, avatar: '273-0-4.jpg' },
//   { userId: '147d5076-b31f-4be0-b1b6-04aec7844670', name: 'Edward', age: 29, avatar: '95-1-4.jpg' },
//   { userId: '147d5076-b31f-4be0-b1b6-04aec7844671', name: 'Clem', age: 100 }
// ];

// beforeEach(() => {
//   mock({
//     data: {
//       'users.json': JSON.stringify(users),
//       '135-0-4.jpg': Buffer.from([1, 3, 5, 0, 4, 100]),
//       '273-0-4.jpg': Buffer.from([2, 7, 3, 0, 4, 101]),
//     },
//   });
// });

// afterEach(() => {
//   mock.restore();
// });

// describe.skip('GET /users', () => {
//   it('should return the users', (done) => {
//     request(app)
//       .get('/users')
//       .expect('Content-Type', /json/)
//       .expect(200, JSON.stringify(users))
//       .end(done);
//   });
// });

test.todo('Server based testing');
