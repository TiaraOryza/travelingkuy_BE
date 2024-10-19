import destinationService from "../service/destination-service.js"

const create = async(req, res, next)=>{
    try {
        const countryId = req.params.id_country
        const request = req.body

        const result = await destinationService.create(countryId, request)
        res.status(200).json({
            messaga : 'Ini data destinasi di country params',
            data : result
        })

    } catch (error) {
        next(error)
    }
}

const get = async(req, res, next)=>{
    try {
        const countryId = req.params.id_country
        const destinationId = req.params.id_destination

        const result = await destinationService.get(countryId, destinationId)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next)=>{
    try {
        const countryId = req.params.id_country
        const destinationId = req.params.id_destination
        const request = req.body

        console.log('request body:', request)

        request.id_destination = destinationId

        const result = await destinationService.update(countryId, request)
        res.status(200).json({
            message : 'ini adalah data update',
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async(req, res, next)=>{
    try {
        const countryId = req.params.id_country
        const destinationId = req.params.id_destination

        await destinationService.remove(countryId, destinationId)
        res.status(200).json({
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