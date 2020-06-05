const users=[];
const salas=[{id:1,
            sala:"river",
            users:[],
            cantMaxUsers:4
        }];

const addUserLobby= ({id,username,lobby}) => {
    // Javascript Mastery = javascriptmastery
    username = username.trim().toLowerCase();
    lobby = lobby.trim().toLowerCase();
    console.log (`addUserLobby username ${username} lobby ${lobby}`);


    const existingUser= users.find((user) => user.lobby === lobby && user.username === username);
    if (existingUser){
        return { error: 'Username is taken'};
    }
    const user = {id,username,lobby};
    users.push(user);
    console.log ("addUserLobby users ",users);
    return {user } ;
}

const addUserSala= ({id,username,sala}) => {
    // Javascript Mastery = javascriptmastery
    username = username.trim().toLowerCase();
    sala = sala.trim().toLowerCase();
    console.log (`addUserSala username ${username} sala ${sala}`);

    const sal= salas.find((sal) => sal.sala === sala.sala);
    const existingUser=sal.find((user) => user.username=== username);
    if (existingUser){
        return { error: 'Username is already in the sala'};
    }

    const user = {id,username,lobby};
    salas.find(e => {
        if (e.sala === sala.sala)
            e.users.push(user)}
            );
    console.log ("addUserSala users ",users);
    return {user } ;
}

const removeUserLobby = (id) => {
    const index =users.findIndex((user) => user.id===id);

    if(index !==1){
        return users.splice(index,1)[0];
    }
}


const getUserLobby = (username) => users.find((user) =>{console.log ("user.username" ,user.username);
     if(user.username ===username){return user}
    }
    );


const getUsersInLobby = (lobby) => users.filter((user) => user.lobby===lobby);


const addSalaLobby= ({id,username,sala,lobby,cantMaxUsers}) => {
    // Javascript Mastery = javascriptmastery
    sala = sala.trim().toLowerCase();
    console.log ("addSalaLobby sala ",sala)
    const existingSala= salas.find((sal) =>  sal.sala===sala);
    if (existingSala){
        return { error: 'Sala is taken'};
    }
    user=getUserLobby(username);
    console.log ("getUserLobby dentro de addSalaLobby  user ",user)
    const users=[]
    users.push(user)
    const Room= {id,sala,users,cantMaxUsers};   
    salas.push(Room);
    console.log ("addSalaLobby salas ",salas)
    return {Room } 
}


const getSalasInLobby = () => {
     console.log ("getSalasInLobby salas", salas); return salas};



module.exports = {addUserLobby, removeUserLobby, getUserLobby, getUsersInLobby,addSalaLobby,getSalasInLobby};