import { Typography, Box, Button, Stack, Grid, Container } from "@mui/material";
import showcase from "../../assets/showcase.jpg";
import accessibility from "../../assets/accessibility.jpg";
import futuristic from "../../assets/futuristic.jpg";
import secure from "../../assets/secure.svg";
import { ActionButton } from "../../components/buttons";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import styled from "@emotion/styled";

const Image = styled("img")(({ theme }) => ({
  height: 250,
  width: 250,
  borderRadius: "50%",
  [theme.breakpoints.down("sm")]: {
    width: 200,
    height: 200,
  },
}));

const HomeScreen = () => {
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

  const token = localStorage.getItem("token");
  const loginId = localStorage.getItem("loginId");

  if (!token || !loginId) {
    return <Navigate to={"/login"} />;
  } else {
    return (
      <>
        <Box
          sx={{
            width: "100%",
            minHeight: { xs: "80vh", sm: "70" },
            height: "100%",
            bgcolor: "background.default",
            px: 4,
            py: 4,
            display: "flex",
            alignItems: "center",
          }}
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
            <Grid item xs={12} sm={10} md={6} xl={6}>
              <img
                src={showcase}
                alt="hero section banner"
                style={{ width: "100%", height: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={10} md={6} xl={4}>
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
                  <ActionButton
                    component={RouterLink}
                    to={`/get-started`}
                    variant="contained"
                    sx={{ ml: 2, textTransform: "capitalize" }}
                  >
                    Get Started
                  </ActionButton>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Container sx={{ my: 4 }}>
          <Typography
            variant="h4"
            textAlign={"center"}
            sx={{ color: grey[800], my: 2 }}
            noWrap
          >
            Features
          </Typography>

          {features.map((feature) => (
            <Box sx={{ width: "100%", py: 4 }} key={feature.title}>
              <Grid
                container
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  xl={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 4,
                  }}
                >
                  <Image src={feature.banner} alt={feature.bannerTitle} />
                </Grid>
                <Grid item xs={12} sm={8} md={8} xl={4}>
                  <Typography
                    variant="h4"
                    textAlign={"center"}
                    sx={{ color: grey[900], py: 2 }}
                    noWrap
                  >
                    {feature.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      px: 4,
                    }}
                  >
                    <Typography
                      textAlign={"justify"}
                      variant="body1"
                      sx={{ color: grey[700], fontSize: 18 }}
                    >
                      {feature.body}
                    </Typography>
                    <Button
                      component={RouterLink}
                      to={feature.path}
                      sx={{ textTransform: "capitalize", fontSize: 16, mt: 1 }}
                      variant="outlined"
                    >
                      learn more
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Container>
      </>
    );
  }
};

export default HomeScreen;
