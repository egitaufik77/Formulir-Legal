import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Userlist = () => {
  const [legal, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get('http://192.168.88.123:5001/legal');
    setUsers(response.data);
  }

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://192.168.88.123:5001/legal/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  const filteredUsers = legal.filter(user =>
    user.Nama_Dokumen.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.Keterangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-three-quarters">
        
        {/* Card untuk menampilkan tabel dan form pencarian */}
        <div className="card">
  <header className="card-header">
    <p className="card-header-title">Daftar Dokumen Legal</p>
    <div className="card-header-item">
      <Link to={'add'} className='button is-success'>Tambah Baru</Link>
    </div>
  </header>


          <div className="card-content">
            {/* Grouped input untuk Search */}
            <div className="field is-grouped is-align-items-center mb-4">
              <p className="control is-expanded has-icons-left">
                <input
                  type="text"
                  className="input"
                  placeholder="Cari Nama Dokumen atau Keterangan"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <span className="icon is-left">
                  <i className="fas fa-search"></i>
                </span>
              </p>
            </div>

            <table className='table is-striped is-fullwidth'>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Dokumen</th>
                  <th>Nomor Surat</th>
                  <th>Tanggal Terbit</th>
                  <th>Tanggal Exp</th>
                  <th>Site</th>
                  <th>Link</th>
                  <th>Keterangan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((legal, index) => (
                    <tr key={legal.id}>
                      <td>{index + 1 + (currentPage - 1) * usersPerPage}</td>
                      <td>{legal.Nama_Dokumen}</td>
                      <td>{legal.Nomor_Surat}</td>
                      <td>{legal.Tanggal_Terbit}</td>
                      <td>{legal.Tanggal_Exp}</td>
                      <td>{legal.Site}</td>
                      <td>{legal.Link}</td>
                      <td>{legal.Keterangan}</td>
                      <td>
                        <div className="buttons">
                          <Link to={`edit/${legal.id}`} className="button is-small is-info">Edit</Link>
                          <button onClick={() => deleteUser(legal.id)} className="button is-small is-danger">Hapus</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="has-text-centered">Tidak ada data untuk ditampilkan.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <nav className="pagination" role="navigation" aria-label="pagination">
              <ul className="pagination-list">
                {pageNumbers.map(number => (
                  <li key={number}>
                    <button
                      className={`pagination-link ${currentPage === number ? 'is-current' : ''}`}
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userlist;
