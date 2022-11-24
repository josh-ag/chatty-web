import {
  Typography,
  Box,
  Button,
  Stack,
  Grid,
  Container,
  CircularProgress,
  Fade,
  Card,
  CardMedia,
  CardContent,
  useTheme,
} from "@mui/material";
import showcase from "../../assets/showcase.jpg";
import accessibility from "../../assets/accessibility.jpg";
import futuristic from "../../assets/futuristic.jpg";
import secure from "../../assets/secure.svg";
import { useGetProfileQuery } from "../../features/services/queries";
import { logOut } from "../../features/reducers/authSlice";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useDispatch } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  //get user profile
  const loginId = localStorage.getItem("c_id");
  const { data, isLoading, error } = useGetProfileQuery(loginId);

  if (error && error?.originalStatus === 401) {
    dispatch(logOut());

    return <Navigate to="/login" />;
  }

  const features = [
    {
      title: "Accessibility",
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit
                diam viverra quis est aliquet lacus neque, vitae posuere.
                Aliquam donec sed ut turpis viverra dui risus suspendisse. Dui
                in sed arcu tristique nam id amet potenti ultricies. Malesuada
                tellus ac massa vel, tristique lectus et.`,
      path: "/ccessibility",
      banner: accessibility,
      bannerTitle: "accessibility banner",
    },

    {
      title: "Secure",
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit
                diam viverra quis est aliquet lacus neque, vitae posuere.
                Aliquam donec sed ut turpis viverra dui risus suspendisse.`,
      path: "/secure",
      banner: secure,
      bannerTitle: "secure banner",
    },

    {
      title: "Futuristic",
      body: `Aliquam donec sed ut turpis viverra dui risus suspendisse. Dui
                in sed arcu tristique nam id amet potenti ultricies. Malesuada
                tellus ac massa vel, tristique lectus et.`,
      path: "/futuristic",
      banner: futuristic,
      bannerTitle: "futuristic banner",
    },
  ];

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            width: "100vw",
            height: `calc(100vh - ${theme.mixins.toolbar.minHeight * 3}px)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <CircularProgress size={"2rem"} />
          <Typography
            variant="caption"
            sx={{ textAlign: "center", color: grey[600], mt: 2 }}
          >
            Please wait...
          </Typography>
        </Box>
      ) : (
        <>
          <Fade in={true}>
            <Box
              sx={({ theme }) => ({
                width: "100%",
                minHeight: { xs: "80vh", sm: "70" },
                height: "100%",
                bgcolor: "Background.default",
                px: 4,
                py: 4,
                display: "flex",
                alignItems: "center",
              })}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Grid item xs={12} sm={10} md={8} lg={6} xl={6}>
                  <img
                    src={showcase}
                    alt="hero section banner"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={10} md={8} lg={4} xl={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "stretch",
                    }}
                  >
                    <Typography
                      variant="h4"
                      textAlign={"center"}
                      sx={{
                        color: grey[800],
                        fontWeight: 300,
                        overflow: "hidden",
                      }}
                    >
                      Build Real Connections
                    </Typography>
                    <Typography
                      variant="h5"
                      textAlign={"center"}
                      sx={{
                        color: grey[700],
                        mt: 2,
                        overflow: "hidden",
                        fontWeight: 200,
                      }}
                    >
                      Reliable, Trustworthy And Efficient
                    </Typography>

                    <Stack direction="row" spacing={2} sx={{ mt: 6 }}>
                      <Button
                        component={RouterLink}
                        to={`/`}
                        variant="outlined"
                        sx={{ textTransform: "capitalize" }}
                      >
                        Learn More
                      </Button>
                      <Button
                        component={RouterLink}
                        to={`/get-started`}
                        variant="contained"
                        color="primary"
                        sx={{
                          ml: 2,
                          textTransform: "capitalize",
                        }}
                      >
                        Get Started
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Fade>
          <Fade in={true}>
            <Container sx={{ my: 4 }}>
              <Typography
                variant="h4"
                textAlign={"center"}
                sx={{ color: grey[800], my: 2 }}
                noWrap
              >
                Features
              </Typography>
              <Box p={2} mt={2}>
                {features.map((feature) => (
                  <Card
                    key={feature.title}
                    sx={{
                      mb: 4,
                      borderRadius: 4,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      boxShadow: "0px 1px 2px  #ddd",
                    }}
                  >
                    <CardMedia
                      image={feature.banner}
                      sx={{ height: 200, width: "100%" }}
                    />

                    <CardContent
                      sx={{
                        p: 2,
                        mt: 2,
                        width: "80%",
                        alignSelf: "center",
                        minHeight: 200,
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h4"
                        sx={{ textAlign: "center" }}
                      >
                        {feature.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{ textAlign: "center", textWrap: "wrap" }}
                        color="text.secondary"
                      >
                        {feature.body}
                      </Typography>

                      <Button
                        onClick={() => navigate(`${feature.path}`)}
                        variant="outlined"
                        sx={{ mt: 3 }}
                      >
                        learn more &rarr;
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Container>
          </Fade>
        </>
      )}
    </>
  );
};

export default HomeScreen;
