const users=[];
const salas=[{id:1,
            sala:"river"}];

const addUserLobby= ({id,name,lobby}) => {
    // Javascript Mastery = javascriptmastery
    name = name.trim().toLowerCase();
    lobby = lobby.trim().toLowerCase();
    const existingUser= users.find((user) => user.lobby === lobby && user.name === name);
    if (existingUser){
        return { error: 'Username is taken'};
    }
    const user = {id,name,lobby};
    users.push(user);
    return {user } 
}

const removeUserLobby = (id) => {
    const index =users.findIndex((user) => user.id===id);

    if(index !==1){
        return users.splice(index,1)[0];
    }
}


const getUserLobby = (id) => users.find((user) =>{console.log ("user.id" ,user.id);
     if(user.id ===id){return user}
    }
    );


const getUsersInLobby = (lobby) => users.filter((user) => user.lobby===lobby);


const addSalaLobby= ({id,sala,lobby}) => {
    // Javascript Mastery = javascriptmastery
    sala = sala.trim().toLowerCase();
    console.log ("addSalaLobby sala ",sala)
    const existingSala= salas.find((sal) =>  sal.sala===sala);
    if (existingSala){
        return { error: 'Sala is taken'};
    }
    const Room= {id,sala};
    salas.push(Room);
    console.log ("addSalaLobby salas ",salas)

    return {Room } 
}


const getSalasInLobby = () => { console.log ("getSalasInLobby salas", salas); return salas};



module.exports = {addUserLobby, removeUserLobby, getUserLobby, getUsersInLobby,addSalaLobby,getSalasInLobby};