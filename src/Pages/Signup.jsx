import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../Validation/SignupSchema';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../api/axios.js';

export default function Signup() {
  const navigate = useNavigate();

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

      await API.post('/api/auth/signup', data);

      setSeverity('success');
      setMessage('Registration Successful');
      setOpen(true);

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
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
        bgcolor: '#f5f5f5',
        py: 4,
      }}
    >
      <Card sx={{ maxWidth: 900, width: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h4" align="center" mb={3} sx={{pb:2}} fontWeight="bold">
            Student Registration
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Student Name"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
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
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="ECE">ECE</MenuItem>
                  <MenuItem value="EEE">EEE</MenuItem>
                  <MenuItem value="MECH">MECH</MenuItem>
                  <MenuItem value="BCA">BCA</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Register Number"
                  {...register('registerNumber')}
                  error={!!errors.registerNumber}
                  helperText={errors.registerNumber?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  {...register('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Age"
                  {...register('age')}
                  error={!!errors.age}
                  helperText={errors.age?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
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

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Father Name"
                  {...register('fatherName')}
                  error={!!errors.fatherName}
                  helperText={errors.fatherName?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Mother Name"
                  {...register('motherName')}
                  error={!!errors.motherName}
                  helperText={errors.motherName?.message}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Address"
                  {...register('address')}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Create Account'}
                </Button>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography align="center">
                  Already have an account?{' '}
                  <Link component="button" onClick={() => navigate('/login')}>
                    Login
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
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
