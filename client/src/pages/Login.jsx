import React from 'react'
import Logo from '../components/Logo'
import FormRow from '../components/FormRow'
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../../utils/customFetch';
import '../styles/Login.css'
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const user=await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    localStorage.setItem('name',user.data.name);
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <div className='main-login'>
        <div className="logo">
        <Logo/>
        </div>
        <div className="forms">
          <Form className='form' method='POST'>
            <h4 className='login-text'>Login</h4>
            <FormRow type="email" name="email" labelText="Email" />
            <FormRow type="password" name="password" labelText="Password"/>
            <button type="submit" className='form-btn' disabled={isSubmitting}>{isSubmitting ? 'submitting...' : 'submit'}</button>
            <p>create an admin account? click <Link to='/register'>Register</Link></p>
          </Form>
        </div>
        
    </div>
  )
}

export default Login