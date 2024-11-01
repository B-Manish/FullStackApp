import api from "./customAxios";

export const getAllRestaurants = () => {
  return api.get(`http://localhost:8000/getAllRestaurants`).then((payload) => {
    return payload;
  });
};
