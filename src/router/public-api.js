import express from 'express'
import userController from '../controller/user-controller.js'
import CountryController from '../controller/country-controller.js'
import destinationController from '../controller/destination-controller.js'
// import hotelController from '../controller/hotel-controller.js'

const publicRouter = new express.Router()

publicRouter.get('/', userController.succses)

//api users
publicRouter.post('/users', userController.register)
publicRouter.post('/users/login', userController.login)


//api Country
publicRouter.post('/country', CountryController.create)
publicRouter.get('/country/:id_country', CountryController.get)
publicRouter.put('/country/:id_country', CountryController.update)
publicRouter.delete('/country/:id_country', CountryController.remove)

//api destination
publicRouter.post('/country/:id_country/destination', destinationController.create)
// publicRouter.get('/kota/:kota/destination/:destination', destinationController.get)
// publicRouter.put('/kota/:kota/destination/:destination', destinationController.update)
// publicRouter.delete('/kota/:kota/destination/:destination', destinationController.remove)

// //api hotel
// publicRouter.post('/destination/:destination/hotel', hotelController.create)
// publicRouter.get('/destination/:destination/hotel/:hotel', hotelController.get)
// publicRouter.put('/destination/:destination/hotel/:hotel', hotelController.update)
// publicRouter.delete('/destination/:destination/hotel/:hotel', hotelController.remove)




export{
    publicRouter
}