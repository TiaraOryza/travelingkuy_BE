import Joi from 'joi'

const registerUserValidation  = Joi.object({
    id_username : Joi.string().max(100).required(),
    full_name : Joi.string().max(100).required(),
    password : Joi.string().max(100).required(),
    // email : Joi.string().email().max(100).required(),
    // phone : Joi.string().max(100).required()
})

const loginUserValidation = Joi.object({
    id_username : Joi.string().max(100).required(),
    password : Joi.string().max(100).required()
})

const getUserValidation = Joi.string().max(100).required()

const updateUserValidation  = Joi.object({
    id_username : Joi.string().max(100).required(),
    full_name : Joi.string().max(100).optional(),
    password : Joi.string().max(100).optional(),
    email : Joi.string().email().max(100).optional(),
    phone : Joi.string().max(100).optional(),
    gender : Joi.string().max(100).required(),
    date_birth : Joi.string().max(100).required(),
    alamat : Joi.string().max(100).required(),
    // ktp : Joi.string().max(100).required(),
    // kode_pos : Joi.string().max(100).required(),
})
export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}