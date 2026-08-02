import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
  Link,
} from '@mui/material';

import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HomeIcon from '@mui/icons-material/Home';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LockIcon from '@mui/icons-material/Lock';

import API from '../api/axios.js';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../Validation/signupSchema.js';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const districts = [
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Tiruchirappalli',
    'Salem',
    'Tirunelveli',
    'Erode',
    'Vellore',
    'Thoothukudi',
    'Thanjavur',
    'Dindigul',
    'Kanchipuram',
    'Cuddalore',
    'Nagapattinam',
    'Virudhunagar',
  ];

  const states = [
    'Tamil Nadu',
    'Kerala',
    'Karnataka',
    'Andhra Pradesh',
    'Telangana',
    'Maharashtra',
    'Gujarat',
    'Rajasthan',
    'Uttar Pradesh',
    'West Bengal',
  ];

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await API.post('/signup', data);

      setSeverity('success');
      setMessage('Registration Successful');
      setOpen(true);

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      console.log('Full Error:', err.response?.data);

      console.log('Validation Errors:', err.response?.data?.errors);

      setSeverity('error');
      setMessage(err.response?.data?.message || 'Registration Failed');
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f0f2f5',
        py: 4,
      }}
    >
      <Card
        sx={{
          maxWidth: 1100,
          width: '100%',
          p: 2,

          background: '#ffffff',
          borderRadius: 3,
          boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
          border: '1px solid #e5e7eb',
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
                color: '#fff',
                borderRadius: 4,
                p: 5,
                mb: 5,
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(37,99,235,0.25)',
              }}
            >
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  bgcolor: '#fff',
                  color: '#2563EB',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <SchoolIcon sx={{ fontSize: 50 }} />
              </Avatar>

              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  fontSize: {
                    xs: '2rem',
                    md: '2.6rem',
                  },
                }}
              >
                Student Registration
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  opacity: 0.9,
                  fontSize: {
                    xs: '0.95rem',
                    md: '1.1rem',
                  },
                }}
              >
                Complete the registration form with your personal, academic and
                family information.
              </Typography>
            </Box>
            {/* Personal Details Card */}
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 5,
                mb: 3,
                color: '#315dd8',
                borderBottom: '2px solid #E5E7EB',
                pb: 1,
              }}
            >
              <PersonIcon />
              Personal Details
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  label="Full Name"
                  fullWidth
                  {...register('fullName')}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  {...register('dob')}
                  error={!!errors.dob}
                  helperText={errors.dob?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  select
                  label="Gender"
                  fullWidth
                  {...register('gender')}
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  label="Email Address"
                  fullWidth
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  label="Aadhaar Number"
                  fullWidth
                  {...register('aadhaar')}
                  error={!!errors.aadhaar}
                  helperText={errors.aadhaar?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  select
                  label="Blood Group"
                  fullWidth
                  {...register('bloodGroup')}
                  error={!!errors.bloodGroup}
                  helperText={errors.bloodGroup?.message}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  label="PAN Number"
                  fullWidth
                  {...register('pannumber')}
                  error={!!errors.pannumber}
                  helperText={errors.pannumber?.message}
                />
              </Grid>
            </Grid>
            {/* Academic Details Card*/}
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 5,
                mb: 3,
                color: '#315dd8',
                borderBottom: '2px solid #E5E7EB',
                pb: 1,
              }}
            >
              <SchoolIcon />
              Academic Details
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Register Number"
                  {...register('registerNumber')}
                  error={!!errors.registerNumber}
                  helperText={errors.registerNumber?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  select
                  label="Department"
                  defaultValue=""
                  {...register('department')}
                  error={!!errors.department}
                  helperText={errors.department?.message}
                >
                  <MenuItem value="CSE">CSE</MenuItem>
                  <MenuItem value="EEE">EEE</MenuItem>
                  <MenuItem value="MECH">MEC</MenuItem>
                  <MenuItem value="BCA">BCA</MenuItem>
                  <MenuItem value="BCA">BSC</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Course"
                  {...register('course')}
                  error={!!errors.course}
                  helperText={errors.course?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Year"
                  {...register('year')}
                  error={!!errors.year}
                  helperText={errors.year?.message}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="1">1st Year</MenuItem>
                  <MenuItem value="2">2nd Year</MenuItem>
                  <MenuItem value="3">3rd Year</MenuItem>
                  <MenuItem value="4">4th Year</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Semester"
                  {...register('semester')}
                  error={!!errors.semester}
                  helperText={errors.semester?.message}
                >
                  <MenuItem value="">Select</MenuItem>
                  {[
                    'One',
                    'Two',
                    'Three',
                    'Four',
                    'Five',
                    'Six',
                    'Seven',
                    'Eight',
                  ].map((sem) => (
                    <MenuItem key={sem} value={sem}>
                      Semester {sem}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Previous Qualification"
                  {...register('qualification')}
                  error={!!errors.qualification}
                  helperText={errors.qualification?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="School / College Name"
                  {...register('schoolName')}
                  error={!!errors.schoolName}
                  helperText={errors.schoolName?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Board / University"
                  {...register('board')}
                  error={!!errors.board}
                  helperText={errors.board?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="12th / Diploma Marks (%)"
                  {...register('marks')}
                  error={!!errors.marks}
                  helperText={errors.marks?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Admission Date"
                  type="date"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  {...register('admissionDate')}
                  error={!!errors.admissionDate}
                  helperText={errors.admissionDate?.message}
                />
              </Grid>
            </Grid>
            {/* Family Details Card*/}
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 5,
                mb: 3,
                color: '#315dd8',
                borderBottom: '2px solid #E5E7EB',
                pb: 1,
              }}
            >
              <FamilyRestroomIcon />
              Family Details
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Father Name"
                  {...register('fatherName')}
                  error={!!errors.fatherName}
                  helperText={errors.fatherName?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Father Occupation"
                  {...register('fatherOccupation')}
                  error={!!errors.fatherOccupation}
                  helperText={errors.fatherOccupation?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Father Phone"
                  {...register('fatherPhone')}
                  error={!!errors.fatherPhone}
                  helperText={errors.fatherPhone?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Mother Name"
                  {...register('motherName')}
                  error={!!errors.motherName}
                  helperText={errors.motherName?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Mother Occupation"
                  {...register('motherOccupation')}
                  error={!!errors.motherOccupation}
                  helperText={errors.motherOccupation?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Mother Phone"
                  {...register('motherPhone')}
                  error={!!errors.motherPhone}
                  helperText={errors.motherPhone?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Guardian Name"
                  {...register('guardianName')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Guardian Relationship"
                  {...register('guardianRelationship')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Guardian Phone"
                  {...register('guardianPhone')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Annual Family Income"
                  {...register('familyIncome')}
                  error={!!errors.familyIncome}
                  helperText={errors.familyIncome?.message}
                />
              </Grid>
            </Grid>
            {/* Permanent Address Card */}
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 5,
                mb: 3,
                color: '#315dd8',
                borderBottom: '2px solid #E5E7EB',
                pb: 1,
              }}
            >
              <HomeIcon />
              Permanent Address
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Plot No"
                  {...register('permanentPlot')}
                  error={!!errors.permanentPlot}
                  helperText={errors.permanentPlot?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Street"
                  {...register('permanentStreet')}
                  error={!!errors.permanentStreet}
                  helperText={errors.permanentStreet?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Area"
                  {...register('permanentArea')}
                  error={!!errors.permanentArea}
                  helperText={errors.permanentArea?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="District"
                  defaultValue=""
                  {...register('permanentdistrict')}
                  error={!!errors.permanentdistrict}
                  helperText={errors.permanentdistrict?.message}
                >
                  {districts.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="State"
                  {...register('permanentState')}
                  error={!!errors.permanentState}
                  helperText={errors.permanentState?.message}
                >
                  <MenuItem value="">Select State</MenuItem>

                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Pincode"
                  {...register('permanentPincode')}
                  error={!!errors.permanentPincode}
                  helperText={errors.permanentPincode?.message}
                />
              </Grid>
            </Grid>
            {/* Emergency Contact Card */}
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 5,
                mb: 3,
                color: '#315dd8',
                borderBottom: '2px solid #E5E7EB',
                pb: 1,
              }}
            >
              <ContactPhoneIcon />
              Emergency Contact
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Emergency Contact Name"
                  {...register('emergencyName')}
                  error={!!errors.emergencyName}
                  helperText={errors.emergencyName?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Relationship"
                  {...register('relationship')}
                  error={!!errors.relationship}
                  helperText={errors.relationship?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  fullWidth
                  label="Emergency Phone"
                  {...register('emergencyPhone')}
                  error={!!errors.emergencyPhone}
                  helperText={errors.emergencyPhone?.message}
                />
              </Grid>
            </Grid>
            {/* Account Security Card */}
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 5,
                mb: 3,
                color: '#315dd8',
                borderBottom: '2px solid #E5E7EB',
                pb: 1,
              }}
            >
              <LockIcon />
              Account Security
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  type="password"
                  fullWidth
                  label="Password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <TextField
                  type="password"
                  fullWidth
                  label="Confirm Password"
                  {...register('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mt={5}>
              <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    width: { xs: '100%', sm: 450 },
                    bgcolor: '#4f46e5',
                    '&:hover': {
                      bgcolor: '#4338ca',
                    },
                    py: 1.2,
                    mt: 2,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                  }}
                >
                  {loading ? 'Submitting...' : 'Create Account'}
                </Button>
              </Grid>

              <Grid size={{ xs: 12 }} sx={{ mt: 1.5 }}>
                <Typography align="center" sx={{ color: '#6b7280' }}>
                  Already have an account?{' '}
                  <Link
                    component="button"
                    onClick={() => navigate('/login')}
                    sx={{
                      color: '#4f46e5',
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    Login
                  </Link>
                </Typography>
              </Grid>
            </Box>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </Box>
  );
}