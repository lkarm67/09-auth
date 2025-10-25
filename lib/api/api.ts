import axios from "axios";
console.log('BASE URL:', process.env.NEXT_PUBLIC_API_URL);

const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

export default nextServer;
