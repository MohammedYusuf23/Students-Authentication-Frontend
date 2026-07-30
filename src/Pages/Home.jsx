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

// ---- Backend API client (Axios instance) ----
import API from '../api/axios';

const SECTION_THEME = {
  personal: {
    color: '#2563EB',
    bg: '#EFF4FF',
    icon: PersonIcon,
  },
  family: {
    color: '#9333EA',
    bg: '#F6EEFE',
    icon: FamilyRestroomIcon,
  },
  address: {
    color: '#0D9488',
    bg: '#E9FBF8',
    icon: HomeIcon,
  },
  academic: {
    color: '#D97706',
    bg: '#FFF6E8',
    icon: MenuBookIcon,
  },
  stats: {
    color: '#16A34A',
    bg: '#EEFBF1',
    icon: BarChartIcon,
  },
  notify: {
    color: '#E11D48',
    bg: '#FFEEF1',
    icon: NotificationsActiveIcon,
  },
};

function SectionCard({ theme, title, children }) {
  const Icon = theme.icon;

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 3,
        border: '1px solid rgba(15,23,42,0.08)',
        transition: '0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(15,23,42,0.08)',
        },
      }}
    >
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg, ${theme.color}, ${theme.color}99)`,
        }}
      />

      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: theme.bg,
              color: theme.color,
            }}
          >
            <Icon fontSize="small" />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#0F172A',
            }}
          >
            {title}
          </Typography>
        </Stack>

        {children}
      </CardContent>
    </Card>
  );
}

/* ---------- InfoRow (label : value layout) ---------- */

function InfoRow({ label, value }) {
  return (
    <Box
      sx={{
        py: 1.3,
        borderBottom: '1px solid rgba(15,23,42,0.06)',
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      <Stack direction="row" alignItems="center">
        {/* Label */}
        <Typography
          sx={{
            width: 130,
            color: '#64748B',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {label}
        </Typography>

        {/* Colon */}
        <Typography
          sx={{
            width: 20,
            textAlign: 'center',
            color: '#94A3B8',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          :
        </Typography>

        {/* Value */}
        <Typography
          sx={{
            flex: 1,
            color: '#0F172A',
            fontWeight: 600,
            fontSize: 14,
            wordBreak: 'break-word',
          }}
        >
          {value}
        </Typography>
      </Stack>
    </Box>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const registerNumber = localStorage.getItem('registerNumber');

        if (!registerNumber) {
          navigate('/login');
          return;
        }

        const response = await API.get(`/api/auth/profile/${registerNumber}`);

        setStudent(response.data.student);
      } catch (err) {
        console.error(err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('registerNumber');
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
            'linear-gradient(90deg,#4338CA 0%,#6D28D9 55%,#DB2777 100%)',
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <SchoolIcon sx={{ mr: 1.5 }} />

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
            }}
          >
            Student Dashboard
          </Typography>

          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={logout}
            sx={{
              bgcolor: 'rgba(255,255,255,.12)',
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,.22)',
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* Profile Banner */}
        <Card
          elevation={0}
          sx={{
            mb: 4,
            overflow: 'hidden',
            borderRadius: 4,
            color: '#fff',
            background:
              'linear-gradient(120deg,#4338CA 0%,#7C3AED 50%,#DB2777 100%)',
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Avatar
              sx={{
                width: 84,
                height: 84,
                fontSize: 34,
                bgcolor: 'rgba(255,255,255,.18)',
                border: '3px solid rgba(255,255,255,.4)',
              }}
            >
              {student.name.charAt(0).toUpperCase()}
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" fontWeight={700}>
                {student.name}
              </Typography>

              <Typography sx={{ opacity: 0.9, mb: 1 }}>
                {student.department}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                  label={student.registerNumber}
                  sx={{
                    bgcolor: 'rgba(255,255,255,.2)',
                    color: '#fff',
                  }}
                />

                <Chip
                  label="Semester 6"
                  sx={{
                    bgcolor: 'rgba(255,255,255,.2)',
                    color: '#fff',
                  }}
                />

                <Chip
                  label="Placement Eligible"
                  sx={{
                    bgcolor: 'rgba(255,255,255,.2)',
                    color: '#fff',
                  }}
                />
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* Cards */}
        <Grid container spacing={3}>
          {/* Personal */}
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

          {/* Family */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <SectionCard theme={SECTION_THEME.family} title="Family Details">
              <InfoRow label="Father" value={student.fatherName} />
              <InfoRow label="Mother" value={student.motherName} />
              <InfoRow label="Department" value={student.department} />
              <InfoRow label="Register No" value={student.registerNumber} />
            </SectionCard>
          </Grid>

          {/* Address */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <SectionCard theme={SECTION_THEME.address} title="Address">
              <Typography
                sx={{
                  color: '#334155',
                  lineHeight: 1.8,
                }}
              >
                {student.address}
              </Typography>
            </SectionCard>
          </Grid>

          {/* Academic */}
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

          {/* Statistics */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <SectionCard theme={SECTION_THEME.stats} title="Statistics">
              <InfoRow label="Subjects" value="8" />
              <InfoRow label="Assignments" value="14" />
              <InfoRow label="Projects" value="4" />
              <InfoRow label="Placement" value="Eligible" />
            </SectionCard>
          </Grid>

          {/* Notifications */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <SectionCard theme={SECTION_THEME.notify} title="Notifications">
              <Stack spacing={1.5}>
                <Typography>• Semester Exam Next Month</Typography>

                <Typography>• Internal Marks Published</Typography>

                <Typography>• Placement Registration Open</Typography>

                <Typography>• Library Dues: Nil</Typography>
              </Stack>
            </SectionCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
