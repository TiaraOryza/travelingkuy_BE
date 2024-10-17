
import { pool } from "../config/database.js"
import { ResponseError } from "../error/response-error.js"
import { createCountryValidation, getCountryValidation,  updateCountryValidation } from "../validation/country-validation.js"
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
        `INSERT INTO country (id_country, country_name, about) VALUES (?,?,?)`, 
        [country.id_country, country.country_name, country.about]
        )
    
    //hasil
    return {result}
}

//FUNGSI PENGAMBILAN DATA COUNTRY
const get = async(id_country) => {
    //cek id dari url
    console.log('Mencari country dengan id:', id_country);

    //validasi data
    let GetCountry = validate(getCountryValidation, {id_country})
    
    const [rows] = await pool.query(
         `SELECT * FROM country WHERE id_country = ?`,
        [id_country]
    )

    console.log('Hasil query:', rows);

    //error handler
    if (rows.length === 0){
        throw new ResponseError(404, 'Country Not Found')
    }

    GetCountry = rows[0]

    return {
    id_country: GetCountry.id_country,
    country_name: GetCountry.country_name,
    about: GetCountry.about
    }
}

//FUNGSI UPDATE DATA COUNTRY
const update = async (req) => {
    try {
        // validasi data
        const validatedData = validate(updateCountryValidation, req)
        // Logging hasil validasi
        console.log("Data setelah validasi:", validatedData);

        //destucturing data hasil validasi
        const { id_country, country_name, about } = validatedData

        //query untuk update country
        const [result] = await pool.query(
            `UPDATE country SET country_name = ?, about = ? WHERE id_country = ?`, 
            [country_name, about, id_country]
        )

        console.log("Hasil query update:", result);

        if(result.affectedRows === 0){
            throw new ResponseError(404, 'User not found')
        }

        return {result}

    } catch (error) {
        // error handling lainnya
        console.log("Error: ", error.mesaage)
        throw new ResponseError('internal server error')
    }
}

const remove = async (id_country) => {
    try {
        // Validasi id_country
        const validatedIdCountry = validate(getCountryValidation, { id_country });

        // Cek apakah country ada
        const [countryRows] = await pool.query(
            `SELECT id_country FROM country WHERE id_country = ?`, 
            [validatedIdCountry.id_country]
        );

        if (countryRows.length === 0) {
            throw new ResponseError(404, 'Country is not found');
        }

        // Delete country
        const [deleteResult] = await pool.query(
            `DELETE FROM country WHERE id_country = ?`, 
            [validatedIdCountry.id_country]
        );

        return deleteResult;
    } catch (error) {
        console.error('Error:', error.message);
        throw new ResponseError(500, 'Internal server error');
    }
};


//export module
export default {
    create,
    get,
    update,
    remove
}
