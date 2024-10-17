import countryService from "../service/country-service.js"

const create = async (req, res, next)=>{
    try {
        const request = req.body
        const result = await countryService.create(request)
        res.status(200).json({
            message : 'Create data successfull',
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res , next)=>{
    try {
        const id_country = req.params.id_country
        console.log('id_country dari URL:', id_country)

        const result = await countryService.get(id_country)
        res.status(200).json({
            message : 'data ini adalah data country',
            data: result
        })

    } catch (error) {
        next(error)
    }
}

const update = async(req ,res, next)=>{
    try {
        const country = req.country.id_country
        const request = req.body
        request.id_country = country

        const result = await countryService.update(request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next)=>{
    try {
        const id_country = req.country.id_country

        await kotaService.remove(id_country)
        res.status(200).json({
            message : 'Data delete succesfully',
            data : 'ok'
        })
    } catch (error) {
        next(error)
    }
}

export default{
    create,
    get,
    update,
    remove
}