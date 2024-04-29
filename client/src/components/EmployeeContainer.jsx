import React from 'react'
import TableRowEmployee from './TableRowEmployee'
import { useAllEmployeesContext } from '../pages/AllEmployees'
import PageBtnContainer from './PageBtnContainer';
import { Link } from 'react-router-dom';
import '../styles/Employee.css';
function EmployeeContainer() {
    const {data}=useAllEmployeesContext();
    console.log(data);
    const {employees,totalEmployees,numOfPages}=data;
    if(employees && employees.length===0){
        return (
            
            <div>
                <Link to='/dashboard/add-employee'>Add Employee</Link>
                <h2>No Employees to display</h2>
            </div>
        )
    }

  return (
    <div className='employee-details'>
        <div className='employee-details-first'>
        <h3 className='employee-details-head'>{totalEmployees} Employee{employees.length>1 && 's'}</h3>
        <Link to='/dashboard/add-employee' className='employee-details-link'>Add Employee</Link>
        </div>
        <table>
        
            <thead>
            <tr>
                <th>Unique Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>gender</th>
                <th>course</th>
                <th>Create date</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>            {
                employees.map((employee)=>{
                    return (
                        <TableRowEmployee employee={employee} key={employee._id}/>
                    )
                })
            }
            </tbody>
            
        </table>
        <div className="bottom-container">
            {numOfPages > 1 && <PageBtnContainer/>}

            </div>
    </div>
  )
}

export default EmployeeContainer