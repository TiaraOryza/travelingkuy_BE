import { pool } from "../config/database.js"
import bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js"

//fungsi register
const register = async (req) => {
    const user = validate(registerUserValidation, req)
    const [rows] = await pool.query(`SELECT COUNT(*) AS count From user WHERE id_username = ?`, [user.id_username])

    //pengecekan data id_username
    if (rows[0].count > 0) {
        throw new ResponseError(400, 'User already exists')
    }

    //enkripsi password
    user.password = await bcrypt.hash(user.password, 10)

    //masukin data ke database user 
    const result = await pool.query(
        `INSERT INTO user (id_username, full_name, password) VALUES (?, ?, ?)`,
        [user.id_username, user.full_name, user.password]
    )

    return {result}
}

// fungsi login
const login = async (req) => {
    const user = validate(loginUserValidation, req)

    const [rows] = await pool.query(
        'SELECT * FROM user WHERE id_username = ?', 
        [user.id_username]
    );
    const findUser = rows[0]

    if (!findUser) {
        throw new ResponseError(401, 'Username is wrong')
    }

    const passwordValid = await bcrypt.compare(user.password, findUser.password)
    if (!passwordValid) {
        throw new ResponseError(401, 'Password is wrong')
    }

    const token = uuid().toString()

    await pool.query(
        'UPDATE user SET token = ? WHERE id_username = ?',
        [token, user.id_username]
    );

    return { token };
};

// Fungsi get data user (menampilkan data)
const get = async (id_username) => {
    try {
        const UserGet = validate(getUserValidation, req)

        const {id_username} = UserGet
        
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE id_username = ?',
            [id_username]
        )

        if (rows.length === 0) {
            throw new ResponseError(404, 'User not found')
        }

        const user = rows[0];
        return res.status(200).json({
            id_username: user.id_username,
            gender: user.gender,
            full_name: user.full_name,
            date_birth: user.date_birth,
            email: user.email,
            phone: user.phone,
            address: user.address

        })
        } catch (error) {
            // Tangani error (error vvalidasi atau query)
            return res.status(400).json({ error: error.message })
}};

//fungsi update user
const update = async (req, res) => {
    try {
        // Validasi request menggunakan skema validasi updateUserValidation
        const validatedData = validate(updateUserValidation, req)

        // Destructuring data hasil validasi
        const { id_username, id_gender, full_name, date_birth, email, phone, address } = validatedData

        // Query untuk update user berdasarkan id_username
        const [result] = await pool.query(
            'UPDATE users SET id_gender = ?, full_name = ?, date_birth = ?, email = ?, phone = ?, address = ? WHERE id_username = ?',
            [id_gender, full_name, date_birth, email, phone, address, id_username] 
        );

        // Jika tidak ada data, user tidak ditemukan
        if (result.affectedRows === 0) {
            throw new ResponseError(404, 'User not found')
        }

        // Mengembalikan pesan sukses
        return res.status(200).json({ message: 'User updated successfully' })

    } catch (error) {
        // Tangani error (misal, error dari validasi atau query database)
        return res.status(400).json({ error: error.message })
    }
};

//fungsi logout
const logout = async (id_username) => {
    // Logout disini berarti kita menghapus token
    const [result] = await pool.query(
        'UPDATE users SET token = NULL WHERE id_username = ?',
        [id_username]
    );

    if (result.affectedRows === 0) {
        throw new ResponseError(404, 'User not found')
    }

    return { message: 'User logged out successfully' }
};

//export module
export default {
    register,
    login,
    get,
    update,
    logout
}

// ini dari ucup jgn dihapus
// const register = async (req) => {
//     const user = validate(registerUserValidation, req)

//     const countUser = await pool.user.count({
//         where: {
//             username: user.username
//         }
//     })

//     if (countUser === 1) {
//         throw new ResponseError(400, 'user already exists')

//     }

//     user.password = await bcrypt.hash(user.password, 10)

//     return prisma.user.create({
//         data: user,
//         select: {
//             username: true,
//             full_name: true,
//             email: true,
//             phone: true
//         }
//     })
// }

// const login = async (req) => {
//     const user = validate(loginUserValidation, req)

//     const findUser = await prisma.user.findUnique({
//         where: {
//             username: user.username
//         }
//     })

//     if (!findUser) {
//         throw new ResponseError(401, 'username or password wrong')

//     }

//     const passwordValid = await bcrypt.compare(user.password, findUser.password)
//     if (!passwordValid) {
//         throw new ResponseError(401, 'username or password wrong')
//     }

//     const token = uuid().toString()

//     return prisma.user.update({
//         where: {
//             username: findUser.username
//         },
//         data: {
//             token: token
//         },
//         select: {
//             token: true
//         }
//     })

// }

// const get = async (username) => {
//     username = validate(getUserValidation, username)

//     const findUSer = await prisma.user.findUnique({
//         where: {
//             username: username
//         },
//         select: {
//             username: true,
//             full_name: true,
//             email: true,
//             phone: true
//         }
//     })

//     if (!findUSer) {
//         throw new ResponseError(404, 'user is not found')

//     }

//     return findUSer

// }

// const update = async (req) => {
//     const user = validate(updateUserValidation, req)

//     const countUser = await prisma.user.count({
//         where: {
//             username: user.username
//         }
//     })

//     if (countUser !== 1) {
//         throw new ResponseError(404, 'user is not found')

//     }

//     const data = {
//         full_name: user.full_name,
//         email: user.email,
//         phone: user.phone,
//         jkel: user.jkel,
//         tgl_lahir: user.tgl_lahir,
//         alamat: user.alamat,
//         ktp: user.ktp,
//         kode_pos: user.kode_pos
//     }

//     if (user.password) {
//         data.password = await bcrypt.hash(user.password, 10);
//     }

//     return prisma.user.update({
//         where: {
//             username: user.username
//         },
//         data: {
//             full_name: user.full_name,
//             email: user.email,
//             phone: user.phone,
//             jkel: user.jkel,
//             tgl_lahir: user.tgl_lahir,
//             alamat: user.alamat,
//             ktp: user.ktp,
//             kode_pos: user.kode_pos
//         },
//         select: {
//             full_name: true,
//             email: true,
//             phone: true,
//             jkel: true,
//             tgl_lahir: true,
//             alamat: true,
//             ktp: true,
//             kode_pos: true

//         }
//     })
// }

// const logout = async (username) => {
//     username = validate(getUserValidation, username)

//     const countUser = await prisma.user.count({
//         where: {
//             username: username
//         }
//     })

//     if (countUser !== 1) {
//         throw new ResponseError(404, 'user is not found')
//     }

//     return prisma.user.update({
//         where: {
//             username: username
//         },
//         data: {
//             token: null
//         },
//         select: {
//             username: true
//         }
//     })
// }




