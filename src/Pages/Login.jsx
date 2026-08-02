import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validation/loginSchema.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../api/axios';

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await API.post('/login', data);

      setSeverity('success');
      setMessage(res.data.message);
      setOpen(true);

      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (err) {
      setSeverity('error');
      setMessage(
        err.response?.data?.message || 'Invalid Register Number or Password'
      );
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      background: '#ffffff',
      borderRadius: 2,
      transition: 'all 0.25s ease',
      '& fieldset': {
        borderColor: '#e5e7eb',
      },
      '&:hover fieldset': {
        borderColor: '#a5b4fc',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4f46e5',
        borderWidth: '2px',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#6b7280',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#4f46e5',
    },
    '& .MuiFormHelperText-root': {
      marginLeft: 0,
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f0f2f5',
        px: 2,
        py: 4,
      }}
    >
      <Card
        sx={{
          width: { xs: '100%', sm: 460 },
          p: 2,
          borderRadius: 3,
          background: '#ffffff',
          boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
          border: '1px solid #e5e7eb',
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            mb={3}
            sx={{ color: '#111827' }}
          >
            Student Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Register Number"
              margin="normal"
              {...register('registerNumber')}
              error={!!errors.registerNumber}
              helperText={errors.registerNumber?.message}
              sx={textFieldSx}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={textFieldSx}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.2,
                borderRadius: 2,
                fontWeight: 700,
                bgcolor: '#4f46e5',
                '&:hover': {
                  bgcolor: '#4338ca',
                },
              }}
            >
              {loading ? 'Logging In...' : 'Login'}
            </Button>

            <Typography align="center" sx={{ color: '#6b7280',mt:2 }}>
              Don't have an account?{' '}
              <Link
                component="button"
                onClick={() => navigate('/signup')}
                sx={{
                  color: '#4f46e5',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Signup
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity={severity}
          onClose={() => setOpen(false)}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}