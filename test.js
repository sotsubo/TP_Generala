const salas = [
  { id: 1, sala: 'river', users: [], cantMaxUsers: 4 },
  {
    id: 'kiwcc8VH2N0DmZgRAAAH',
    sala: 'sala1',
    users: [  { id: 'NdYKf3q9bfsWhN0yAAAE', username: 'ser', lobby: 'lobby' } ],
    cantMaxUsers: 2
  }
]

const users=   [
  { id: 'e7WzPfGikXbddzVlAAAA', username: 'sotsubo', lobby: 'lobby' },
  { id: '7yxrysqwN1hd7teqAAAB', username: 'sotsubo', lobby: 'lobby' }
]
newUser= { id: 'NdYKf3q9bfsWhN0E', username: 'sergio', lobby: 'lobby' }

console.log (salas)
console.log (newUser);
let found = salas.find(e => {
    if (e.id === 'kiwcc8VH2N0DmZgRAAAH')
        e.users.push(newUser)}
        );
console.log("encontre");

console.log(found);
sa = JSON.stringify(salas);

console.log (sa);

username='sotsubo';
const existingUser=users.find((user) => user.username=== username);
console.log("existingUser",existingUser)
// console.log()


