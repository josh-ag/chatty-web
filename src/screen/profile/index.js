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
  Stack,
  Tooltip,
} from "@mui/material";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useGetProfileQuery } from "../../features/services/queries";
import { useEffect } from "react";
import { deepPurple, grey, orange } from "@mui/material/colors";
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
import header_image from "../../assets/bg.jpg";

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
          height: 300,
          background: grey[200],
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="primary" size={27} />
        <Typography
          variant="caption"
          sx={{
            color: grey[500],
            fontSize: 16,
            textAlign: "center",
            mt: 2,
          }}
        >
          Loading....
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          height: 300,
          background: grey[200],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          noWrap
        >
          Something went wrong...
        </Typography>
      </Box>
    );
  }

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardMedia
        image={header_image}
        sx={{
          width: "100%",
          height: 300,
        }}
      />

      <Paper
        sx={{
          width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
          marginTop: -12,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          background: "#B39CD0",
        }}
        elevation={0}
      >
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "#9B89B3",
              color: grey[100],
              border: `2px solid ${deepPurple[400]}`,
              fontSize: 27,
            }}
          >
            {data?.user.username.substr(0, 1).toUpperCase()}
          </Avatar>
          <Tooltip title="Edit Profile" arrow={true} placement="right-end">
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
              <Edit sx={{ color: grey[700] }} fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", color: grey[50] }}
          >
            Bios: <Typography variant="body1">{data?.user.bios}</Typography>
          </Typography>
        </Box>
      </Paper>

      <CardContent
        sx={{
          mt: 4,
          width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Paper
          sx={{
            width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
            mb: 2,
            p: 1,
            boxShadow: `0px 0px 2px ${grey[500]}`,
          }}
        >
          <Typography variant="body1" sx={{ color: grey[500], fontSize: 16 }}>
            Firstname
          </Typography>

          <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
            <PersonRounded sx={{ color: "#B39CD0" }} />
            <Typography
              variant="subtitle1"
              sx={{ color: grey[600], mt: 1, fontSize: 18 }}
              noWrap
            >
              {data?.user.firstname}
            </Typography>
          </Stack>
        </Paper>

        <Paper
          sx={{
            width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
            mb: 2,
            p: 1,
            boxShadow: `0px 0px 2px ${grey[500]}`,
          }}
        >
          <Typography variant="body1" sx={{ color: grey[500], fontSize: 16 }}>
            Lastname
          </Typography>
          <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
            <PersonOutline sx={{ color: "#B39CD0" }} />
            <Typography
              variant="subtitle1"
              sx={{ color: grey[600], mt: 1, fontSize: 18 }}
              noWrap
            >
              {data?.user.lastname}
            </Typography>
          </Stack>
        </Paper>

        <Paper
          sx={{
            width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
            mb: 2,
            p: 1,
            boxShadow: `0px 0px 2px ${grey[500]}`,
          }}
        >
          <Typography variant="body1" sx={{ color: grey[500], fontSize: 16 }}>
            Username
          </Typography>
          <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
            <AccountCircleOutlined sx={{ color: "#B39CD0" }} />
            <Typography
              sx={{ color: grey[600], fontSize: 18 }}
              variant="subtitle1"
              noWrap
            >
              {data?.user.username}
            </Typography>
          </Stack>
        </Paper>

        <Paper
          sx={{
            width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
            mb: 2,
            p: 1,
            boxShadow: `0px 0px 2px ${grey[500]}`,
          }}
        >
          <Typography variant="body1" sx={{ color: grey[500], fontSize: 16 }}>
            Email
          </Typography>

          <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
            <EmailOutlined sx={{ color: "#B39CD0" }} />
            <Typography
              sx={{ color: grey[600], mt: 2, fontSize: 18 }}
              variant="subtitle1"
              noWrap
            >
              {data?.user.email}
            </Typography>
          </Stack>
        </Paper>
        <Paper
          sx={{
            width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
            mb: 2,
            p: 1,
            boxShadow: `0px 0px 2px ${grey[500]}`,
          }}
        >
          <Typography variant="body1" sx={{ color: grey[500], fontSize: 16 }}>
            Phone
          </Typography>

          <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
            <PhoneOutlined sx={{ color: "#B39CD0" }} />
            <Typography
              sx={{ color: grey[600], mt: 2, fontSize: 18 }}
              variant="subtitle1"
              noWrap
            >
              {data?.user?.phone}
            </Typography>
          </Stack>
        </Paper>
        <Paper
          sx={{
            width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
            mb: 2,
            p: 1,
            boxShadow: `0px 0px 2px ${grey[500]}`,
          }}
        >
          <Typography variant="body1" sx={{ color: grey[500], fontSize: 16 }}>
            Country
          </Typography>
          <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
            <MapOutlined sx={{ color: "#B39CD0" }} />
            <Typography
              sx={{ color: grey[600], mt: 2, fontSize: 18 }}
              variant="subtitle1"
              noWrap
            >
              {data?.user?.country}
            </Typography>
          </Stack>
        </Paper>

        <Paper
          sx={{
            width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
            mb: 2,
            p: 1,
            boxShadow: `0px 0px 2px ${grey[500]}`,
          }}
        >
          <Typography variant="body1" sx={{ color: grey[500], fontSize: 16 }}>
            Bios
          </Typography>
          <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
            <EditOutlined sx={{ color: "#B39CD0" }} />
            <Typography
              sx={{ color: grey[600], mt: 2, fontSize: 18 }}
              variant="subtitle1"
              noWrap
            >
              {data?.user?.bios}
            </Typography>
          </Stack>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default ProfileScreen;
