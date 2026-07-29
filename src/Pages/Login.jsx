// import {
//   Alert,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Link,
//   Snackbar,
//   TextField,
//   Typography,
// } from '@mui/material';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { loginSchema } from '../validation/loginSchema';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import API from '../api/axios';

// export default function Login() {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [severity, setSeverity] = useState('success');
//   const [message, setMessage] = useState('');

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);

//       const res = await API.post('/auth/login', data);

//       localStorage.setItem('token', res.data.token);

//       setSeverity('success');
//       setMessage('Login Successful');
//       setOpen(true);

//       setTimeout(() => {
//         navigate('/home');
//       }, 1000);
//     } catch (err) {
//       setSeverity('error');
//       setMessage(err.response?.data?.message || 'Invalid Credentials');
//       setOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         bgcolor: '#f5f5f5',
//       }}
//     >
//       <Card sx={{ width: 420 }}>
//         <CardContent>
//           <Typography variant="h4" align="center" fontWeight="bold" mb={3}>
//             Student Login
//           </Typography>

//           <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//             <TextField
//               fullWidth
//               label="Register Number"
//               margin="normal"
//               {...register('registerNumber')}
//               error={!!errors.registerNumber}
//               helperText={errors.registerNumber?.message}
//             />

//             <TextField
//               fullWidth
//               type="password"
//               label="Password"
//               margin="normal"
//               {...register('password')}
//               error={!!errors.password}
//               helperText={errors.password?.message}
//             />

//             <Button
//               fullWidth
//               variant="contained"
//               size="large"
//               sx={{ mt: 3 }}
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? 'Logging In...' : 'Login'}
//             </Button>

//             <Typography mt={2} align="center">
//               Don't have an account?{' '}
//               <Link component="button" onClick={() => navigate('/signup')}>
//                 Signup
//               </Link>
//             </Typography>
//           </Box>
//         </CardContent>
//       </Card>

//       <Snackbar
//         open={open}
//         autoHideDuration={3000}
//         onClose={() => setOpen(false)}
//       >
//         <Alert severity={severity}>{message}</Alert>
//       </Snackbar>
//     </Box>
//   );
// }

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
import { loginSchema } from '../validation/loginSchema';
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

      const res = await API.post('/auth/login', data);

      // Store student information
      localStorage.setItem('student', JSON.stringify(res.data.student));

      setSeverity('success');
      setMessage(res.data.message || 'Login Successful');
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <Card
        sx={{
          width: 420,
          p: 2,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography variant="h4" align="center" fontWeight="bold" mb={3}>
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
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Login'}
            </Button>

            <Typography align="center" mt={2}>
              Don't have an account?{' '}
              <Link component="button" onClick={() => navigate('/signup')}>
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
        <Alert severity={severity} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}