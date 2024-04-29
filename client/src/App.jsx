import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { action as registerAction } from './pages/Register';
import{action as loginAction} from './pages/Login';
import {action as addEmployeeAction} from './pages/AddEmployee'
import { loader as allEmployeesLoader} from './pages/AllEmployees'
import {loader as editEmployeeLoader} from './pages/EditEmployee'
import {action as editEmployeeAction} from './pages/EditEmployee'
import {action as deleteEmployeeAction} from './pages/DeleteEmployee'
import {AllEmployees} from './pages/AllEmployees'
import { Register,Dashboard,DashboardLayout,Login,AddEmployee,DeleteEmployee,EditEmployee,Error,Home } from './pages'
const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element:<Login/>,
        action:loginAction  
      },
      {
        path:'register',
        element:<Register/>,
        action:registerAction
      },
      { 
        path:'dashboard',
        element:<DashboardLayout/>,
        children:[
          {
            index:true,
            element:<Dashboard/>
          },
          {
            path:'all-employees',
            element:<AllEmployees/>,
            loader:allEmployeesLoader
          },
          {
            path:'add-employee',
            element:<AddEmployee/>,
            action:addEmployeeAction
          },
          {
            path:'edit-employee/:id',
            element:<EditEmployee/>,
            action:editEmployeeAction,
            loader:editEmployeeLoader
          },
          {
            path:'delete-employee/:id',
            element:<DeleteEmployee/>,
            action:deleteEmployeeAction
          }
        ]
      }
    ]
  },
  
])
function App() {
  

  return (
    <RouterProvider router={router}/>
  )
}

export default App
