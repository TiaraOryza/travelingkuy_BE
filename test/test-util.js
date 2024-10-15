import { pool } from "../src/config/database.js"
import bcrypt from 'bcryptjs'

// Buat data User
export const removeUserTest = async () => {
    await pool.query(`DELETE FROM user WHERE id_username = 'test'`);
};

export const createUserTest = async () => {
    const hashedPassword = await bcrypt.hash('rahasia', 10);
    await pool.query(`INSERT INTO user (id_username, full_name, password) VALUESd  ( ?, ?, ?)`, 
    ['tiara456', 'tiara oryza sativa', hashedPassword]);
};

// // Buat data kota
// export const removeKotaTest = async () => {
//     await pool.query(`DELETE FROM country WHERE nm_kota = 'test'`);
// };

// export const createKotaTest = async () => {
//     await pool.query(`INSERT INTO kota (nm_kota, about, country) VALUES (?, ?, ?)`, ['test', 'test', 'test']);
// };

// export const getKotaTest = async () => {
//     const [rows] = await pool.query(`SELECT * FROM kota WHERE id_admin = ?`, ['admin']);
//     return rows[0];
// };

// // Create data destination
// export const removeDestinationTest = async () => {
//     await pool.query(`DELETE FROM destination WHERE nm_kota = 'test'`);
// };

// export const createDestinationTest = async () => {
//     await pool.query(`INSERT INTO destination (nm_destination, about, nm_kota) VALUES (?, ?, ?)`, ['test', 'test', 'test']);
// };

// export const getDestinationTest = async () => {
//     const [rows] = await pool.query(`SELECT * FROM destination WHERE nm_kota = ?`, ['test']);
//     return rows[0];
// };

// // Create data hotel
// export const removeHotelTest = async () => {
//     const destination = await getDestinationTest();
//     await pool.query(`DELETE FROM hotel WHERE id_destination = ?`, [destination.id]);
// };

// export const createHotelTest = async () => {
//     const destination = await getDestinationTest();
//     await pool.query(`INSERT INTO hotel (nm_hotel, about, alamat, price, id_destination) VALUES (?, ?, ?, ?, ?)`, 
//     ['test', 'test', 'test', 'test', destination.id]);
// };

// export const getHotelTest = async () => {
//     const destination = await getDestinationTest();
//     const [rows] = await pool.query(`SELECT * FROM hotel WHERE id_destination = ?`, [destination.id]);
//     return rows[0];
// };

// // Create booking
// export const removeBookingTest = async () => {
//     await pool.query(`DELETE FROM booking WHERE username = 'test'`);
// };

// export const createBookingTest = async () => {
//     const hotel = await getHotelTest();
//     await pool.query(`INSERT INTO booking (check_in, check_out, price, username, id_hotel) VALUES (?, ?, ?, ?, ?)`, 
//     [new Date('2024-07-07'), new Date('2024-07-08'), '8900', 'test', hotel.id]);
// };

// export const getBookingTest = async () => {
//     const [rows] = await pool.query(`SELECT * FROM booking WHERE username = 'test'`);
//     return rows[0];
// };



//punya ucup jgn dihapus
// //Buat data User
// export const removeUserTest = async ()=>{
//     await prisma.user.deleteMany({
//         where :{
//             username : 'test'
//         }
//     })
// }

// export const createUserTest = async()=>{
//     await prisma.user.create({
//         data :{
//             username : 'test',
//             full_name : 'test',
//             password : await bcrypt.hash('rahasia', 10),
//             email : 'test@gmail.com',
//             phone : '089678767443',
//             token : 'test'
//         }
//     })
// }

// //Buat data kota
// export const removeKotaTest = async()=>{
//     await prisma.kota.deleteMany({
//         where:{
//             nm_kota : 'test'
//         }
//     })
// }

// export const createKotaTest = async()=>{
//     await prisma.kota.create({
//         data :{
//             nm_kota : 'test',
//             about : 'test',
//             country : 'test'
//         }
//     })
// }

// export const getKotaTest = async()=>{
//     return prisma.kota.findFirst({
//         where:{
//             id_admin : 'admin'
//         }
//     })
// }

// //create data destination
// export const removeDestinationTest = async ()=>{
//     await prisma.destination.deleteMany({
//         where :{
//             nm_kota : 'test'
//         }
//     })   
// }

// export const createDestinationTest = async ()=>{
//     await prisma.destination.create({
//         data :{
//             nm_destination : 'test',
//             about : 'test',
//             nm_kota : 'test'
//         }
//     })    
// }

// export const getDestinationTest = async ()=>{
//     return prisma.destination.findFirst({
//         where :{
//             nm_kota : 'test'
//         }
//     })
// }

// //create data hotel
// export const removeHotelTest = async()=>{
//     const getDestination = await getDestinationTest()
//     await prisma.hotel.deleteMany({
//         where :{
//             id_destination : getDestination.id
//         }
//     })
// }

// export const createHotelTest = async()=>{
//     const getDestination = await getDestinationTest()
//     await prisma.hotel.create({
//         data:{
//             nm_hotel : 'test',
//             about : 'test',
//             alamat : 'test',
//             price : 'test',
//             id_destination : getDestination.id

//         }
//     })
// }

// export const getHotelTest = async()=>{
//     const getDestination = await getDestinationTest()
//     return prisma.hotel.findFirst({
//         where:{
//             id_destination : getDestination.id
//         }
//     })
// }

// //create booking
// export const removeBookingTest = async()=>{
//     await prisma.booking.deleteMany({
//         where :{
//             username : 'test'
//         }
//     })
// } 

// export const createBookingTest = async()=>{
//     const gethotel = await getHotelTest()
//     await prisma.booking.create({
//         data :{
//             check_in : new Date('2024-07-07'),
//             check_out : new Date('2024-07-08'),
//             price : '8900',
//             username : 'test',
//             id_hotel : gethotel.id
//         }
//     })
// }

// export const getBookingTest = async()=>{
//     return prisma.booking.findFirst({
//         where :{
//             username : 'test'
//         }
//     })
// }
