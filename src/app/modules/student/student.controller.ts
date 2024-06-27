import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';
import studentValidationSchema from './student.joi.validation';
import studentValidatonZodSchema from './student.zod.validation';
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // const { value, error } = studentValidationSchema.validate(studentData);
    const validationStudentZodData =
      studentValidatonZodSchema.parse(studentData);
    const result = await StudentServices.createStudentIntoDB(
      validationStudentZodData,
    );
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });

    // if (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: 'Something went wrong!',
    //         error: error.details,
    //     });
    // }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentData();
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getStudents,
  getSingleStudent,
};
