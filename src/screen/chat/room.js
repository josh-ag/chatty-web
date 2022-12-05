import { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Box,
  Container,
  Stack,
  Button,
  IconButton,
  TextField,
  Collapse,
  Alert,
  Drawer,
  CircularProgress,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import arrowLeft from "../../assets/Cross.svg";
import { Close } from "@mui/icons-material";
import { Layout } from "./layout";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../features/services/queries";
import { logOut } from "../../features/reducers/authSlice";
import { useDispatch } from "react-redux";
import { socket } from "../../socket";
//@ROOM PAGE
export const RoomScreen = () => {
  /*
************************************
        @INTERNAL STATE
************************************

  */
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [joinError, setJoinError] = useState(null);
  const [newRoom, setNewRoom] = useState({ name: "", roomId: "" });
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [drawerPosition, setDrawPosition] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginId = localStorage.getItem("c_id");
  const { error: respError } = useGetProfileQuery(loginId);

  /*
************************************
        @CREATE & JOIN ROOM
************************************

  */
  const handleJoin = (e) => {
    e.preventDefault();
    //reset state
    setLoading(true);
    setError(false);
    setOpen(false);

    if (!roomId) {
      setLoading(false);
      setOpen(true);
      setError("RoomID is Required!");
      return;
    }

    socket.emit("find-room", { roomId, userId: loginId });
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    //reset state
    setLoading(true);
    setError(false);
    setOpen(false);

    const { name, roomId } = newRoom;
    if (!roomId) {
      setLoading(false);
      setOpen(true);
      setError("RoomID is Required!");
      return;
    }
    if (!name) {
      setLoading(false);
      setOpen(true);
      setError("Room Name is Required!");
      return;
    }

    //emit create
    socket.emit("new-room", { name, roomId, userId: loginId });
  };

  //clear error
  if (error) {
    setTimeout(() => setError(null), 4000);
  }

  /*
************************************
        @TOGGLE DRAWERS
************************************

  */
  const toggleJoinDrawer = (anchor, open) => () => {
    setLoading(false);
    setState({ ...state, [anchor]: open });
  };
  const toggleCreateRoomDrawer = (anchor, open) => () => {
    setLoading(false);
    setDrawPosition({ ...drawerPosition, [anchor]: open });
  };

  useEffect(() => {
    socket.on("room-not-found", (data) => {
      setLoading(false);
      setJoinError(data?.message);
    });

    socket.on("room-found", (_) => {
      navigate(`/room/${loginId}/${roomId}`);
    });

    socket.on("new-room", (data) => {
      navigate(`/room/${loginId}/${data?.roomId}`);
    });
  });

  /*
*
************************************
        @DRAWER~1 CONTENT
************************************
*
  */
  const renderJoinMenu = (anchor) => (
    <Box
      sx={{ width: { xs: "100vw", sm: "100vw", md: "70vw" }, height: "100%" }}
      role="presentation"
    >
      <Box
        sx={{
          background: grey[100],
          height: "100%",
          minHeight: "100%",
          minWidth: "100%",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <IconButton
            sx={{ mt: 2, alignSelf: "flex-start" }}
            onClick={toggleJoinDrawer(anchor, false)}
          >
            <Avatar src={arrowLeft} sx={{ width: 40, height: 40 }} />
          </IconButton>

          <Box
            onSubmit={handleJoin}
            component={"form"}
            noValidate
            autoComplete="off"
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "80%",
              alignSelf: "center",
            }}
          >
            {joinError && (
              <Collapse in={!!joinError || false} timeout={500}>
                <Alert
                  severity="error"
                  sx={{ mb: 2, textTransform: "capitalize" }}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setJoinError(null)}
                    >
                      <Close fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {joinError}
                </Alert>
              </Collapse>
            )}
            {error && (
              <Collapse in={open} timeout={500}>
                <Alert
                  severity="error"
                  sx={{ mb: 2, textTransform: "capitalize" }}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setOpen(false)}
                    >
                      <Close fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {error}
                </Alert>
              </Collapse>
            )}
            <TextField
              label="Room ID"
              placeholder="Enter Room ID"
              fullWidth
              sx={{ mb: 1 }}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <Button
              disabled={loading ? true : false}
              type="submit"
              variant={loading ? "outlined" : "contained"}
              fullWidth
            >
              Join
              {loading && <CircularProgress size={20} sx={{ ml: 2 }} />}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );

  /*
************************************
        @DRAWER~2 CONTENT
************************************

  */
  const renderCreateRoomMenu = (anchor) => (
    <Box
      sx={{ width: { xs: "100vw", sm: "100vw", md: "70vw" }, height: "100%" }}
      role="presentation"
    >
      <Box
        sx={{
          background: grey[100],
          height: "100%",
          minHeight: "100%",
          minWidth: "100%",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <IconButton
            sx={{ mt: 2, alignSelf: "flex-start" }}
            onClick={toggleCreateRoomDrawer(anchor, false)}
          >
            <Avatar src={arrowLeft} sx={{ width: 40, height: 40 }} />
          </IconButton>

          <Box
            onSubmit={handleCreateRoom}
            component={"form"}
            noValidate
            autoComplete="off"
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "80%",
              alignSelf: "center",
            }}
          >
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              New Room
            </Typography>
            {error && (
              <Collapse in={open} timeout={500}>
                <Alert
                  severity="error"
                  sx={{ mb: 2, textTransform: "capitalize" }}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setOpen(false)}
                    >
                      <Close fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {error}
                </Alert>
              </Collapse>
            )}
            <TextField
              value={newRoom.name}
              placeholder="Enter Room Name"
              label="Room Name"
              fullWidth
              sx={{ mb: 1 }}
              onChange={(e) =>
                setNewRoom((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            />
            <TextField
              placeholder="Enter Room ID"
              label="Enter Room ID"
              fullWidth
              sx={{ mb: 1 }}
              value={newRoom.roomId}
              onChange={(e) =>
                setNewRoom((prevState) => ({
                  ...prevState,
                  roomId: e.target.value,
                }))
              }
            />
            <Button
              disabled={loading ? true : false}
              type="submit"
              variant={loading ? "outlined" : "contained"}
              fullWidth
            >
              create
              {loading && <CircularProgress size={20} sx={{ ml: 2 }} />}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );

  if (respError?.originalStatus === 401 || respError?.data === "Unauthorized") {
    dispatch(logOut());
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      {/* join room drawer */}
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleJoinDrawer("right", false)}
      >
        {renderJoinMenu("right")}
      </Drawer>
      {/* create room Drawer */}
      <Drawer
        anchor={"left"}
        open={drawerPosition["left"]}
        onClose={toggleCreateRoomDrawer("left", false)}
      >
        {renderCreateRoomMenu("left")}
      </Drawer>
      <Container sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" sx={{ color: grey[800] }} gutterBottom>
            Let's get you started
          </Typography>
          <Stack direction={"row"} spacing={1}>
            <Button
              variant="contained"
              onClick={toggleJoinDrawer("right", true)}
            >
              Join
            </Button>
            <Button
              variant="outlined"
              onClick={toggleCreateRoomDrawer("left", true)}
            >
              Create room
            </Button>
          </Stack>
        </Box>
      </Container>
    </Layout>
  );
};
