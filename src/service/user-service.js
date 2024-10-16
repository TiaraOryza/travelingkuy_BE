import { pool } from "../config/database.js"
import bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js"

//fungsi register
const register = async (req) => {
    //pengecekan data id_username
    const user = validate(registerUserValidation, req)
    const [rows] = await pool.query(`SELECT COUNT(*) AS count From user WHERE id_username = ?`, [user.id_username])

    if (rows[0].count > 0) {
        throw new ResponseError(400, 'User already exists')
    }

    //enkripsi password
    user.password = await bcrypt.hash(user.password, 10)

    //masukin data ke database user 
    const result = await pool.query(
        `INSERT INTO user (id_username, full_name, password, email, phone) VALUES (?, ?, ?, ?, ?)`,
        [user.id_username, user.full_name, user.password, user.email, user.phone]
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

    //pesan username salah
    if (!findUser) {
        throw new ResponseError(401, 'Username is wrong')
    } else {
        console.log('User found:', rows); 
    }

    //pesan password salah
    const passwordValid = await bcrypt.compare(user.password, findUser.password)
    if (!passwordValid) {
        throw new ResponseError(401, 'Password is wrong')
    }

    const token = uuid().toString()

    const [updateResult] = await pool.query(
        'UPDATE user SET token = ? WHERE id_username = ?',
        [token, user.id_username]
    );

    //pesan update token gagal
    if (updateResult.affectedRows === 0) {
        throw new Error('Failed to update token');
    }

     // hasil
    return { token };
};

// Fungsi get data user (menampilkan data)

// Fungsi get data user (menampilkan data)
const get = async (id_username) => {
    // Validasi data
    let GetUser = validate(getUserValidation, { id_username });
    
    // Query ke database
    const [rows] = await pool.query(
        'SELECT * FROM user WHERE id_username = ?',
        [id_username]
    );

    // Jika user tidak ditemukan
    if (rows.length === 0) {
        throw new ResponseError(404, 'User not found');
    }

    // Kembalikan data user tanpa password
    GetUser = rows[0];
    return {
        id_username: GetUser.id_username,
        id_role_user: GetUser.id_role_user,
        id_booking: GetUser.id_booking,
        gender: GetUser.gender,
        full_name: GetUser.full_name,
        date_birth: GetUser.date_birth,
        email: GetUser.email,
        phone: GetUser.phone,
        address: GetUser.address
    };
};

// const get = async (req) => {
//     try {
//         //validasi data
//         const ValidatedUsername = validate(getUserValidation, req.params.id_username)
        
//         //query mengambil data berdasarkan id
//         const [rows] = await pool.query(
//             'SELECT * FROM user WHERE id_username = ?',
//             [ValidatedUsername]
//         )

//         if (rows.length === 0) {
//             throw new ResponseError(404, 'User not found')
//         }

//         const user = rows[0]

//         const validatedUserData = validate(userValidationSchema, {
//             // id_username: user.id_username,
//             id_role_user: user.id_role_user,
//             id_booking: user.id_booking,
//             gender: user.gender,
//             full_name: user.full_name,
//             date_birth: user.date_birth,
//             email: user.email,
//             phone: user.phone,
//             address: user.address,
//             token: user.token
//         });

//         return validatedUserData

//         } catch (error) {
//             // Tangani error (error vaalidasi atau query)
//             throw new ResponseError(402, 'Sorry, There is a Problem')
//     }
// };

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
