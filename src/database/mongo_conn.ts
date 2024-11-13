import { connect, connection } from 'mongoose';
//const mongoose = require ('mongoose')
//import mongoose from 'mongoose';

//const connectionString = 'mongodb://localhost:27017/Prueba_1'
export async function run() {
    await connect('mongodb://localhost:27017/Prueba_1')
    .then(()=>{
        console.log('Database connected!!')
    }) .catch((err)=>{
        console.error(err)
    });

} 
export function endConn() {
    connection.close()
};
