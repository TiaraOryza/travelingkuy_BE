import { pool } from "../config/database.js"

const authMiddleware = async(req, res, next) => {
    // Mendapatkan token dari header Authorization
    const token = req.get('Authorization')

    console.log('Authorization Header:', req.headers.authorization);

    // Untuk melihat apakah token diterima
    console.log('Token received:', token); 

    if (!token) {
        // Jika tidak ada token, kirimkan respon unauthorized
        res.status(401).json({
            errors: 'No Token Added'
        })
    } else {
        try {

            // Query manual untuk mendapatkan user berdasarkan token
            const [rows] = await pool.query(
                `SELECT * FROM user WHERE token = ?`,
                [token]
            )

            if (rows.length === 0) {
                // Jika token user tidak ditemukan berdasarkan token, kirimkan respon unauthorized
                res.status(401).json({
                    errors: 'Unauthorized'
                })
            } else {
                // Jika user ditemukan, tambahkan user ke req dan lanjutkan ke middleware berikutnya
                req.user = rows[0]
                next()
            }
        } catch (err) {
            // Jika terjadi kesalahan pada query, kirimkan respon error
            res.status(500).json({
                errors: 'Server error'
            })
        }
    }
}

export {
    authMiddleware
}
