import io from "socket.io-client";
import { API_BASE_URL } from "./features/services/queries";

export const socket = io(API_BASE_URL);
