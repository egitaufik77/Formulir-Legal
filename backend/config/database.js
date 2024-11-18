import { Sequelize } from "sequelize";

const db = new Sequelize('legal_db', 'egi', 'Unimedika77', {
    host: '192.168.88.123',
    dialect: 'mssql',
    logging: console.log,
    timezone: '+07:00',
     define: {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
    dialectOptions: {
        options: {
            encrypt: true, // Atur ke `true` jika SQL Server Anda memerlukan enkripsi
            trustServerCertificate: true // Digunakan jika sertifikat SSL server tidak valid
        }
    },
    port: 1433 // Sesuaikan dengan port SQL Server Anda jika berbeda
});

export default db;