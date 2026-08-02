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
  // Grid,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import Masonry from '@mui/lab/Masonry';
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
  emergency: {
    color: '#16A34A',
    bg: '#EEFBF1',
    icon: BarChartIcon,
  },
  notify: {
    color: '#E11D48',
    bg: '#FFEEF1',
    icon: NotificationsActiveIcon,
  },
  stats: {
    color: '#16A34A',
    bg: '#EEFBF1',
    icon: BarChartIcon,
  },
};

function SectionCard({ theme, title, children }) {
  const Icon = theme.icon;

  return (
    <Card
      elevation={0}
      sx={{
        height: 'fit-content',
        borderRadius: 3,
        border: '1px solid rgba(15,23,42,.08)',
        transition: '.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(15,23,42,.08)',
        },
      }}
    >
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg,${theme.color},${theme.color}99)`,
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

function InfoRow({ label, value }) {
  return (
    <Box
      sx={{
        py: 2,
        borderBottom: '1px solid rgba(15,23,42,.06)',
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      <Stack direction="row">
        <Typography
          sx={{
            width: 140,
            color: '#64748B',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            width: 20,
            textAlign: 'center',
            color: '#94A3B8',
          }}
        >
          :
        </Typography>

        <Typography
          sx={{
            flex: 1,
            fontWeight: 600,
            color: '#0F172A',
            fontSize: 14,
            wordBreak: 'break-word',
          }}
        >
          {value || '-'}
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
        const response = await API.get('/profile');
        setStudent(response.data.student);
      } catch (err) {
        console.log(err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [navigate]);

  const logout = async () => {
    await API.post('/logout');
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
              {student.fullName?.charAt(0)?.toUpperCase() || 'S'}
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" fontWeight={700}>
                {student.fullName}
              </Typography>

              <Typography sx={{ opacity: 0.9, mb: 1 }}>
                {student.course} • {student.department}
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
                  label={`Semester ${student.semester}`}
                  sx={{
                    bgcolor: 'rgba(255,255,255,.2)',
                    color: '#fff',
                  }}
                />

                <Chip
                  label={`Year ${student.year}`}
                  sx={{
                    bgcolor: 'rgba(255,255,255,.2)',
                    color: '#fff',
                  }}
                />
              </Stack>
            </Box>
          </CardContent>
        </Card>

        <Masonry
          columns={{
            xs: 1,
            sm: 2,
            lg: 3,
          }}
          spacing={3}
        >
          {/* Personal Details */}
          <SectionCard theme={SECTION_THEME.personal} title="Personal Details">
            <InfoRow label="Full Name" value={student.fullName} />
            <InfoRow label="Gender" value={student.gender} />
            <InfoRow label="Date of Birth" value={student.dob?.split('T')[0]} />
            <InfoRow label="Email" value={student.email} />
            <InfoRow label="Phone" value={student.phone} />
            <InfoRow label="Aadhaar" value={student.aadhaar} />
            <InfoRow label="PAN" value={student.pannumber} />
            <InfoRow label="Blood Group" value={student.bloodGroup} />
          </SectionCard>
          {/* Family Information */}
          <SectionCard theme={SECTION_THEME.family} title="Family Details">
            <InfoRow label="Father" value={student.fatherName} />
            <InfoRow label="Occupation" value={student.fatherOccupation} />
            <InfoRow label="Phone" value={student.fatherPhone} />

            <InfoRow label="Mother" value={student.motherName} />
            <InfoRow label="Occupation" value={student.motherOccupation} />
            <InfoRow label="Phone" value={student.motherPhone} />

            <InfoRow label="Guardian" value={student.guardianName} />
            <InfoRow
              label="Relationship"
              value={student.guardianRelationship}
            />
            <InfoRow label="Guardian Phone" value={student.guardianPhone} />

            <InfoRow label="Family Income" value={student.familyIncome} />

            <SectionCard
              theme={SECTION_THEME.emergency}
              title="Emergency Contact"
            >
              <InfoRow label="Contact Name" value={student.emergencyName} />

              <InfoRow label="Relationship" value={student.relationship} />

              <InfoRow label="Phone" value={student.emergencyPhone} />
            </SectionCard>
          </SectionCard>
          {/* Academics Details */}
          <SectionCard
            theme={SECTION_THEME.academic}
            title="Academic Information"
          >
            <InfoRow label="Register No" value={student.registerNumber} />

            <InfoRow label="Department" value={student.department} />

            <InfoRow label="Course" value={student.course} />

            <InfoRow label="Year" value={student.year} />

            <InfoRow label="Semester" value={student.semester} />

            <InfoRow label="Qualification" value={student.qualification} />

            <InfoRow label="School / College" value={student.schoolName} />

            <InfoRow label="Board / University" value={student.board} />

            <InfoRow label="Marks" value={student.marks} />

            <InfoRow
              label="Admission Date"
              value={student.admissionDate?.split('T')[0]}
            />

            <InfoRow label="Attendance" value="92%" />

            <InfoRow label="Semester" value="6" />

            <InfoRow label="CGPA" value="8.75" />

            <InfoRow label="Credits" value="98" />
          </SectionCard>
          {/* Address Details */}
          <SectionCard theme={SECTION_THEME.address} title="Permanent Address">
            <InfoRow label="Plot" value={student.permanentPlot} />

            <InfoRow label="Street" value={student.permanentStreet} />

            <InfoRow label="Area" value={student.permanentArea} />

            <InfoRow label="District" value={student.permanentdistrict} />

            <InfoRow label="State" value={student.permanentState} />

            <InfoRow label="Pincode" value={student.permanentPincode} />
          </SectionCard>
          {/* Statistics Details */}
          <SectionCard theme={SECTION_THEME.stats} title="Statistics">
            <InfoRow label="Subjects" value="8" />
            <InfoRow label="Assignments" value="14" />
            <InfoRow label="Projects" value="4" />
            <InfoRow label="Placement" value="Eligible" />
          </SectionCard>
          {/* Notification Details */}
          <SectionCard theme={SECTION_THEME.notify} title="Notifications">
            <Stack spacing={2}>
              <Typography>• Welcome to the Student Dashboard.</Typography>

              <Typography>• Keep your personal information updated.</Typography>

              <Typography>
                • Verify your academic details before each semester.
              </Typography>

              <Typography>
                • Contact the administration if any information is incorrect.
              </Typography>
            </Stack>
          </SectionCard>
        </Masonry>
      </Container>
    </Box>
  );
}
