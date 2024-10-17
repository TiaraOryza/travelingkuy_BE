import { pool } from "../config/database.js"
import { ResponseError } from "../error/response-error.js"
import { createDestinationValidation, getDestinationVlidation } from "../validation/destination-validation.js"
import { getCountryValidation } from "../validation/country-validation.js"
import { validate } from "../validation/validation.js"

const checkCountryExists = async (id_country) => {
    const validateCountry = validate(getCountryValidation, { id_country })

    console.log("id_country yang dikirim:", validateCountry.id_country);

    const [rows] = await pool.query(
    `SELECT COUNT(*) AS count FROM country WHERE id_country = ? `,
    [validateCountry.id_country]
    );

    //console.log("Query yang akan dijalankan:", [rows]);

    if (rows[0].count !== 1) {
        throw new ResponseError(404, 'country is not found')
    }

    return validateCountry.id_country
}

const create = async (id_country, req) => {
    const destination = validate(createDestinationValidation, req)
    const countryId = await checkCountryExists(id_country)
    destination.id_country = countryId;

    const [result] = await pool.query(
        `INSERT INTO destination (id_destination, id_country, destination_name, price, about_1, about_2, about_3, about_4) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [destination.id_destination, destination.id_country, destination.destination_name, destination.price, destination.about_1, destination.about_2, destination.about_3, destination.about_4]
    )

    return { result }
}

const get = async (id_country, id_destination) => {
    console.log('id destination: ', id_destination)

    //validasi data
    const getDestin = validate(getDestinationVlidation, {id_destination})
    const countryId = await checkCountryExists(id_country)
    getDestin.id_country = countryId

    const [rows] = await pool.query(`SELECT * FROM destination WHERE id_destination = ?`,
        [getDestin.id_destination])

    console.log('hasil query : ', rows)

    if (rows.length === 0){
        throw new ResponseError(404, 'Destination Not Found')
    }

    const result = rows[0]

    return {result}
}

export default {
    create,
    get
}