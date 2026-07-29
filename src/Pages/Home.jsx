import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Each section gets its own accent color + icon so the dashboard reads as
// organized "departments" of information rather than one flat wall of cards.
const SECTION_THEME = {
  personal: { color: '#2563EB', bg: '#EFF4FF', icon: PersonIcon },
  family: { color: '#9333EA', bg: '#F6EEFE', icon: FamilyRestroomIcon },
  address: { color: '#0D9488', bg: '#E9FBF8', icon: HomeIcon },
  academic: { color: '#D97706', bg: '#FFF6E8', icon: MenuBookIcon },
  stats: { color: '#16A34A', bg: '#EEFBF1', icon: BarChartIcon },
  notify: { color: '#E11D48', bg: '#FFEEF1', icon: NotificationsActiveIcon },
};

function SectionCard({ theme, title, children }) {
  const Icon = theme.icon;
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(15, 23, 42, 0.08)',
        },
      }}
    >
      <Box
        sx={{
          height: 4,
          width: '100%',
          background: `linear-gradient(90deg, ${theme.color}, ${theme.color}99)`,
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: theme.bg,
              color: theme.color,
            }}
          >
            <Icon fontSize="small" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A' }}>
            {title}
          </Typography>
        </Stack>
        {children}
      </CardContent>
    </Card>
  );
}

function InfoRow({ label, value }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        py: 1,
        borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
        '&:last-of-type': { borderBottom: 'none' },
      }}
    >
      <Typography variant="body2" sx={{ color: '#64748B' }}>
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: '#0F172A', textAlign: 'right' }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('student');

    if (!data) {
      navigate('/login');
      return;
    }

    setStudent(JSON.parse(data));
    setLoading(false);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('student');
    navigate('/login');
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#F8FAFC',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!student) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background:
            'linear-gradient(90deg, #4338CA 0%, #6D28D9 55%, #DB2777 100%)',
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <SchoolIcon sx={{ mr: 1.5 }} />
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 0.3 }}
          >
            Student Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={logout}
            startIcon={<LogoutIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: 'rgba(255,255,255,0.12)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: { xs: 3, md: 5 } }} maxWidth="xl">
        {/* Profile banner */}
        <Card
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: 'hidden',
            color: '#fff',
            background:
              'linear-gradient(120deg, #4338CA 0%, #7C3AED 50%, #DB2777 100%)',
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 3,
              p: { xs: 3, md: 4 },
            }}
          >
            <Avatar
              sx={{
                width: 84,
                height: 84,
                fontSize: 34,
                fontWeight: 700,
                bgcolor: 'rgba(255,255,255,0.18)',
                border: '3px solid rgba(255,255,255,0.4)',
              }}
            >
              {student.name.charAt(0).toUpperCase()}
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {student.name}
              </Typography>
              <Typography sx={{ opacity: 0.9, mb: 1 }}>
                {student.department}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                  label={student.registerNumber}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label="Semester 6"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label="Placement Eligible"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* Section cards */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <SectionCard
              theme={SECTION_THEME.personal}
              title="Personal Details"
            >
              <InfoRow label="Name" value={student.name} />
              <InfoRow label="Age" value={student.age} />
              <InfoRow label="DOB" value={student.dob} />
              <InfoRow label="Email" value={student.email} />
              <InfoRow label="Phone" value={student.phone} />
            </SectionCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <SectionCard theme={SECTION_THEME.family} title="Family Details">
              <InfoRow label="Father" value={student.fatherName} />
              <InfoRow label="Mother" value={student.motherName} />
              <InfoRow label="Department" value={student.department} />
              <InfoRow label="Register No" value={student.registerNumber} />
            </SectionCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <SectionCard theme={SECTION_THEME.address} title="Address">
              <Typography
                variant="body2"
                sx={{ color: '#334155', lineHeight: 1.7 }}
              >
                {student.address}
              </Typography>
            </SectionCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <SectionCard
              theme={SECTION_THEME.academic}
              title="Academic Information"
            >
              <InfoRow label="Attendance" value="92%" />
              <InfoRow label="Semester" value="6" />
              <InfoRow label="CGPA" value="8.75" />
              <InfoRow label="Credits" value="98" />
            </SectionCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <SectionCard theme={SECTION_THEME.stats} title="Statistics">
              <InfoRow label="Subjects" value="8" />
              <InfoRow label="Assignments" value="14" />
              <InfoRow label="Projects" value="4" />
              <InfoRow label="Placement" value="Eligible" />
            </SectionCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <SectionCard theme={SECTION_THEME.notify} title="Notifications">
              <Stack spacing={1.2}>
                <Typography variant="body2" sx={{ color: '#334155' }}>
                  • Semester Exam Next Month
                </Typography>
                <Typography variant="body2" sx={{ color: '#334155' }}>
                  • Internal Marks Published
                </Typography>
                <Typography variant="body2" sx={{ color: '#334155' }}>
                  • Placement Registration Open
                </Typography>
                <Typography variant="body2" sx={{ color: '#334155' }}>
                  • Library Dues: Nil
                </Typography>
              </Stack>
            </SectionCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}