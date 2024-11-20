import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const [Nama_Dokumen, setDokumen] = useState("");
    const [Nomor_Surat, setSurat] = useState("");
    const [Departement, setDepartement] = useState("");
    const [Tanggal_Terbit, setTerbit] = useState("");
    const [Tanggal_Exp, setExp] = useState("");
    const [Site, setSite] = useState("");
    const [Link, setLink] = useState("");
    const [Keterangan, setKeterangan] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    // Gunakan useCallback untuk membuat fungsi getById stabil
    const getById = useCallback(async () => {
        const response = await axios.get(`http://192.168.88.123:5001/legal/${id}`);
        setDokumen(response.data.Nama_Dokumen);
        setSurat(response.data.Nomor_Surat);
        setDepartement(response.data.Departement);
        setTerbit(response.data.Tanggal_Terbit);
        setExp(response.data.Tanggal_Exp || "");
        setSite(response.data.Site);
        setLink(response.data.Link);
        setKeterangan(response.data.Keterangan);
    }, [id]);

    useEffect(() => {
        getById();
    }, [getById]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://192.168.88.123:5001/legal/${id}`, {
                Nama_Dokumen,
                Nomor_Surat,
                Departement,
                Tanggal_Terbit,
                Tanggal_Exp: Tanggal_Exp || null, 
                Site,
                Link,
                Keterangan
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateUser}>
                    <div className="field">
                        <label className="label">Nama Dokumen</label>
                        <div className="control">
                            <input type="text" className="input" value={Nama_Dokumen} onChange={(e) => setDokumen(e.target.value)} placeholder="Nama Dokumen" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Nomor Surat</label>
                        <div className="control">
                            <input type="text" className="input" value={Nomor_Surat} onChange={(e) => setSurat(e.target.value)} placeholder="Nomor Surat" />
                        </div>
                    </div>
                    <div className="field">
            <label className="label">Departement</label>
            <div className="control">
            <div className="select is-fullwidth">
                <select value={Departement} onChange={(e) => setDepartement(e.target.value)}>
                  <option value="">Pilih Departement</option> {/* Opsi default kosong */}
                    <option value="NURSING">Nursing</option>
                    <option value="PROCUREMENT">PROCUREMENT</option>
                    <option value="FINANCE">FINANCE AND ACCOUNTING</option>
                    <option value="HRD">HUMAN RESOURCE DEVELOPMENT</option>
                    <option value="ICT">ICT</option>
                    <option value="BOD">BOARD OF DIRECTOR</option>
                    <option value="QR">QUALITY AND RISK</option>
                    <option value="ANCILLARY">ANCILLARY SERVICE</option>
                    <option value="CASEMIX">CASEMIX</option>
                    <option value="MEDICAL-SERVICE">MEDICAL SERVICE</option>
                    <option value="DOKTER-SPESIALIS">DOKTER SPESIALIS</option>
                    <option value="BUSDEV">BUSINESS DEVELOPMENT</option>
                    <option value="STRUCTURAL">STRUCTURAL</option>
                    <option value="BUSINESS-OFFICE">BUSINESS OFFICE</option>
                </select>
                </div>
            </div>
            </div>
                    <div className="field">
                        <label className="label">Tanggal Terbit</label>
                        <div className="control">
                            <input type="date" className="input" value={Tanggal_Terbit} onChange={(e) => setTerbit(e.target.value)} placeholder="Tanggal Terbit" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Tanggal Exp</label>
                        <div className="control">
                            <input type="date" className="input" value={Tanggal_Exp} onChange={(e) => setExp(e.target.value)} placeholder="Tanggal Exp" />
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
                            <input type="text" className="input" value={Link} onChange={(e) => setLink(e.target.value)} placeholder="Link" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Keterangan</label>
                        <div className="control">
                            <input type="text" className="input" value={Keterangan} onChange={(e) => setKeterangan(e.target.value)} placeholder="Keterangan" />
                        </div>
                    </div>
                    <div className="field">
                        <button type="submit" className="button is-success">Update</button>
                        <button type="button" className="button is-light ml-4" onClick={() => navigate(-1)}>Kembali</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
