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
} from "@mui/material";
import chatIcon from "../../assets/Chat.svg";
import userIcon from "../../assets/user.svg";
import arrowLeft from "../../assets/Caret left.svg";
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

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [roomMessage, setRoomMessage] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { roomId, userId } = useParams();
  const [newUser, setNewUser] = useState(null);
  const [activeUsers, setActiveUsers] = useState(null);
  const [typing, setTyping] = useState("");

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
    socket.emit("join", { roomId, userId });
  }, [roomId, userId]);

  //GET ALL USER IN THE ROOM
  useEffect(() => {
    socket.on("all-users", (data) => {
      setActiveUsers(data);
    });
  }, [setActiveUsers]);

  //TYPING LISTENER
  useEffect(() => {
    socket.on("is-typing", (data) => {
      setTyping(data);
    });
  }, [setTyping]);

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

  const ModalComponent = () => (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      outline={0}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <ModalContainer>
        <Typography variant="body1" sx={{ color: grey[600] }}>
          All message clear
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
  console.log(roomError);
  if (
    roomError?.data?.statusCode === 404 ||
    roomError?.data?.message === "Room Not Found"
  ) {
    return <Navigate to="/chat" />;
  }

  //clear typing state
  if (!!typing) {
    setTimeout(() => setTyping(null), 800);
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
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{ bgcolor: "background.default" }}
        >
          <Container>
            <Toolbar>
              <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate("/")}
                  mr={1}
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: 20,
                  }}
                >
                  <Avatar src={arrowLeft} sx={{ width: 24, height: 24 }} />
                  Home
                </Button>

                {roomData?.name && (
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{ textAlign: "center", flex: 1 }}
                    noWrap
                  >
                    #{roomData?.name.toUpperCase()}
                  </Typography>
                )}
              </Box>

              <Stack direction={"row"} spacing={1}>
                <Avatar
                  src={chatIcon}
                  onClick={() => setModalOpen(!modalOpen)}
                />
                <Avatar src={data?.user?.profilePicture?.url || userIcon} />
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
                        severity="info"
                        sx={{
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
                            sx={{ alignItems: "center" }}
                          >
                            <Typography
                              variant="button"
                              sx={{
                                mr: 2,
                                borderRadius: 2,
                                padding: 1,
                                border: `.5px solid ${purple[100]}`,
                              }}
                            >
                              {message.username}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
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
              maxRows={2}
              type="text"
              placeholder="Write Message"
              value={message}
              onChange={Typing}
              sx={{ flex: 1, fontFamily: "outfit", fontWeight: "200" }}
            />
            <IconButton
              sx={{ bgcolor: message ? purple[400] : grey[500], ml: 1 }}
              disableRipple
              onClick={handleSend}
            >
              <Send sx={{ color: message ? grey[100] : grey[7] }} />
            </IconButton>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ChatScreen;
