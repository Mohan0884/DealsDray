import React, { useState } from 'react'
import FormRow from '../components/FormRow'
import FormRowSelect from '../components/FormRowSelect'
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DESIGNATION,GENDER,COURSE } from '../../../utils/constants'
import customFetch from '../../../utils/customFetch.js';

import '../styles/AddEmployee.css'
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/employees', data);
    toast.success('Employee added successfully');
    return redirect('/dashboard/all-employees');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};



function AddEmployee() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const [image, setImage] = useState('');
  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  }

  return (
    <div className='employee-main'>
        <Form className='employee-form' method='post' >
        <h4 className='form-title'>ADD EMPLOYEE</h4>
        <div className='form-center'>
          <FormRow type='text' name='name' labelText='Name' />
          <FormRow type='email' name='email' labelText='Email'/>
          <FormRow
            type='text'
            labelText='Mobile Number'
            name='mobile'
          />
          <FormRowSelect labelText="Designation" name="designation" defaultValue={DESIGNATION.SALES} list={Object.values(DESIGNATION)} />
          <FormRowSelect labelText="Gender" name="gender" defaultValue={GENDER.MALE} list={Object.values(GENDER)} />
          <FormRowSelect labelText="Course" name="course" defaultValue={COURSE.BCA} list={Object.values(COURSE)} />
          <div>
            <label htmlFor="image">Image</label>
          <input onChange={convertToBase64}  type='file' accept='image/png/jpg' />
          <input type="text"  name='image' className='hidden' id='image' defaultValue={image}/>
          </div>

          <button
            type='submit'
            className='submit-btn'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </div>
  )
}

export default AddEmployee