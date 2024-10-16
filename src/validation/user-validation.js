import Joi from 'joi'

const registerUserValidation  = Joi.object({
    id_username : Joi.string().max(100).required(),
    full_name : Joi.string().max(100).required(),
    password : Joi.string().max(100).required(),
    email : Joi.string().email().max(100).required(),
    phone : Joi.string().max(100).required(),
})

const loginUserValidation = Joi.object({
    id_username : Joi.string().max(100).required(),
    password : Joi.string().max(100).required()
})

const getUserValidation = Joi.object({
    id_username: Joi.string().max(100).required(),
    id_role_user: Joi.number().integer().allow(null), //boleh null
    id_booking: Joi.number().integer().allow(null),  // Boleh null
    gender: Joi.string().max(10).allow(null),        // Boleh null
    full_name: Joi.string().max(100).allow(null),
    date_birth: Joi.string().allow(null),            // Boleh null
    email: Joi.string().email().allow(null),
    phone: Joi.string().max(100).allow(null),
    address: Joi.string().allow(null),
    token : Joi.string().allow(null),
})

const updateUserValidation  = Joi.object({
    id_username : Joi.string().max(100).optional(),
    gender: Joi.string().max(10).optional(),
    full_name : Joi.string().max(100).optional(),
    date_birth : Joi.string().max(100).optional(),
    password : Joi.string().max(100).optional(),
    email : Joi.string().email().max(100).optional(),
    phone : Joi.string().max(100).optional(),
    address : Joi.string().max(100).optional(),
    // ktp : Joi.string().max(100).required(),
    // kode_pos : Joi.string().max(100).required(),
})
export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}