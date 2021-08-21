import SocketIOClient from "socket.io-client"
import axios from 'axios';

export const Socket = SocketIOClient("http://iot-service.zilog.club/")
// export const Socket = SocketIOClient("hhttp://kambing.zilog.club")
export const API = axios.create({
	// baseURL: 'http://192.168.20.120:3004/kambing/'
  baseURL: 'http://iot-service.zilog.club/api/v1/xnxx/'
});

export const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};