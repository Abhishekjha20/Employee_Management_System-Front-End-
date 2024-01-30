import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
 
function Employee() {
  const [data, setData] = useState([])
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
 
  useEffect(()=> {
    axios.get('http://localhost:8000/getemployees')
    .then(res => {
      if(res.data.Status === "Success") {
        setData(res.data.Result);
        setFilteredData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])
 
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/delete/${id}`)
      .then(res => {
        if (res.data.Status === "Success") {
          setData(prevData => prevData.filter(employees => employees.id !== id));
          window.location.reload(true);
        } else {
          alert("Error deleting employees");
        }
      })
      .catch(err => {
        console.error('Error deleting employees:', err);
        alert("Error deleting employees");
      });
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    filterData(e.target.value);
  }

  const filterData = (searchValue) => {
    const filtered = data.filter(employee =>
      employee.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.address.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.salary.toString().includes(searchValue)
    );
    setFilteredData(filtered);
  }
 
  return (
    <>
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>employees List</h3>
      </div>
      <input 
          type="text"
          className="form-control w-25 ms-auto"
          placeholder="Search Data"
          value={searchInput}
          onChange={handleSearchInputChange}
        />

      <Link to="/create" className='btn btn-success'>Add employees</Link>
      <div className='mt-3'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((employees, index) => {
              return <tr key={index}>
                  <td>{employees.name}</td>
                  <td>{employees.email}</td>
                  <td>{employees.address}</td>
                  <td>{employees.salary}</td>
                  <td>
                    <Link to={`/employeesedit/`+employees.id} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(employees.id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}
export default Employee;