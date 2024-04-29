import React from 'react'
import { Form, Link } from 'react-router-dom'
import '../styles/Employee.css'
function TableRowEmployee({employee}) {
  return (
    <tr>
        <td>{employee._id}</td>
        <td>
          <img className='employee-image' src={employee.image} alt="profile-image" />
          
          </td>
        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td>{employee.mobile}</td>
        <td>{employee.designation}</td>
        <td>{employee.gender}</td>
        <td>{employee.course}</td>
        <td>{employee.createdAt}</td>
        <td>
          <div className="main-edit-delete">
          <Link to={`../edit-employee/${employee._id}`} className='btn edit-btn'>Edit</Link>
        <Form method='post' action={`../delete-employee/${employee._id}`}>
            <button type='submit' className='btn delete-btn'>
                Delete
            </button>
        </Form>
          </div>
        
        </td>
    </tr>
  )
}

export default TableRowEmployee