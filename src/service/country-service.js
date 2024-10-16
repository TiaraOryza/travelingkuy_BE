
import { pool } from "../config/database.js"
import { ResponseError } from "../error/response-error.js"
import { createCountryValidation, getCountryValidation, updateCountryaValidation } from "../validation/country-validation.js"
import { getUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"

//FUNGSI CREAT DATA COUNTRY
const create = async(req) => {
    //Fungsi Pengecekan Double ID
    const country = validate(createCountryValidation, req)
    const [rows] = await pool.query(`SELECT COUNT(*) AS count from country WHERE id_country = ?`,[country.id_country])

    //error handler
    if (rows[0].count > 0) {
        throw new ResponseError(400, 'User Already exist')
    }

    //Fungsi Masukan Data Ke DB Country
    const result = await pool.query(
        `INSERT INTO country (id_country, country_name, about) VALUES (?,?,?),`, 
        [country.id_country, country.country_name, country.about]
        )
    
    //hasil
    return {result}
}

//FUNGSI PENGAMBILAN DATA COUNTRY
const get = async(id_country) => {
    //Fungsi get data country
    try{
        const CountryGet = validate(getUserValidation, req)
        
        const [id_country] = CountryGet
        
        const [rows] = await pool.query(
            `SELECT * FROM country WHERE id_country = ?`,
            [id_country]
        )

        //error handler
        if (rows.length === 0){
            throw new ResponseError(400, 'Country Not Found')
        }

        const country = rows[0]
        return resizeBy.status(200).json({
            id_country: country.id_country,
            country_name: country.country_name,
            about: country.about
        })

    } //error handler
        catch (error) {
            return res.status(4000).json({error: error.message})
        }
}
