
import Employee from '../models/employeeModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

 //get all employees
 export const getAllEmployees=async (req, res) => {
  const {search,sort}=req.query;
  const queryObject={

  }
  if(search){
    queryObject.$or=[
      {name:{$regex:search,$options:'i'}},
      {designation:{$regex:search,$options:'i'}},
      {gender:{$regex:search,$options:'i'}},
      {email:{$regex:search,$options:'i'}},
      {mobile:{$regex:search,$options:'i'}},
    ];
  }
  const sortOptions={
    nameAsc:'name',
    nameDesc:'-name',
    emailAsc:'email',
    emailDesc:'-email',
    _idAsc:'_id',
    _idDesc:'-_id',
    oldest:'createdAt',
    newest:'-createdAt'
  }
  const sortKey=sortOptions[sort] || sortOptions.oldest;

  //setup pagination
  const page=Number(req.query.page) || 1;
  const limit=Number(req.query.limit) || 10;
  const skip=(page-1)*limit;

  const employees=await Employee.find(queryObject).sort(sortKey).skip(skip).limit(limit);
  const totalEmployees=await Employee.countDocuments(queryObject);
  const numOfPages=Math.ceil(totalEmployees/limit);
    res.status(StatusCodes.OK).json({ numOfPages,currentPage:page,totalEmployees,employees });
  };
// CREATE EMPLOYEE

export const createEmployee=async (req, res) => {
    const { image,name,email,mobile,designation,gender,course,createdAt } = req.body;
    // if (!image || !name || !email || !mobile || !designation || !gender || !course || !createdAt) {
    //   return res.status(400).json({ msg: 'please provide All Details' });
    // }
    // const id = nanoid(10);
    // const employee = { id, image,name,email,mobile,designation,gender,course,createdAt};
    // employees.push(employee);
    // res.status(200).json({ employees });
    try {
      const emp=await Employee.findOne({email});
      if(emp){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'email already exists'});
      }
      const employee=await Employee.create({ image,name,email,mobile,designation,gender,course,createdAt });
      res.status(StatusCodes.CREATED).json({employee});
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
  };
  
  // GET SINGLE EMPLOYEE
  
  export const getSingleEmployee=async (req, res) => {
    const { id } = req.params;
  const employee = await Employee.findById(id);
  if (!employee) {
    throw new NotFoundError( `no employee with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ employee });
  };
  
  // EDIT EMPLOYEE
  
  export const editEmployee=async (req, res) => {
    const { id } = req.params;
  const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedEmployee) {
    throw new NotFoundError(`no employee with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ employee: updatedEmployee });
  };
  
  // DELETE EMPLOYEE
  
 export const deleteEmployee=async (req, res) => {
  const { id } = req.params;
  const removedEmployee = await Employee.findByIdAndDelete(id);

  if (!removedEmployee) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `no employee with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ job: removedEmployee });
  };

