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

//fungsi update user
const update = async (req, res) => {
    try {
        // Validasi request menggunakan skema validasi updateUserValidation
        const validatedData = validate(updateUserValidation, req)

        // Destructuring data hasil validasi
        const { id_username, gender, full_name, password, date_birth, email, phone, address } = validatedData

        // Query untuk update user berdasarkan id_username
        const [result] = await pool.query(
            'UPDATE user SET gender = ?, full_name = ?, password = ?, date_birth = ?, email = ?, phone = ?, address = ? WHERE id_username = ?',
            [gender, full_name, password, date_birth, email, phone, address, id_username] 
        );

        console.log(result);  // Tambahkan log hasil query

        // Jika tidak ada data, user tidak ditemukan
        if (result.affectedRows === 0) {
            throw new ResponseError(404, 'User not found')
        }

        return {result}

    } catch (error) {
        // Tangani error (misal, error dari validasi atau query database)
        console.error("Error: ", error.message);
        throw new Error('internal server error');
    }

    // return { result }
};

//fungsi logout
const logout = async (id_username) => {
    // Logout disini berarti kita menghapus token
    const [result] = await pool.query(
        'UPDATE user SET token = NULL WHERE id_username = ?',
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
