import Joi from 'joi'

const createCountryValidation = Joi.object({
    id_country : Joi.string().max(100).required(),
    country_name : Joi.string().max(100).required(),
    about : Joi.string().max(100).required(),
    
})

const getCountryValidation = Joi.object({
    id_country : Joi.string().max(100).optional(),
    country_name : Joi.string().max(100).optional(),
    about : Joi.string().max(100).optional()
})


const updateCountryValidation = Joi.object({
    id_country : Joi.string().max(100).required(),
    country_name : Joi.string().max(100).optional(),
    about : Joi.string().max(100).optional()
})
export {
    createCountryValidation,
    getCountryValidation,
    updateCountryValidation
}