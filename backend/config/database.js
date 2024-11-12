import { Sequelize } from "sequelize";

const db = new Sequelize('legal_db', 'egi', 'duaribu77', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true, // Atur ke `true` jika SQL Server Anda memerlukan enkripsi
            trustServerCertificate: true // Digunakan jika sertifikat SSL server tidak valid
        }
    },
    port: 1433 // Sesuaikan dengan port SQL Server Anda jika berbeda
});

export default db;