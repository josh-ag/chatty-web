import { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Paper,
  Stack,
  Toolbar,
  Button,
  TextField,
  IconButton,
  Modal,
  Typography,
  Collapse,
  Alert,
  Drawer,
  ListItem,
  List,
  ListItemText,
  MenuItem,
} from "@mui/material";
import crossIcon from "../../assets/Cross.svg";
import userIcon from "../../assets/user.svg";
import notificationIcon from "../../assets/Notification.svg";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { Close, Send } from "@mui/icons-material";
import { blueGrey, grey, purple } from "@mui/material/colors";
import {
  useGetProfileQuery,
  useGetRoomQuery,
} from "../../features/services/queries";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/reducers/authSlice";
import { socket } from "../../socket";

const ModalContainer = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}));

const CustomeBox = styled(Box)(({ theme }) => ({
  height: theme.mixins.toolbar.minHeight + 5,
}));

const drawerWidth = 300;

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [roomMessage, setRoomMessage] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [activeUsers, setActiveUsers] = useState(null);
  const [typing, setTyping] = useState("");
  const { roomId, userId } = useParams();

  //Drawer state
  const [drawerPosition, setDrawerPosition] = useState({
    left: false,
    right: true,
    top: false,
    bottom: false,
  });

  //@GET ROOM INFO
  const { data: roomData, error: roomError } = useGetRoomQuery(roomId, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const { data, error } = useGetProfileQuery(userId, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //message
  const Typing = (e) => {
    setMessage(e.target.value);

    socket.emit("typing", { username: data?.user.username, roomId });
  };

  //HANDLE SENDING MESSAGE
  const handleSend = () => {
    if (!message) return;
    socket.emit("message", {
      message,
      roomId,
      username: data?.user.username,
      userId,
    });

    setMessage("");
  };

  //@EMIT JOIN
  useEffect(() => {
    socket.emit("join", { roomId, userId, username: data?.user.username });
  }, []);

  //GET ALL USER IN THE ROOM
  useEffect(() => {
    socket.on("all-users", (data) => {
      setActiveUsers(data);
    });
  }, []);

  //TYPING LISTENER
  useEffect(() => {
    socket.on("is-typing", (data) => {
      setTyping(data);
    });
  });

  useEffect(() => {
    //MESSAGE LISTENER
    socket.on("new-message", (message) => {
      setRoomMessage(message);
    });
  }, [setRoomMessage]);

  useEffect(() => {
    //LISTEN FOR NEW USER JOIN
    socket.on("new-user", (data) => {
      setNewUser(data);
    });
  });

  useEffect(() => {
    //LISTEN FOR NEW USER JOIN
    socket.on("leave", (data) => {});
  });

  const toggleDrawer = (anchor, open) => () => {
    setDrawerPosition({
      ...drawerPosition,
      [anchor]: open,
    });
  };

  const ModalComponent = () => (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      outline={0}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <ModalContainer>
        <Typography variant="body1" sx={{ color: grey[600] }}>
          All Notification clear
        </Typography>
      </ModalContainer>
    </Modal>
  );

  //logout user if not authorized
  if (error && error?.originalStatus === 401) {
    dispatch(logOut());
    return <Navigate to="/login" />;
  }

  //redirect if room not found
  if (
    roomError?.data?.statusCode === 404 ||
    roomError?.data?.message === "Room Not Found"
  ) {
    return <Navigate to="/login" />;
  }

  //clear typing state
  if (!!typing) {
    setTimeout(() => setTyping(null), 500);
  }
  if (newUser) {
    setTimeout(() => setNewUser(null), 10000);
  }

  const LogNewJoinUser = ({ user }) => {
    return (
      <Collapse in={!!user} timeout={500}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setNewUser(null)}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ my: 1 }}
        >
          {user} Joins
        </Alert>
      </Collapse>
    );
  };

  return (
    <>
      {modalOpen && <ModalComponent />}
      <Box
        sx={{
          overflow: "hidden",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: { sm: "100%", lg: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "background.default",

            width: { sm: "100%", lg: `calc(100vw - ${drawerWidth}px)` },
          }}
        >
          <Container>
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate("/chat")}
                  mr={1}
                  color="warning"
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: 20,
                  }}
                >
                  leave
                </Button>
              </Box>

              {roomData?.name && (
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "center",
                    background:
                      "linear-gradient(90deg, rgba(132,94,194,1) 0%, rgba(155,137,179,1) 46%, rgba(33,137,167,1) 99%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  noWrap
                >
                  #{roomData?.name.toUpperCase()}
                </Typography>
              )}

              <Stack
                direction={"row"}
                spacing={1}
                sx={{ alignItems: "center" }}
              >
                <Avatar
                  src={notificationIcon}
                  onClick={() => setModalOpen(!modalOpen)}
                  sx={{ width: "1.5rem", height: "1.5rem" }}
                />
                <Avatar
                  src={data?.user?.profilePicture?.url || userIcon}
                  sx={{ width: "2rem", height: "2rem" }}
                />
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>

        <Container sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ flex: 1, pt: 1 }}>
            {!data && error ? (
              <Box
                sx={{
                  height: 300,
                  background: blueGrey[50],
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: grey[800],
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  Oops!
                </Typography>

                <Typography
                  variant="title1"
                  sx={{
                    color: grey[600],
                    textAlign: "center",
                  }}
                >
                  Something went wrong
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: grey[500],
                    textAlign: "center",
                  }}
                >
                  Please check your internet or try later
                </Typography>
              </Box>
            ) : null}

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              {roomMessage.length
                ? roomMessage.map((message, i) => {
                    return (
                      <Alert
                        key={i}
                        icon={false}
                        sx={{
                          background:
                            "linear-gradient(90deg, rgba(214,239,250,0.6530987394957983) 0%, rgba(252,247,255,1) 17%, rgba(252,247,255,1) 100%);",
                          mb: 1,
                          borderRadius: 20,
                          borderTopLeftRadius:
                            message.userId === userId ? 20 : 0,
                          width: "auto",
                          maxWidth: "70%",
                          px: 2,
                          alignSelf:
                            message.userId === userId
                              ? "flex-end"
                              : "flex-start",
                          display: "flex",
                          alignItems: "center",
                          justifyContent:
                            message.userId === userId
                              ? "flex-end"
                              : "flex-start",
                        }}
                      >
                        {message.userId === userId ? (
                          <Typography variant="body1" color="text.secondary">
                            {message.message}
                          </Typography>
                        ) : (
                          <Stack
                            direction={"row"}
                            sx={{ alignItems: "center", flexWrap: "wrap" }}
                          >
                            <Typography
                              variant="button"
                              sx={{
                                mr: 2,
                                background:
                                  "linear-gradient(105deg, rgba(0,158,250,1) 44%, rgba(0,210,252,1) 91%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                              }}
                            >
                              {message.username}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="text.secondary"
                              sx={{ textAlign: "center" }}
                            >
                              {message.message}
                            </Typography>
                          </Stack>
                        )}
                      </Alert>
                    );
                  })
                : null}
            </Box>

            {newUser && <LogNewJoinUser user={newUser} />}
            {typing && (
              <Typography variant="caption" color="text.disabled" my={1}>
                {typing}...
              </Typography>
            )}
          </Box>

          <Paper
            sx={{
              p: 1,
              px: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            elevation={0}
          >
            <TextField
              multiline
              name="message"
              rows={1}
              type="text"
              placeholder="Write Message"
              value={message}
              onChange={Typing}
              sx={{ flex: 1, fontFamily: "outfit", fontWeight: "200" }}
            />
            <IconButton
              sx={{
                background: message
                  ? "linear-gradient(105deg, rgba(0,158,250,1) 44%, rgba(79,251,223,1) 91%)"
                  : grey[500],
                ml: 1,
              }}
              disableRipple
              onClick={handleSend}
            >
              <Send sx={{ color: message ? grey[100] : grey[7] }} />
            </IconButton>
          </Paper>
        </Container>
      </Box>

      <Drawer
        anchor="right"
        open={drawerPosition["right"]}
        onClose={() => toggleDrawer("right", false)}
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
          display: {
            xs: "none",
            sm: "none",
            lg: "block",
          },
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: theme.mixins.toolbar.minHeight,
            })}
          >
            <Typography
              variant="h5"
              sx={{
                background:
                  "linear-gradient(90deg, rgba(132,94,194,1) 0%, rgba(155,137,179,1) 46%, rgba(33,137,167,1) 99%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Active Users
            </Typography>
          </Box>
          <List>
            {activeUsers?.length
              ? activeUsers.map((user) => (
                  <MenuItem
                    key={user.userId}
                    color="text.secondary"
                    sx={{
                      justifyContent: "center",
                      fontSize: 20,
                      color: grey[600],
                    }}
                  >
                    {user.username}
                  </MenuItem>
                ))
              : null}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatScreen;
