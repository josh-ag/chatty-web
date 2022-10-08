import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Grid,
  Stack,
  Tooltip,
} from "@mui/material";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useGetProfileQuery } from "../../features/services/queries";
import { useEffect } from "react";
import { blue, deepPurple, grey, orange } from "@mui/material/colors";
import {
  AccountCircleOutlined,
  Edit,
  EditOutlined,
  EmailOutlined,
  MapOutlined,
  PersonOutline,
  PersonRounded,
  PhoneOutlined,
} from "@mui/icons-material";

const ProfileScreen = () => {
  const loginId = localStorage.getItem("loginId");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProfileQuery();

  useEffect(() => {
    if (error?.originalStatus === 401 || error?.data === "Unauthorized") {
      localStorage.removeItem("token");
      localStorage.removeItem("loginId");

      navigate("/login");
    }
  });

  if (!token || !loginId) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "auto",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: grey[500],
            fontSize: 16,
            textAlign: "center",
            mb: 4,
          }}
        >
          Loading....
        </Typography>
        <CircularProgress color="primary" size={27} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h5"
        sx={{
          color: grey[500],
          fontSize: 16,
          textAlign: "center",
          mb: 4,
        }}
      >
        Something went wrong...
      </Typography>
    );
  }

  return (
    <Grid
      container
      sx={{ width: "100%", alignItems: "stretch", p: 1 }}
      spacing={1}
    >
      <Grid item xs={12} sm={11} md={6}>
        <Card
          elevation={0}
          sx={{
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            bgcolor: blue[50],
          }}
        >
          <CardMedia
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 250,
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                color: grey[100],
                border: `2px solid ${deepPurple[400]}`,
                fontSize: 27,
              }}
            >
              {data?.user.username.substr(0, 1).toUpperCase()}
            </Avatar>
            <Tooltip title="Edit Profile" arrow={true}>
              <IconButton
                sx={(theme) => ({
                  mt: theme.spacing(6),
                  background: orange[400],
                  "&:hover": {
                    bgcolor: orange[300],
                  },
                })}
                size="small"
                component={Link}
                to={`/profile/edit/${data.user?._id}`}
              >
                <Edit sx={{ color: grey[700] }} fontSize="small" />
              </IconButton>
            </Tooltip>
          </CardMedia>
          <Typography
            variant="h5"
            sx={{ mb: 4, textAlign: "center", color: grey[700] }}
          >
            Bios: {data?.user.bios}
          </Typography>
          <CardContent
            sx={{
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              bgcolor: grey[100],
              pt: 4,
            }}
          >
            <Paper
              sx={{
                mb: 1,
                p: 2,
                boxShadow: `0px 0px 2px ${grey[400]}`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: grey[500], fontSize: 16 }}
              >
                Firstname
              </Typography>

              <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
                <PersonRounded sx={{ color: blue["A100"] }} />
                <Typography
                  variant="h5"
                  sx={{ color: grey[600], mt: 1, fontSize: 18 }}
                >
                  {data?.user.firstname}
                </Typography>
              </Stack>
            </Paper>

            <Paper sx={{ mb: 2, p: 2, boxShadow: `0px 0px 2px ${grey[400]}` }}>
              <Typography
                variant="subtitle2"
                sx={{ color: grey[500], fontSize: 16 }}
              >
                Lastname
              </Typography>
              <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
                <PersonOutline sx={{ color: blue["A100"] }} />
                <Typography
                  variant="h5"
                  sx={{ color: grey[600], mt: 1, fontSize: 18 }}
                >
                  {data?.user.lastname}
                </Typography>
              </Stack>
            </Paper>

            <Paper sx={{ mb: 2, p: 2, boxShadow: `0px 0px 2px ${grey[400]}` }}>
              <Typography
                variant="subtitle2"
                sx={{ color: grey[500], fontSize: 16 }}
              >
                Username
              </Typography>
              <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
                <AccountCircleOutlined sx={{ color: blue["A100"] }} />
                <Typography
                  sx={{ color: grey[600], fontSize: 18 }}
                  variant="h5"
                >
                  {data?.user.username}
                </Typography>
              </Stack>
            </Paper>

            <Paper sx={{ mb: 2, p: 2, boxShadow: `0px 0px 2px ${grey[400]}` }}>
              <Typography
                variant="subtitle2"
                sx={{ color: grey[500], fontSize: 16 }}
              >
                Email
              </Typography>

              <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
                <EmailOutlined sx={{ color: blue["A100"] }} />
                <Typography
                  sx={{ color: grey[600], mt: 2, fontSize: 18 }}
                  variant="h5"
                >
                  {data?.user.email}
                </Typography>
              </Stack>
            </Paper>
            <Paper sx={{ mb: 2, p: 2, boxShadow: `0px 0px 2px ${grey[400]}` }}>
              <Typography
                variant="subtitle2"
                sx={{ color: grey[500], fontSize: 16 }}
              >
                Phone
              </Typography>

              <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
                <PhoneOutlined sx={{ color: blue["A100"] }} />
                <Typography
                  sx={{ color: grey[600], mt: 2, fontSize: 18 }}
                  variant="h5"
                >
                  {data?.user?.phone}
                </Typography>
              </Stack>
            </Paper>
            <Paper sx={{ mb: 2, p: 2, boxShadow: `0px 0px 2px ${grey[400]}` }}>
              <Typography
                variant="subtitle2"
                sx={{ color: grey[500], fontSize: 16 }}
              >
                Country
              </Typography>
              <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
                <MapOutlined sx={{ color: blue["A100"] }} />
                <Typography
                  sx={{ color: grey[600], mt: 2, fontSize: 18 }}
                  variant="h5"
                >
                  {data?.user?.country}
                </Typography>
              </Stack>
            </Paper>

            <Paper sx={{ mb: 2, p: 2, boxShadow: `0px 0px 2px ${grey[400]}` }}>
              <Typography
                variant="subtitle2"
                sx={{ color: grey[500], fontSize: 16 }}
              >
                Bios
              </Typography>
              <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
                <EditOutlined sx={{ color: blue["A100"] }} />
                <Typography
                  sx={{ color: grey[600], mt: 2, fontSize: 18 }}
                  variant="h5"
                >
                  {data?.user?.bios}
                </Typography>
              </Stack>
            </Paper>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileScreen;
