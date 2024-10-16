import userService from "../service/user-service.js"

const succses = (req, res, next)=>{
    try {
        res.status(200).json({
            data : 'succses'
        })
    } catch (error) {
        next(200)
    }
}

const register = async (req, res, next)=>{
    try {
        const result = await userService.register(req.body)
        res.status(200).json({
            message: 'register successfull',
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next)=>{
    try {
        const result = await userService.login(req.body)
        //kirim response sukses
        res.status(200).json({
            message: 'Login successfull',
            token : result.token
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next)=>{
    try {
        const id_username = req.user.id_username
        const result = await userService.get(id_username)
        res.status(200).json({
            message : 'data ini adalah data user dengan auth token',
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next)=>{
    try {
        const user = req.user.id_username
        const request = req.body
        request.id_username = user

        const result = await userService.update(request)
        res.status(200).json({
            message : 'User updated successfully',
            data : result
        })
    } catch (error) {
        next(error)
        
    }
}

const logout = async (req, res, next)=>{
    try {
        const result = await userService.logout(req.user.id_username)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }

}


export default{
    register,
    login,
    get,
    update,
    logout,
    succses
}