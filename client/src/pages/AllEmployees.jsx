import { toast } from 'react-toastify';
import  EmployeeContainer  from '../components/EmployeeContainer';
import  SearchContainer  from '../components/SearchContainer';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import customFetch from '../../../utils/customFetch';
import '../styles/Employee.css'
export const loader = async ({ request }) => {
  const params=Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params);
  try {
    const { data } = await customFetch.get('/employees',{
      params,
    });
    return {
      data,searchValues:{...params}
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AllEmployeesContext=createContext();
export const AllEmployees = () => {
  const { data,searchValues } = useLoaderData();
  return (
    <AllEmployeesContext.Provider className='employees-main-main' value={{data,searchValues}}>
      <SearchContainer />
      <EmployeeContainer />
    </AllEmployeesContext.Provider>
  );
};
export const useAllEmployeesContext=()=>useContext(AllEmployeesContext);
