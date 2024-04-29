import mongoose from 'mongoose';
import { DESIGNATION, GENDER, COURSE } from '../utils/constants.js';
const EmployeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile:String,
    
    designation: {
      type: String,
      enum: Object.values(DESIGNATION),
      default: DESIGNATION.HR,
    },
    gender: {
      type: String,
      enum:  Object.values(GENDER),
      default: GENDER.MALE,
    },
    course: {
      type: String,
      enum:  Object.values(COURSE),
      default: COURSE.BCA,
    },
    image:String,
  },
  { timestamps: true }
);

export default mongoose.model('Employee', EmployeeSchema);