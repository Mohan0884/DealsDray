import React from 'react'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import { Form,useSubmit,Link } from 'react-router-dom'
import { SORT_BY } from '../../../utils/constants.js'
import { useAllEmployeesContext } from '../pages/AllEmployees.jsx'
import '../styles/Search.css';
function SearchContainer() {
  const submit=useSubmit();

  return (
    <div className='search-main'>
        <Form className='search-form'>
          <FormRow type="text" name="search" labelText="search" onChange={(e)=>submit(e.currentTarget.form)} />
          <FormRowSelect name="sort" defaultValue='newest' list={[...Object.values(SORT_BY)]} onChange={(e)=>submit(e.currentTarget.form)}/>
          <Link to='/dashboard/all-employees'>Reset Search Values</Link>
        </Form>
    </div>
  )
}

export default SearchContainer