import React, { useEffect, useState } from 'react'
import axios from 'axios'
 
function Home() {
  const [adminCount, setAdminCount] = useState()
  const [employeesCount, setemployeesCount] = useState()
  const [salary, setSalary] = useState()
 
  useEffect(() => {
    axios.get('http://localhost:8000/adminCount')
        .then(res => {
            setAdminCount(res.data[0].admin)
        }).catch(err => console.log(err));
 
    axios.get('http://localhost:8000/employeesCount')
        .then(res => {
            setemployeesCount(res.data[0].employees)
        }).catch(err => console.log(err));
 
    axios.get('http://localhost:8000/salary')
        .then(res => {
            setSalary(res.data[0].sumOfSalary)
        }).catch(err => console.log(err));
 
  } , [])
   
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div>
            <h5>Total: {adminCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>employees</h4>
          </div>
          <hr />
          <div>
            <h5>Total: {employeesCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div>
            <h5>Total: {salary}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home;