
//VALIDATION
const Joi= require('@hapi/joi');


//Register validation
const registerValidation = data => {
    const schema={
        name: Joi.string()
            .min(2)
            .required(),
        lastname: Joi.string()
            .min(2)
            .required(),
        username: Joi.string()
            .min(5)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data,schema);
}

//Register validation
const loginValidation = data => {
    const schema={
        username: Joi.string()
            .min(5)
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data,schema);
}

const userLobbyValidation = data => {
    const schema={
        username: Joi.string()
            .min(5)
            .required(),
        userId: Joi.string()
            .min(1)
            .required()
    };
    return Joi.validate(data,schema);
}

const salaValidation = data => {
    const schema={
        salaName: Joi.string()
            .min(2)
            .required(),
        isActive: Joi.boolean()
            .required(),
        players: Joi.object(),
        cantMaxUsers: Joi.number()
            .required(),

 
    };
    return Joi.validate(data,schema);
}
module.exports.salaValidation= salaValidation;

module.exports.registerValidation= registerValidation;
module.exports.loginValidation= loginValidation;
module.exports.userLobbyValidation= userLobbyValidation;
