import React from 'react'
import Logo from '../components/Logo'
import FormRow from '../components/FormRow'
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import customFetch from '../../../utils/customFetch';
import { toast } from 'react-toastify';
import '../styles/Login.css'
export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/auth/register', data);
      toast.success('registration successfull');
      return redirect('/');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
      return error;
    }
  };
  

function Register() {
    const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <div className='main-login'>
        <div className="logo">
        <Logo/>
        </div>
        <div className="forms">
        <Form className='form' method="POST">
            <h4 className='login-text'>Register</h4>
            <FormRow type="text" name="name" labelText="Name" />
            <FormRow type="email" name="email" labelText="Email" />

            <FormRow type="password" name="password" labelText="Password"/>
            <button type="submit" className='form-btn' disabled={isSubmitting}>{isSubmitting ? 'submitting...' : 'submit'}</button>
        </Form>
        </div>
    </div>
  )
}

export default Register