import { Sequelize } from "sequelize";
import db from "../config/database.js";
import moment from 'moment';

const {DataTypes} = Sequelize;
const User = db.define('legal', {
    Nama_Dokumen: DataTypes.STRING,
    Nomor_Surat: DataTypes.STRING,
    Tanggal_Terbit: {
        type: DataTypes.DATE,
        get() {
            const rawValue = this.getDataValue('Tanggal_Terbit');
            return rawValue ? moment(rawValue).format('DD-MM-YYYY') : null;
        }
    },
    Tanggal_Exp: {
        type: DataTypes.DATE,
        get() {
            const rawValue = this.getDataValue('Tanggal_Exp');
            return rawValue ? moment(rawValue).format('DD-MM-YYYY') : null;
        }
    },
    Site: DataTypes.STRING,
    Link: DataTypes.STRING,
    Keterangan: DataTypes.STRING
    
},{
    freezeTableName:true
});

export default User;

(async()=>{
    await db.sync();
})();