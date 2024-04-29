import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../../utils/customFetch';
export async function action({ params }) {
  try {
    await customFetch.delete(`/employees/${params.id}`);
    toast.success('Employee deleted successfully');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
  return redirect('/dashboard/all-employees');
}

function DeleteEmployee() {
  return (
    <div></div>
  )
}

export default DeleteEmployee;