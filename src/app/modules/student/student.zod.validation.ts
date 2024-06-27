import { z } from 'zod';

const userNameValidatonZodSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First name can't be more than 20 characters")
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name must be capitalized',
      },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .trim()
    .max(20, "Last name can't be more than 20 characters"),
});

const guardianValidatonZodSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  fatherContactNo: z.string().nonempty('Father contact number is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
  motherContactNo: z.string().nonempty('Mother contact number is required'),
});

const localGuardianValidatonZodSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  occupation: z.string().nonempty('Local guardian occupation is required'),
  contactNo: z.string().nonempty('Local guardian contact number is required'),
  address: z.string().nonempty('Local guardian address is required'),
});

const studentValidatonZodSchema = z.object({
  id: z.string().nonempty('ID is required'),
  name: userNameValidatonZodSchema,
  gender: z.enum(['male', 'female'], {
    invalid_type_error: 'Gender is required',
  }),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Invalid email address'),
  contactNo: z.string().nonempty('Contact number is required'),
  emergencyContactNo: z
    .string()
    .nonempty('Emergency contact number is required'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    invalid_type_error: 'Blood group is required',
  }),
  presentAddress: z.string().nonempty('Present address is required'),
  permanentAddress: z.string().nonempty('Permanent address is required'),
  guardian: guardianValidatonZodSchema,
  localGuardian: localGuardianValidatonZodSchema,
  profileImg: z.string().url().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default studentValidatonZodSchema;
