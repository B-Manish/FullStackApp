import api from "./customAxios";

export const getAllRestaurants = () => {
  return api.get(`http://localhost:8000/getAllRestaurants`).then((payload) => {
    return payload;
  });
};

export const getRestaurantDetails = (restaurant_id) => {
  return api
    .get(`http://localhost:8000/getRestaurant/${restaurant_id}`)
    .then((payload) => {
      return payload;
    });
};
