import React,{useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const AddUser = () => {
const [Nama_Dokumen, setDokumen] = useState("");
const [Nomor_Surat, setSurat] = useState("");
const [Tanggal_Terbit, setTerbit] = useState("");
const [Tanggal_Exp, setExp] = useState("");
const [Site, setSite] = useState("");
const [Link, setLink] = useState("");
const [Keterangan, setKeterangan] = useState("");

const navigate = useNavigate();


const saveUser = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://192.168.88.103:5001/legal', {
            Nama_Dokumen,
            Nomor_Surat,
            Tanggal_Terbit,
            Tanggal_Exp,
            Site,
            Link,
            Keterangan
        });
        navigate("/");
    } catch (error) {
        console.log(error)
    }
}



  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={saveUser}>
                <div className="field">
                    <label className="label">Nama Dokumen</label>
                    <div className="control">
                        <input type="text" className='input' value={Nama_Dokumen} onChange={(e) => setDokumen(e.target.value)} placeholder='Nama Dokumen'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Nomor Surat</label>
                    <div className="control">
                        <input type="text" className='input' value={Nomor_Surat} onChange={(e) => setSurat(e.target.value)}placeholder='Nomor Surat'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Tanggal Terbit</label>
                    <div className="control">
                        <input type="date" className='input' value={Tanggal_Terbit} onChange={(e) => setTerbit(e.target.value)}placeholder='Tanggal Terbit'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Tanggal Exp</label>
                    <div className="control">
                        <input type="date" className='input' value={Tanggal_Exp} onChange={(e) => setExp(e.target.value)}placeholder='Tanggal Exp'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Site</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                        <select value={Site} onChange={(e) => setSite(e.target.value)}>
                            <option value="UMST">UMST</option>
                            <option value="UMSB">UMSB</option>
                            <option value="UMCC">UMCC</option>
                        </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Link</label>
                    <div className="control">
                        <input type="text" className='input' value={Link} onChange={(e) => setLink(e.target.value)}placeholder='Link'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Keterangan</label>
                    <div className="control">
                        <input type="text" className='input' value={Keterangan} onChange={(e) => setKeterangan(e.target.value)}placeholder='Keterangan'/>
                    </div>
                </div>
                <div className="field">
                    <button type="submit" className='button is-success'>Save</button>
                    <button type="button" className='button is-light ml-4' onClick={() => navigate(-1)}>Kembali</button> 
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddUser