import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

const connect = async () =>{
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });
    return conn;
}

const createDatabase = async () =>{
    try{
        const database = process.env.DB_NAME;
        const conn = await connect();
        await conn.execute(`
              DROP DATABASE IF EXISTS ${database} ;
        `)

        await conn.execute(`
              CREATE DATABASE ${database} ;
        `)
        await conn.execute(`
              USE ${database} ;
        `)
            console.log(`database ${database}  is created succefully`);
    }catch(err){
        console.error(`failed to creat the database, Error: `+ err.message);
    }
}

await createDatabase();
