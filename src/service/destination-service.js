import { pool } from "../config/database.js"
import { ResponseError } from "../error/response-error.js"
import { createDestinationValidation } from "../validation/destination-validation.js"
import { getCountryValidation } from "../validation/country-validation.js"
import { validate } from "../validation/validation.js"

const checkCountryExists = async (id_country) => {
    const validateCountry = validate(getCountryValidation, { id_country })

    console.log("id_country yang dikirim:", validateCountry.id_country);

    const [rows] = await pool.query(
    `SELECT COUNT(*) AS count FROM country WHERE id_country = ? `,
    [validateCountry.id_country]
    );

    console.log("Query yang akan dijalankan:", [rows]);

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

export default {
    create
}