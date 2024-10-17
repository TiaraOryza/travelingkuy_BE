import express from 'express'
import cors from 'cors'
import { pool } from '../config/database.js'
//import { errorMiddleware } from '../middleware/error-middleware.js'
import { publicRouter } from '../router/public-api.js'
import { userRouter } from '../router/api.js'

//semua route
const web = express()
web.use(cors())
web.use(express.json())
web.use(publicRouter)
web.use(userRouter)
// web.use(errorMiddleware)

//Route untuk tes koneksi database
web.get('/ping', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 AS result');
        res.json({ message: 'Koneksi berhasil!', result: rows[0].result });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Database error', error: error.message });
    }
    })

// web.get('/users/current', authMiddleware, async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT 1 AS result');
//         res.json({ message: 'Koneksi berhasil!', result: rows[0].result });
//     } catch (error) {
//         console.error('Database error:', error);
//         res.status(500).json({ message: 'Database error', error: error.message });
//     }
// });

export default web