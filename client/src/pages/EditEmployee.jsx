
import { useLoaderData } from 'react-router-dom';
import { DESIGNATION, COURSE,GENDER } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormRow from '../components/FormRow';
import FormRowSelect from '../components/FormRowSelect';
import customFetch from '../../../utils/customFetch';
import '../styles/AddEmployee.css';
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/employees/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect('/dashboard/all-employees');
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/employees/${params.id}`, data);
    toast.success('Employee edited successfully');
    return redirect('/dashboard/all-employees');
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

function EditEmployee(){
  const {employee}=useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <div className='employee-main'>
        <Form method='post' className='employee-form'>
        <h4 className='form-title'>EDIT EMPLOYEE</h4>
        <div className='form-center'>
          <FormRow type='text' name='name' labelText='Name' defaultValue={employee.name}/>
          <FormRow type='email' name='email' labelText='Email' defaultValue={employee.email}/>
          <FormRow
            type='text'
            labelText='Mobile Number'
            name='mobile'
            defaultValue={employee.mobile}
          />
          <FormRowSelect labelText="Designation" name="designation" defaultValue={employee.designation} list={Object.values(DESIGNATION)} />
          <FormRowSelect labelText="Gender" name="gender" defaultValue={employee.gender} list={Object.values(GENDER)} />
          <FormRowSelect labelText="Course" name="course" defaultValue={employee.course} list={Object.values(COURSE)} />
          <FormRow type='emtextail' name='image' labelText='Image' defaultValue={employee.image}/>

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
export default EditEmployee;