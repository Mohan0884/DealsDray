import {Router} from 'express';

const router=Router();
import { getAllEmployees,getSingleEmployee,editEmployee,deleteEmployee,createEmployee } from '../controllers/employeeController.js';
import { validateEmployeeInput } from '../middleware/validationMiddleware.js';
router.route('/').get(getAllEmployees).post(validateEmployeeInput,createEmployee);
router.route('/:id').get(getSingleEmployee).patch(validateEmployeeInput,editEmployee).delete(deleteEmployee);

export default router;