import Joi from 'joi'

const createDestinationValidation = Joi.object({
    id_destination : Joi.string().max(100).required(),
    id_country : Joi.string().max(100).required(),
    destination_name : Joi.string().max(100).required(),
    price   : Joi.number().integer().required(),
    about_1 : Joi.string().max(100).required(),
    about_2 : Joi.string().max(100).required(),
    about_3 : Joi.string().max(100).required(),
    about_4 : Joi.string().max(100).required()
})

const getDestinationVlidation =  Joi.object({
    id_destination : Joi.string().max(100).optional(),
    id_country : Joi.string().max(100).optional(),
    destination_name : Joi.string().max(100).optional(),
    price   : Joi.number().integer().max(100).optional(),
    about_1 : Joi.string().max(100).optional(),
    about_2 : Joi.string().max(100).optional(),
    about_3 : Joi.string().max(100).optional(),
    about_4 : Joi.string().max(100).optional()
})

const updateDestinationVlidation = Joi.object({
    id_destination : Joi.string().max(100).optional(),
    id_country : Joi.string().max(100).optional(),
    destination_name : Joi.string().max(100).optional(),
    price   : Joi.number().integer().max(100).optional(),
    about_1 : Joi.string().max(100).optional(),
    about_2 : Joi.string().max(100).optional(),
    about_3 : Joi.string().max(100).optional(),
    about_4 : Joi.string().max(100).optional()
})

export{
    createDestinationValidation,
    getDestinationVlidation,
    updateDestinationVlidation
}