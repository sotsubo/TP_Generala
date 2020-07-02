// const connection = require("./connection");
const UserConnect = require('../model/UserLobby');

async function getUsersLobby(){
    const collection= await UserConnect.find();
    return collection;
}

async function getUserLobby(userId){
    console.log("getUserLobby",userId)
    const user= await UserConnect.findOne({userId: userId});
    return user;
}



async function pushUserLobby(usernama,userId){

    console.log(`pushUser ${name}`);
    //Check if the sala exists
    // const nameExist= await Sala.findOne({name: name});
    // if(nameExist) return err='Sala already exists';
    const user = new UserConnect ({
    userId: userId,
    usernama: usernama
    });
    try{            
        const saveUserLobby=await user.save();
        return saveUserLobby;
        }
    catch(err){
        return err;
    }
    
    
}



async function deleteUserLobby(userId){
    console.log("deleteUserLobby" ,userId)
    const result= await UserConnect.deleteOne({userId: userId});
    return result;

}
async function deleteAllUserLobby(){
    console.log("deleteAllUserLobby" )
    const result= await UserConnect.deleteMany({});
    return result;

}

module.exports = {getUsersLobby, getUserLobby, pushUserLobby, deleteUserLobby,deleteAllUserLobby };