import { z } from 'zod';

export const signupSchema = z
  .object({
    fullName: z.string().min(3, 'Full Name is required'),

    dob: z.string().min(1, 'Date of Birth is required'),

    gender: z.string().min(1, 'Select Gender'),

    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
        'Invalid email address'
      ),

    phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),

    aadhaar: z
      .string()
      .regex(/^[0-9]{12}$/, 'Aadhaar number must be 12 digits'),

    bloodGroup: z.string().min(1, 'Select Blood Group'),

    pannumber: z
      .string()
      .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN Number'),

    registerNumber: z
      .string()
      .trim()
      .min(5,'Minimum 5 Character Required ex: BSC018M'),

    department: z.string().min(1, 'Department is required'),

    course: z.string().min(1, 'Course is required'),

    year: z.string().min(1, 'Select Year'),

    semester: z.string().min(1, 'Select Semester'),

    qualification: z.string().min(1, 'Qualification is required'),

    schoolName: z.string().min(3, 'School Name is required'),

    board: z.string().min(2, 'Board is required'),

    marks: z.string().min(1, 'Marks are required'),

    admissionDate: z.string().min(1, 'Admission Date is required'),

    fatherName: z.string().min(3),

    fatherOccupation: z.string().min(2),

    fatherPhone: z.string().regex(/^[0-9]{10}$/),

    motherName: z.string().min(3),

    motherOccupation: z.string().min(2),

    motherPhone: z.string().regex(/^[0-9]{10}$/),

    guardianName: z.string().optional(),

    guardianRelationship: z.string().optional(),

    guardianPhone: z.string().optional(),

    familyIncome: z.string().min(1),

    permanentPlot: z.string().min(1, 'Plot Number is required'),

    permanentStreet: z.string().min(2, 'Street is required'),

    permanentArea: z.string().min(2, 'Area is required'),

    permanentdistrict: z.string().min(2, 'District is required'),

    permanentState: z.string().min(2, 'State is required'),

    permanentPincode: z
      .string()
      .regex(/^[0-9]{6}$/, 'Pincode must be 6 digits'),

    emergencyName: z.string().min(3, 'Emergency Contact Name is required'),

    relationship: z.string().min(2, 'Relationship is required'),

    emergencyPhone: z
      .string()
      .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),

    password: z
      .string()
      .min(5, 'Password must be at least 5 characters')
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one number, and one special character'
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );