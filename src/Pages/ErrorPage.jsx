import { Box, Button, Container, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/Error';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg,#EEF2FF 0%,#F8FAFC 50%,#FCE7F3 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: '#fff',
            p: 6,
            borderRadius: 4,
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          }}
        >
          <ErrorOutlineIcon
            sx={{
              fontSize: 90,
              color: '#6366F1',
              mb: 2,
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              color: '#1E293B',
              fontSize: {
                xs: '70px',
                md: '90px',
              },
            }}
          >
            404
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mt: 1,
              color: '#334155',
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            sx={{
              color: '#64748B',
              mt: 2,
              mb: 4,
            }}
          >
            Sorry, the page you're looking for doesn't exist or has been moved.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/home')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(90deg,#4F46E5,#7C3AED)',
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
