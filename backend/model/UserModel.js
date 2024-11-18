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
    Keterangan: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        get() {
            const rawValue = this.getDataValue('createdAt');
            return rawValue ? moment(rawValue).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss') : null;
        }
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        get() {
            const rawValue = this.getDataValue('updatedAt');
            return rawValue ? moment(rawValue).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss') : null;
        }
    }

},{
    freezeTableName:true,
    timestamps: true,
    hooks: {
        beforeUpdate: (user) => {
            user.updatedAt = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
        }
    }
});

export default User;

//(async () => {
//     await db.sync();
// })();

