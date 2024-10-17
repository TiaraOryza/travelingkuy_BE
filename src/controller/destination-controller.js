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
        const namaCountry = req.params.country
        const destinationId = req.params.destination

        const result = await destinationService.get(namaCountry, destinationId)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next)=>{
    try {
        const namaCountry = req.params.country
        const destinationId = req.params.destination
        const request = req.body
        request.id = destinationId

        const result = await destinationService.update(namaCountry, request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async(req, res, next)=>{
    try {
        const namaCountry = req.params.country
        const destinationId = req.params.destination

        await destinationService.remove(namaCountry, destinationId)
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