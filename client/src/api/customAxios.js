import axios from "axios";

const CUSTOMAXIOS = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

// CUSTOMAXIOS.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem(
//     "AUTH_ACCESS_TOKEN"
//   )}`;
//   return config;
// });

CUSTOMAXIOS.interceptors.response.use(
  // unwrap response data
  ({ data }) => data,

  // catch statusCode != 200 responses and format error
  (error) => {
    if (error.response) {
      const errorData = {
        ...error.response.data,
        status: error.response.status,
      };
      return Promise.reject(errorData);
    }
    return Promise.reject(new Error(error.message));
  }
);

export default CUSTOMAXIOS;
